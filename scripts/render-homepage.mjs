import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { brand } from "../data/commercial-pages-data.mjs";
import defaultSnapshot from "../data/exchange-rates.json" with { type: "json" };
import {
  getHomepageRecord,
  homepageRecords,
} from "../data/home-pages-data.mjs";
import { getMarket } from "../data/markets-data.mjs";
import { priceForMarket } from "../lib/market-pricing.mjs";
import { renderMarketSelector, renderSiteHeader } from "./site-navigation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function absolute(route) {
  return new URL(route, `${brand.site}/`).href;
}

function routeFile(outputRoot, route) {
  return route === "/"
    ? path.join(outputRoot, "index.html")
    : path.join(outputRoot, route.replace(/^\//, ""), "index.html");
}

function languageCode(localeCode) {
  return localeCode.split("-")[0];
}

function renderLanguageMenu(record) {
  const market = getMarket(record.marketKey);
  return `<details class="language-menu">
        <summary aria-label="${escapeHtml(record.labels.language)}"><span aria-hidden="true">${languageCode(record.localeCode).toUpperCase()}</span><svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" /></svg></summary>
        <div class="language-menu__options">${Object.entries(market.routes)
          .map(([localeCode, route]) => {
            const current = localeCode === record.localeCode;
            const hreflang =
              record.marketKey === "spain"
                ? languageCode(localeCode)
                : localeCode;
            return `<a href="${route}" hreflang="${hreflang}" lang="${localeCode}"${current ? ' aria-current="page"' : ""}>${escapeHtml(market.localeLabels[localeCode])}${current ? ' <span aria-hidden="true">✓</span>' : ""}</a>`;
          })
          .join("")}</div>
      </details>`;
}

function renderAlternates(record) {
  const market = getMarket(record.marketKey);
  return `${Object.entries(market.routes)
    .map(([localeCode, route]) => {
      const hreflang =
        record.marketKey === "spain" ? languageCode(localeCode) : localeCode;
      return `  <link rel="alternate" hreflang="${hreflang}" href="${absolute(route)}" />`;
    })
    .join("\n")}
  <link rel="alternate" hreflang="x-default" href="${absolute(market.routes[market.primaryLocale])}" />`;
}

function servicePrice(record, service, snapshot) {
  if (record.currency === "EUR") {
    return { currency: "EUR", display: service.eurPrice };
  }
  return priceForMarket({
    eurAmount: service.eurPrice,
    marketKey: record.marketKey,
    snapshot,
  });
}

function displayPrice(record, price) {
  const number = price.display.toLocaleString(record.localeCode, {
    maximumFractionDigits: 0,
  });
  if (price.currency === "EUR") return `${number} €`;
  if (price.currency === "BRL") return `R$ ${number} BRL`;
  return `$${number} ${price.currency}`;
}

function renderServices(record, snapshot) {
  return record.services
    .map((service) => {
      const price = servicePrice(record, service, snapshot);
      return `<article class="portfolio-card services-home-card services-home-deck__card${service.popular ? " services-home-deck__card--light" : ""}">
        <div class="portfolio-card__body">
          <div class="services-home-deck__meta"><span class="services-home-card__tag">${escapeHtml(service.name)}</span></div>
          <h3 class="portfolio-card__title">${escapeHtml(service.name)}</h3>
          <p class="portfolio-card__desc">${escapeHtml(service.description)}</p>
          <ul class="services-home-card__bullets">${service.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul>
          <p class="services-home-card__price">${escapeHtml(record.labels.from)} <span data-tier-price="${price.display}" data-currency="${price.currency}">${escapeHtml(displayPrice(record, price))}</span>${record.currency === "EUR" ? ` ${escapeHtml(record.labels.tax)}` : ""}</p>
        </div>
        <div class="portfolio-card__footer"><a class="btn btn--outline" href="${record.route}?plan=${service.key}#contact" data-analytics-event="tier_select" data-analytics-market="${record.marketKey}" data-analytics-locale="${record.localeCode}" data-analytics-tier="${service.key}">${escapeHtml(record.labels.primaryCta)} →</a></div>
      </article>`;
    })
    .join("");
}

function renderContact(record, whatsapp) {
  if (!record.contactForm) {
    return `<section class="cta-section" id="contact"><div class="container"><h2>${escapeHtml(record.labels.contactHeading)}</h2><p>${escapeHtml(record.labels.contactText)}</p><a class="btn btn--primary btn--lg" href="${whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a></div></section>`;
  }

  const form = record.contactForm;
  return `<section class="section commercial-form-section" id="contact">
    <div class="container commercial-form-wrap">
      <div><span class="section-label">${escapeHtml(record.labels.contact)}</span><h2>${escapeHtml(record.labels.contactHeading)}</h2><p>${escapeHtml(record.labels.contactText)}</p><a class="btn btn--outline" href="${whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
      <form class="contact-form" data-contact-form data-form-kind="contact" data-form-market="${record.marketKey}" data-form-locale="${record.localeCode}" data-form-currency="${record.currency}" data-market="${record.marketKey}" data-locale="${record.localeCode}" data-currency="${record.currency}" data-source-route="${record.route}" data-api-base="https://admin.webfuengirola.com" novalidate>
        <div class="contact-form__grid"><div class="contact-field"><label for="market-form-name">${escapeHtml(form.name)}</label><input id="market-form-name" name="name" required /></div><div class="contact-field"><label for="market-form-email">${escapeHtml(form.email)}</label><input id="market-form-email" name="email" type="email" required /></div></div>
        <div class="contact-field"><label for="market-form-company">${escapeHtml(form.company)}</label><input id="market-form-company" name="company" /></div>
        <div class="contact-field"><label for="market-form-message">${escapeHtml(form.message)}</label><textarea id="market-form-message" name="message" rows="5" required></textarea></div>
        <div class="contact-field contact-field--hp" aria-hidden="true"><label for="market-form-website">Website</label><input id="market-form-website" name="website" tabindex="-1" autocomplete="off" /></div>
        <label class="commercial-consent"><input type="checkbox" name="consent" required /> <span>${escapeHtml(form.legal)}</span></label>
        <div class="contact-form__turnstile" data-turnstile></div><p class="contact-form__status" data-contact-status aria-live="polite"></p>
        <button class="btn btn--primary" type="submit" data-contact-submit>${escapeHtml(form.submit)}</button>
      </form>
    </div>
  </section>`;
}

function renderHeader(record) {
  const blogRoutes = {
    es: "/blog/",
    en: "/en/blog/",
    de: "/de/blog/",
    fi: "/fi/blog/",
    pt: "/blog/",
  };
  const serviceRoute =
    record.marketKey === "spain" && record.sourceLocale === "es"
      ? "/servicios/"
      : footerRoutes(record).service;
  const portfolioRoute = footerRoutes(record).cases;
  const items = [
    [record.route, record.labels.home, "home"],
    [serviceRoute, record.labels.services, "services"],
    [portfolioRoute, record.labels.portfolio, "portfolio"],
    [blogRoutes[record.sourceLocale], record.labels.blog, "blog"],
    ["/web-solidaria/", record.labels.solidarity, "solidarity"],
    [
      "https://portal.webfuengirola.com/cliente",
      record.labels.client,
      "client",
    ],
  ];
  return renderSiteHeader({
    locale: record.sourceLocale,
    pathname: record.route,
    homeHref: record.route,
    items,
    ariaLabel: record.labels.nav,
    languageMenu: renderLanguageMenu(record),
    marketMenu: renderMarketSelector({
      currentMarket: record.marketKey,
      localeCode: record.localeCode,
    }),
    logoLabel: record.marketKey === "spain" ? brand.displayName : brand.name,
    logoAlt: record.marketKey === "spain" ? brand.displayName : brand.name,
  });
}

function footerRoutes(record) {
  if (record.marketKey !== "spain") {
    return {
      service: `${record.route}#services`,
      cases:
        {
          en: "/en/case-studies/",
          de: "/de/referenzen/",
          fi: "/fi/asiakastyot/",
        }[record.sourceLocale] ?? "/casos/",
      legal:
        record.sourceLocale === "en"
          ? "/en/legal/#privacy"
          : "/legal.html#privacidad",
    };
  }

  return {
    es: {
      service: "/diseno-web-fuengirola/",
      cases: "/casos/",
      legal: "/legal.html#privacidad",
    },
    en: {
      service: "/en/web-design-fuengirola/",
      cases: "/en/case-studies/",
      legal: "/en/legal/#privacy",
    },
    de: {
      service: "/de/webdesign-fuengirola/",
      cases: "/de/referenzen/",
      legal: "/de/rechtliches/#datenschutz",
    },
    fi: {
      service: "/fi/verkkosivut-fuengirola/",
      cases: "/fi/asiakastyot/",
      legal: "/fi/lakitiedot/#tietosuoja",
    },
  }[record.sourceLocale];
}

function relatedService(record) {
  if (record.marketKey !== "spain") {
    return {
      href: `${record.route}#services`,
      label: record.labels.services,
    };
  }

  return (
    {
      es: { href: "/servicios/#seo-local", label: "SEO local" },
      en: { href: "/en/local-seo-fuengirola/", label: "Local SEO" },
      de: { href: "/de/lokales-seo-fuengirola/", label: "Lokales SEO" },
      fi: {
        href: "/fi/paikallinen-seo-fuengirola/",
        label: "Paikallinen SEO",
      },
      pt: { href: `${record.route}#services`, label: record.labels.services },
    }[record.sourceLocale] ?? {
      href: `${record.route}#services`,
      label: record.labels.services,
    }
  );
}

function renderCaseShowcase(record) {
  const spainLabels = {
    es: {
      health: "Salud",
      industry: "Industria",
      realEstate: "Inmobiliaria",
      education: "Educación",
      view: "Ver caso →",
    },
    en: {
      health: "Health",
      industry: "Industry",
      realEstate: "Real estate",
      education: "Education",
      view: "View case →",
    },
    de: {
      health: "Gesundheit",
      industry: "Industrie",
      realEstate: "Immobilien",
      education: "Bildung",
      view: "Referenz ansehen →",
    },
    fi: {
      health: "Hyvinvointi",
      industry: "Teollisuus",
      realEstate: "Kiinteistöt",
      education: "Koulutus",
      view: "Katso työ →",
    },
    pt: {
      health: "Saúde",
      industry: "Indústria",
      realEstate: "Imobiliário",
      education: "Educação",
      view: "Ver projeto →",
    },
  }[record.sourceLocale] ?? {
    health: "Health",
    industry: "Industry",
    realEstate: "Real estate",
    education: "Education",
    view: "View case →",
  };
  const cases = [
    {
      href: "/casos/sport-massage-fuengirola/",
      publicHref: "https://www.sportmassagefuengirola.com",
      category: spainLabels.health,
      title: "Sport Massage Fuengirola",
      image: "/img/sport-massage-landing.png",
      width: 1179,
      height: 1941,
      mediaClass: "case-showcase__media--screen",
    },
    {
      href: "/casos/agama/",
      publicHref: "https://www.agama.com.mx",
      category: spainLabels.industry,
      title: "Agama",
      image: "/img/agama-tienda-online.png",
      width: 1672,
      height: 941,
      mediaClass:
        "case-showcase__media--screen case-showcase__media--agama-main",
    },
    {
      href: "/casos/suvilla/",
      publicHref: "https://suvilla-web.vercel.app/es",
      category: spainLabels.realEstate,
      title: "SuVilla Inmobiliaria",
      image: "/img/suvilla-real.webp",
      width: 1440,
      height: 1000,
      mediaClass: "case-showcase__media--screen",
    },
    {
      href: "/casos/samuel-coach-aleman/",
      publicHref: "https://www.samuelcoachdealeman.com",
      category: spainLabels.education,
      title: "Samuel Coach Alemán",
      image: "/img/samuel-coach.webp",
      width: 800,
      height: 400,
      mediaClass: "case-showcase__media--screen",
    },
    {
      href: "/casos/vokabellab/",
      publicHref: "https://www.vokabellab.com",
      category: "EdTech",
      title: "Vokabellab",
      image: "/img/vokabellab-real.webp",
      width: 1440,
      height: 1000,
      mediaClass: "case-showcase__media--screen",
    },
  ];

  return cases
    .map(
      ({
        href,
        publicHref,
        category,
        title,
        image,
        width,
        height,
        mediaClass,
      }) => {
        const targetHref = record.sourceLocale === "es" ? href : publicHref;
        const externalAttributes =
          record.sourceLocale === "es"
            ? ""
            : ' target="_blank" rel="noopener noreferrer"';
        return `<a href="${targetHref}" class="case-showcase__item"${externalAttributes}><div class="case-showcase__copy"><span class="case-showcase__number">${escapeHtml(category)}</span><h3>${escapeHtml(title)}</h3><span class="case-showcase__link">${escapeHtml(spainLabels.view)}</span></div><div class="case-showcase__media${mediaClass ? ` ${mediaClass}` : ""}"><img src="${image}" alt="${escapeHtml(title)}" width="${width}" height="${height}" loading="lazy" decoding="async" /></div></a>`;
      },
    )
    .join("");
}

function renderPortfolioIntro(record, casesRoute) {
  const extra = {
    es: [
      "Proyectos reales, adaptados a cada negocio.",
      "Ver todos los proyectos →",
    ],
    en: ["Real projects built around each business.", "View all projects →"],
    de: [
      "Echte Projekte, passend zum jeweiligen Unternehmen.",
      "Alle Referenzen ansehen →",
    ],
    fi: [
      "Aitoja projekteja yrityksen tarpeisiin.",
      "Katso kaikki asiakastyöt →",
    ],
    pt: [
      "Projetos reais, adaptados a cada negócio.",
      "Ver todos os projetos →",
    ],
  }[record.sourceLocale] ?? [
    "Real projects built around each business.",
    "View all projects →",
  ];

  return `<div class="case-showcase__intro"><span class="section-label">${escapeHtml(record.labels.casesEyebrow)}</span><h2 class="case-showcase__title">${escapeHtml(record.labels.casesHeading)}</h2>${extra ? `<p class="case-showcase__sub">${escapeHtml(extra[0])}</p><a href="${casesRoute}" class="btn btn--outline-light btn--sm">${escapeHtml(extra[1])}</a>` : ""}</div>`;
}

function renderProcessSection() {
  return "";
}

function renderFaqSection(record) {
  const heading =
    {
      es: "Todas tus dudas resueltas",
      en: "Your questions answered",
      de: "Antworten auf Ihre Fragen",
      fi: "Vastaukset yleisiin kysymyksiin",
      pt: "Todas as suas dúvidas respondidas",
    }[record.sourceLocale] ?? record.labels.faqHeading;

  return `<section class="faq-home" id="faq" aria-labelledby="faq-home-title"><div class="container"><div class="section-header"><span class="section-label">${escapeHtml(record.labels.faqHeading)}</span><h2 class="section-title" id="faq-home-title">${escapeHtml(heading)}</h2></div><div class="faq-home__list">${record.faqs.map(({ question, answer }, index) => `<details class="faq-home__item"${index === 0 ? " open" : ""}><summary class="faq-home__question">${escapeHtml(question)}</summary><p class="faq-home__answer">${escapeHtml(answer)}</p></details>`).join("")}</div></div></section>`;
}

function renderFooter(record, whatsapp) {
  const routes = footerRoutes(record);
  return `<footer class="footer"><div class="container footer__inner">
    <div class="footer__brand"><a href="${record.route}" class="logo"><img src="/img/logo-wf.webp" alt="WF-Studio" width="36" height="36" /></a><p>${escapeHtml(record.description)}</p></div>
    <div class="footer__col"><h4>${escapeHtml(record.labels.services)}</h4><ul class="footer__links"><li><a href="${routes.service}">${escapeHtml(record.labels.services)}</a></li></ul></div>
    <div class="footer__col"><h4>${escapeHtml(record.labels.portfolio)}</h4><ul class="footer__links"><li><a href="${routes.cases}">${escapeHtml(record.labels.portfolio)}</a></li></ul></div>
    <div class="footer__col"><h4>Legal</h4><ul class="footer__links"><li><a href="${routes.legal}">Legal</a></li></ul></div>
    <div class="footer__col"><h4>${escapeHtml(record.labels.contact)}</h4><ul class="footer__links"><li><a href="mailto:${brand.email}">${brand.email}</a></li><li><a href="${whatsapp}">WhatsApp</a></li></ul></div>
  </div></footer>`;
}

function renderJsonLd(record) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["Organization", "ProfessionalService"],
          "@id": `${brand.site}/#organization`,
          name: brand.name,
          ...(record.marketKey === "spain"
            ? { alternateName: brand.localName }
            : {}),
          url: brand.site,
          email: brand.email,
          telephone: record.contactPhone,
          areaServed: record.areaServed,
        },
        {
          "@type": "WebPage",
          "@id": `${absolute(record.route)}#page`,
          url: absolute(record.route),
          name: record.title,
          description: record.description,
          inLanguage: record.localeCode,
          about: { "@id": `${brand.site}/#organization` },
        },
        {
          "@type": "FAQPage",
          mainEntity: record.faqs.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ],
    },
    null,
    2,
  );
}

