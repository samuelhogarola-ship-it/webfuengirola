import fs from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { brand, tiers } from "../data/commercial-pages-data.mjs";
import { getMarketPage, marketPages } from "../data/market-pages-data.mjs";
import { getMarket, getMarketLocale } from "../data/markets-data.mjs";
import { priceForMarket } from "../lib/market-pricing.mjs";
import { renderMarketSelector, renderSiteHeader } from "./site-navigation.mjs";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const defaultSnapshot = JSON.parse(
  fs.readFileSync(
    new URL("../data/exchange-rates.json", import.meta.url),
    "utf8",
  ),
);

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function absolute(route) {
  return `${brand.site}${route}`;
}

function routeFile(outputRoot, route) {
  if (route === "/") return path.join(outputRoot, "index.html");
  return path.join(outputRoot, route.slice(1), "index.html");
}

function baseLocale(page) {
  return page.localeCode.startsWith("es") ? "es" : "en";
}

function renderLanguageMenu(page) {
  const market = getMarket(page.marketKey);
  return `<details class="language-menu">
    <summary aria-label="${escapeHtml(page.labels.languageMenu)}"><span aria-hidden="true">${baseLocale(page).toUpperCase()}</span><svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" /></svg></summary>
    <div class="language-menu__options">${Object.keys(market.routes)
      .map((localeCode) => {
        const locale = getMarketLocale(page.marketKey, localeCode);
        const current = localeCode === page.localeCode;
        return `<a href="${locale.route}" hreflang="${locale.code}" lang="${locale.code}"${current ? ' aria-current="page"' : ""}>${escapeHtml(locale.label)}${current ? ' <span aria-hidden="true">✓</span>' : ""}</a>`;
      })
      .join("")}</div>
  </details>`;
}

function renderHeader(page) {
  const locale = baseLocale(page);
  return renderSiteHeader({
    locale,
    pathname: page.route,
    languageMenu: renderLanguageMenu(page),
    marketMenu: renderMarketSelector({
      currentMarket: page.marketKey,
      localeCode: page.localeCode,
    }),
    items: [
      [page.route, page.labels.home, "home"],
      ["#packages", page.labels.services, "market-services"],
      ["/casos/", page.labels.portfolio, "cases"],
      ["#contact", page.labels.contact, "contact"],
    ],
    ariaLabel: locale === "es" ? "Navegación principal" : "Main navigation",
    homeHref: page.route,
    logoLabel: "WF-Studio · México",
    logoAlt: "WF-Studio México",
  });
}

function renderCards(items) {
  return `<div class="commercial-card-grid">${items
    .map(
      (item, index) => `<article class="commercial-card">
      <span class="commercial-card__number">0${index + 1}</span>
      <p>${escapeHtml(item)}</p>
    </article>`,
    )
    .join("")}</div>`;
}

export function renderMarketHreflang(marketKey) {
  const market = getMarket(marketKey);
  const alternates = Object.entries(market.routes)
    .map(
      ([localeCode, route]) =>
        `  <link rel="alternate" hreflang="${localeCode}" href="${absolute(route)}" />`,
    )
    .join("\n");

  return `${alternates}\n  <link rel="alternate" hreflang="x-default" href="${absolute(market.routes[market.primaryLocale])}" />`;
}

export function renderMarketTierCards(page, snapshot) {
  const market = getMarket(page.marketKey);
  const locale = baseLocale(page);
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  });

  return `<div class="commercial-tier-grid">
    ${tiers
      .map((tier, index) => {
        const price = priceForMarket({
          eurAmount: tier.price,
          marketKey: page.marketKey,
          snapshot,
        });
        return `<article class="commercial-tier${tier.popular ? " commercial-tier--featured" : ""}" data-tier="${tier.key}">${
          tier.popular
            ? `<span class="commercial-tier__badge">${locale === "es" ? "Más popular" : "Most popular"}</span>`
            : ""
        }
      <h3>${escapeHtml(tier.name[locale])}</h3>
      <p class="commercial-tier__price"><span data-tier-price="${price.display}" data-currency="${market.currency}">$${formatter.format(price.display)} ${market.currency}</span></p>
      <p>${escapeHtml(page.tierUses[index])}</p>
      <ul>${tier.features[locale].map((feature) => `<li>✓ ${escapeHtml(feature)}</li>`).join("")}</ul>
      <a class="btn ${tier.popular ? "btn--primary" : "btn--outline"}" href="#contact" data-analytics-event="tier_select" data-analytics-market="${page.marketKey}" data-analytics-locale="${page.localeCode}" data-analytics-tier="${tier.key}">${escapeHtml(page.labels.packageCta)}</a>
    </article>`;
      })
      .join("\n")}
  </div>
  <p class="commercial-price-note">${escapeHtml(page.labels.rateNote)}: ${escapeHtml(snapshot.date)} · ${escapeHtml(page.labels.taxNote)}</p>`;
}