export function renderHomepage(record, snapshot = defaultSnapshot) {
  const whatsappNumber = record.contactPhone.replace(/\D/g, "");
  const whatsapp = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(record.whatsappText)}`;
  const routes = footerRoutes(record);
  const related = relatedService(record);
  const publicBrand =
    record.marketKey === "spain" ? brand.displayName : brand.name;
  return `<!doctype html>
<html lang="${record.htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(record.title)}</title>
  <meta name="description" content="${escapeHtml(record.description)}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href="${absolute(record.route)}" />
${renderAlternates(record)}
  <link rel="icon" href="/favicon.webp" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta property="og:title" content="${escapeHtml(record.title)}" />
  <meta property="og:description" content="${escapeHtml(record.description)}" />
  <meta property="og:url" content="${absolute(record.route)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${escapeHtml(publicBrand)}" />
  <meta property="og:locale" content="${record.ogLocale}" />
  <meta property="og:image" content="${brand.site}/img/og-cover.jpg" />
  <meta property="og:image:secure_url" content="${brand.site}/img/og-cover.jpg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${escapeHtml(record.hero.h1)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${brand.site}/img/og-cover.jpg" />
  <meta name="twitter:image:alt" content="${escapeHtml(record.hero.h1)}" />
  <script type="application/ld+json">${renderJsonLd(record)}</script>
  <link rel="stylesheet" href="/style.css?v=15" />
  <link rel="stylesheet" href="/cookie-banner-core.css" />
  <noscript><style>[data-reveal] { opacity: 1; transform: none; }</style></noscript>
</head>
<body class="home-page" data-market="${record.marketKey}" data-locale="${record.localeCode}" data-currency="${record.currency}">
${renderHeader(record)}
<main id="main-content">
  <section class="hero hero--cinematic" id="inicio" data-fab-theme="dark">
    <div class="hero__cin-bg" aria-hidden="true"><div class="hero__cin-anim"></div><div class="hero__cin-overlay"></div><div class="hero__cin-grid"></div></div>
    <div class="container hero__cin-inner">
      <div class="hero__showcase" aria-label="${escapeHtml(record.labels.portfolio)}">
        <div class="hero__showcase-grid" aria-hidden="true"></div>
        <figure class="hero__site-screen hero__site-screen--rear"><img src="/img/hero-personal-trainer-real-screen.png" alt="Personal trainer website by WF-Studio" width="1440" height="900" loading="eager" decoding="async" /></figure>
        <figure class="hero__site-screen hero__site-screen--front"><img class="hero__site-screen-bg" src="/img/hero-northern-lights-screen-branded.png" alt="WF-Studio website showcase" width="1740" height="904" loading="eager" decoding="async" /></figure>
      </div>
      <div class="hero__cin-content">
        <span class="hero__cin-label">${escapeHtml(record.hero.eyebrow)}</span>
        <h1 class="hero__cin-title">${escapeHtml(record.hero.h1)}</h1>
        <p class="hero__cin-sub">${escapeHtml(record.hero.intro)}</p>
        <div class="hero__actions hero__cin-actions"><a href="#contact" class="btn btn--primary btn--lg">${escapeHtml(record.labels.primaryCta)}</a><a href="${routes.cases}" class="btn btn--outline-light btn--lg">${escapeHtml(record.labels.portfolioCta)}</a></div>
      </div>
    </div>
  </section>
  <div class="stack-cards-track"><div class="stack-card-wrap">
    <section class="services stack-card" id="services"><div class="container">
      <div class="section-header"><span class="section-label">${escapeHtml(record.labels.servicesEyebrow)}</span><h2 class="section-title">${escapeHtml(record.labels.servicesHeading)}</h2></div>
      <div class="services-home-deck">${renderServices(record, snapshot)}</div>