function renderProcess(page) {
  return `<div class="commercial-card-grid">${page.process
    .map(
      ({ title, text }, index) => `<article class="commercial-card">
      <span class="commercial-card__number">0${index + 1}</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(text)}</p>
    </article>`,
    )
    .join("")}</div>`;
}

function renderFaqs(page) {
  return `<div class="commercial-faqs">${page.faqs
    .map(
      ({ question, answer }) =>
        `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`,
    )
    .join("")}</div>`;
}

function renderContactForm(page) {
  return `<section class="section commercial-form-section" id="contact">
    <div class="container commercial-form-wrap">
      <div><span class="section-label">${escapeHtml(page.labels.contact)}</span><h2>${escapeHtml(page.labels.contactHeading)}</h2><p>${escapeHtml(page.labels.contactIntro)}</p></div>
      <form class="contact-form" data-contact-form data-form-kind="contact" data-form-locale="${page.localeCode}" data-market="${page.marketKey}" data-locale="${page.localeCode}" data-currency="MXN" data-source-route="${page.route}" data-api-base="https://admin.webfuengirola.com" novalidate>
        <div class="contact-form__grid"><div class="contact-field"><label for="market-form-name">${escapeHtml(page.labels.name)}</label><input id="market-form-name" name="name" required /></div><div class="contact-field"><label for="market-form-email">${escapeHtml(page.labels.email)}</label><input id="market-form-email" name="email" type="email" required /></div></div>
        <div class="contact-field"><label for="market-form-company">${escapeHtml(page.labels.company)}</label><input id="market-form-company" name="company" /></div>
        <div class="contact-field"><label for="market-form-message">${escapeHtml(page.labels.message)}</label><textarea id="market-form-message" name="message" rows="5" required></textarea></div>
        <div class="contact-field contact-field--hp" aria-hidden="true"><label for="market-form-website">Website</label><input id="market-form-website" name="website" tabindex="-1" autocomplete="off" /></div>
        <label class="commercial-consent"><input type="checkbox" name="consent" required /> <span>${escapeHtml(page.labels.legal)}</span></label>
        <div class="contact-form__turnstile" data-turnstile></div><p class="contact-form__status" data-contact-status aria-live="polite"></p>
        <button class="btn btn--primary" type="submit" data-contact-submit>${escapeHtml(page.labels.submit)}</button>
      </form>
    </div>
  </section>`;
}

function renderJsonLd(page) {
  const canonical = absolute(page.route);
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${brand.site}/#organization`,
        name: brand.name,
        alternateName: brand.localName,
        url: brand.site,
        email: brand.email,
        telephone: brand.phone,
        areaServed: "Mexico",
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#page`,
        url: canonical,
        name: page.title,
        description: page.description,
        inLanguage: page.localeCode,
        about: { "@id": `${brand.site}/#organization` },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  });
}

function renderFooter(page) {
  const legalRoute = baseLocale(page) === "es" ? "/legal.html" : "/en/legal/";
  return `<footer class="footer"><div class="container footer__inner">
    <div class="footer__brand"><a href="${page.route}" class="commercial-logo commercial-logo--footer"><img src="/img/logo-wf.webp" alt="WF-Studio" width="36" height="36" /><span><strong>WF-Studio</strong><small>México</small></span></a><p class="footer__tagline">${escapeHtml(page.description)}</p></div>
    <div class="footer__col"><h4>${escapeHtml(page.labels.contact)}</h4><ul class="footer__links"><li><a href="#contact">${escapeHtml(page.labels.contact)}</a></li><li><a href="mailto:${brand.email}">${brand.email}</a></li><li><a href="${legalRoute}">Legal</a></li></ul></div>
  </div><div class="footer__bottom"><div class="container"><p>© <span id="footer-year"></span> WF-Studio · México</p></div></div></footer>`;
}