${record.currency === "EUR" ? "" : `      <p class="commercial-price-note">${escapeHtml(record.labels.rateNote)}: ${escapeHtml(snapshot.date)} · ${escapeHtml(record.labels.tax)}</p>`}
      <div class="stack-space-lg-center"><a href="${related.href}" class="btn btn--outline btn--lg">${escapeHtml(related.label)} →</a></div>
    </div></section>
  </div></div>
  <section class="section" id="portfolio"><div class="container"><div class="case-showcase">
    ${renderPortfolioIntro(record, routes.cases)}
    <div class="case-showcase__stack">
      ${renderCaseShowcase(record)}
    </div>
  </div></div></section>
${renderProcessSection(record)}
  ${renderFaqSection(record)}
  ${renderContact(record, whatsapp)}
</main>
${renderFooter(record, whatsapp)}
<a href="${whatsapp}" class="whatsapp-fab" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(record.sourceLocale === "es" ? "Contactar por WhatsApp" : "WhatsApp")}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52ZM12 22c-1.85 0-3.67-.5-5.25-1.44l-.38-.22-3.67.96.98-3.58-.24-.38A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10Zm5.48-7.48c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg></a>
<div class="page-transition" id="page-transition" aria-hidden="true"></div>
<script src="/cookie-banner-core.js"></script>
<script src="/umami-analytics-core.js"></script>
<script src="/contact-form-core.js"></script>
<script src="/contact-form.js"></script>
<script src="/script.js?v=13"></script>
</body>
</html>`;
}

export function generateHomepages(
  outputRoot = root,
  {
    marketKeys = Object.keys(homepageRecords),
    snapshot = defaultSnapshot,
  } = {},
) {
  const written = [];
  for (const marketKey of marketKeys) {
    for (const localeCode of Object.keys(homepageRecords[marketKey] ?? {})) {
      const record = getHomepageRecord(marketKey, localeCode);
      const file = routeFile(outputRoot, record.route);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, renderHomepage(record, snapshot));
      written.push(file);
    }
  }
  return written;
}