export function renderMarketPage(page, snapshot = defaultSnapshot) {
  const canonical = absolute(page.route);
  const whatsapp = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(page.whatsappText)}`;
  const tierCards = renderMarketTierCards(page, snapshot);

  return `<!doctype html>
<html lang="${page.htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href="${canonical}" />
${renderMarketHreflang(page.marketKey)}
  <link rel="icon" href="/favicon.webp" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta property="og:title" content="${escapeHtml(page.title)}" />
  <meta property="og:description" content="${escapeHtml(page.description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="WF-Studio" />
  <meta property="og:locale" content="${page.ogLocale}" />
  <meta property="og:image" content="${brand.site}/img/og-cover.webp" />
  <meta name="twitter:card" content="summary_large_image" />
  <script type="application/ld+json">${renderJsonLd(page)}</script>
  <link rel="stylesheet" href="/style.css?v=15" />
  <link rel="stylesheet" href="/cookie-banner-core.css" />
  <noscript><style>[data-reveal] { opacity: 1; transform: none; }</style></noscript>
</head>
<body class="commercial-page commercial-page--market" data-market="${page.marketKey}" data-locale="${page.localeCode}">
<a class="skip-link" href="#main-content">${escapeHtml(page.labels.skipLink)}</a>
${renderHeader(page)}
<main id="main-content">
  <section class="commercial-hero"><div class="container" data-page-enter><span class="section-label">${escapeHtml(page.labels.heroEyebrow)}</span><h1>${escapeHtml(page.h1)}</h1><p>${escapeHtml(page.intro)}</p><div class="commercial-hero__actions"><a class="btn btn--primary btn--lg" href="#contact" data-analytics-event="quote_click" data-analytics-market="${page.marketKey}" data-analytics-locale="${page.localeCode}">${escapeHtml(page.labels.primaryCta)}</a><a class="btn btn--outline btn--lg" href="/casos/">${escapeHtml(page.labels.secondaryCta)}</a><a class="btn btn--outline btn--lg" href="${whatsapp}" target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-market="${page.marketKey}" data-analytics-locale="${page.localeCode}">${escapeHtml(page.labels.whatsappCta)}</a></div></div></section>
  <section class="section"><div class="container"><span class="section-label">México</span><h2>${escapeHtml(page.labels.problemsHeading)}</h2>${renderCards(page.problems)}</div></section>
  <section class="section commercial-section--warm"><div class="container"><span class="section-label">WF-Studio</span><h2>${escapeHtml(page.labels.benefitsHeading)}</h2>${renderCards(page.benefits)}</div></section>
  <section class="section" id="packages"><div class="container"><span class="section-label">Lite · Express · Professional</span><h2>${escapeHtml(page.labels.packagesHeading)}</h2>${tierCards}</div></section>
  <section class="section commercial-section--warm"><div class="container"><span class="section-label">01 · 02 · 03</span><h2>${escapeHtml(page.labels.processHeading)}</h2>${renderProcess(page)}</div></section>
  <section class="section"><div class="container"><span class="section-label">FAQ</span><h2>${escapeHtml(page.labels.faqHeading)}</h2>${renderFaqs(page)}</div></section>
${renderContactForm(page)}
</main>
${renderFooter(page)}
<script src="/cookie-banner-core.js"></script>
<script src="/umami-analytics-core.js"></script>
<script src="/contact-form-core.js"></script>
<script src="/contact-form.js"></script>
<script src="/script.js?v=13"></script>
</body>
</html>`;
}

export async function generateMarketPages(
  outputRoot = projectRoot,
  { marketKeys = Object.keys(marketPages), snapshot = defaultSnapshot } = {},
) {
  const written = [];

  for (const marketKey of marketKeys) {
    const pages = marketPages[marketKey];
    if (!pages) throw new Error(`No market pages configured for ${marketKey}`);

    for (const localeCode of Object.keys(pages)) {
      const page = getMarketPage(marketKey, localeCode);
      const file = routeFile(outputRoot, page.route);
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, renderMarketPage(page, snapshot), "utf8");
      written.push(file);
    }
  }

  return written;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const written = await generateMarketPages();
  console.log(`Generated ${written.length} WF-Studio market pages.`);
}
