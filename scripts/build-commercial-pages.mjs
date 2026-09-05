import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  brand,
  extras,
  getPageGroup,
  legalRoutes,
  locales,
  pageGroups,
  tiers,
} from "../data/commercial-pages-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localeCodes = Object.keys(locales);

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function routeFile(outputRoot, route) {
  if (route === "/") return path.join(outputRoot, "index.html");
  if (route.endsWith(".html")) return path.join(outputRoot, route.slice(1));
  return path.join(outputRoot, route.slice(1), "index.html");
}

function absolute(route) {
  return `${brand.site}${route}`;
}

export function renderHreflang(groupKey) {
  const group = getPageGroup(groupKey);
  if (!group) throw new Error(`Unknown commercial page group: ${groupKey}`);
  const alternates = localeCodes
    .map(
      (locale) =>
        `  <link rel="alternate" hreflang="${locale}" href="${absolute(group.routes[locale])}" />`,
    )
    .join("\n");
  return `${alternates}\n  <link rel="alternate" hreflang="x-default" href="${absolute(group.routes.es)}" />`;
}

function renderLanguageSelector(group, locale, mobile = false) {
  return `<div class="lang-switcher${mobile ? " lang-switcher--mobile" : ""}" aria-label="Language">
    ${localeCodes
      .map(
        (code) =>
          `<a class="lang-switcher__btn${code === locale ? " is-active" : ""}" href="${absolute(group.routes[code])}" hreflang="${code}" lang="${code}" data-analytics-event="language_switch" data-analytics-locale="${locale}" data-analytics-target-locale="${code}">${escapeHtml(locales[code].label)}</a>`,
      )
      .join("\n    ")}
  </div>`;
}

function renderHeader(group, locale) {
  const ui = locales[locale];
  const route = (key) => getPageGroup(key).routes[locale];
  const blogRoute = locale === "es" ? "/blog/" : `/${locale}/blog/`;
  return `<header class="header" id="header">
    <div class="container header__inner commercial-header__inner">
      <a href="${route("home")}" class="logo commercial-logo" aria-label="${brand.displayName}">
        <img src="/img/logo-wf.webp" alt="WF-Studio" class="logo__img" width="36" height="36" loading="eager" />
        <span><strong>WF-Studio</strong><small>Web Fuengirola</small></span>
      </a>
      <nav class="nav" id="nav" aria-label="${escapeHtml(ui.servicesLabel)}">
        <ul class="nav__list">
          <li><a href="${route("design")}" class="nav__link">${escapeHtml(ui.servicesLabel)}</a></li>
          <li><a href="${route("seo")}" class="nav__link">${escapeHtml(ui.seoLabel)}</a></li>
          <li><a href="${route("apps")}" class="nav__link">${escapeHtml(ui.appsLabel)}</a></li>
          <li><a href="${route("automation")}" class="nav__link">${escapeHtml(ui.automationLabel)}</a></li>
          <li><a href="${route("cases")}" class="nav__link">${escapeHtml(ui.casesLabel)}</a></li>
          <li><a href="${route("prices")}" class="nav__link">${escapeHtml(ui.pricesLabel)}</a></li>
          <li><a href="${blogRoute}" class="nav__link">${escapeHtml(ui.blogLabel)}</a></li>
          <li class="commercial-mobile-languages">${renderLanguageSelector(group, locale, true)}</li>
        </ul>
      </nav>
      ${renderLanguageSelector(group, locale)}
      <a href="${route("contact")}?sector=${group.key}" class="btn btn--primary header__cta" data-analytics-event="quote_click" data-analytics-sector="${group.key}" data-analytics-locale="${locale}">${escapeHtml(ui.quoteLabel)}</a>
      <button type="button" class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
    </div>
  </header>`;
}

function renderBreadcrumbs(group, locale) {
  const ui = locales[locale];
  if (group.key === "home") return "";
  return `<nav class="commercial-breadcrumbs" aria-label="Breadcrumb">
    <a href="${getPageGroup("home").routes[locale]}">${escapeHtml(ui.homeLabel)}</a><span aria-hidden="true">›</span><span>${escapeHtml(group.content[locale].h1)}</span>
  </nav>`;
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

export function renderTierCards(group, locale) {
  const content = group.content[locale];
  const ui = locales[locale];
  return `<div class="commercial-tier-grid">
    ${tiers
      .map(
        (tier, index) => `<article class="commercial-tier${tier.popular ? " commercial-tier--featured" : ""}">${tier.popular ? `
      <span class="commercial-tier__badge">${locale === "es" ? "Más popular" : locale === "en" ? "Most popular" : locale === "de" ? "Am beliebtesten" : "Suosituin"}</span>` : ""}
      <h3>${escapeHtml(tier.name[locale])}</h3>
      <p class="commercial-tier__price"><span data-tier-price="${tier.price}">${tier.price} €</span> <small>${escapeHtml(ui.vatLabel)}</small></p>
      <p>${escapeHtml(content.tierUses[index])}</p>
      <ul>${tier.features[locale].map((feature) => `<li>✓ ${escapeHtml(feature)}</li>`).join("")}</ul>
      <a class="btn ${tier.popular ? "btn--primary" : "btn--outline"}" href="${getPageGroup("contact").routes[locale]}?plan=${tier.key}&amp;sector=${group.key}" data-analytics-event="tier_select" data-analytics-tier="${tier.key}" data-analytics-sector="${group.key}" data-analytics-locale="${locale}">${escapeHtml(ui.quoteLabel)}</a>
    </article>`,
      )
      .join("\n")}
  </div>`;
}

function renderExtras(locale) {
  return `<ul class="commercial-chip-list">${extras[locale]
    .map((extra) => `<li>${escapeHtml(extra)}</li>`)
    .join("")}</ul>`;
}

function renderCases(group, locale) {
  if (!group.cases.length) {
    const message = {
      es: "Esta solución se mostrará con una demostración sectorial. No atribuimos resultados a clientes que no existen.",
      en: "This solution will use a sector demonstration. We never attribute results to clients that do not exist.",
      de: "Diese Lösung wird mit einer Branchendemonstration gezeigt. Wir schreiben erfundenen Kunden keine Ergebnisse zu.",
      fi: "Ratkaisu esitellään toimialakohtaisella demolla. Emme liitä tuloksia keksittyihin asiakkaisiin.",
    };
    return `<p class="commercial-proof-note">${escapeHtml(message[locale])}</p>`;
  }
  const caseHub = getPageGroup("cases").routes[locale];
  return `<div class="commercial-case-links">${group.cases
    .map((caseSlug) => `<a${group.key === "cases" ? ` id="${caseSlug}"` : ""} href="${locale === "es" ? `/casos/${caseSlug}/` : `${caseHub}#${caseSlug}`}">${escapeHtml(caseSlug.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" "))} →</a>`)
    .join("")}</div>`;
}

function renderFaqs(content) {
  return `<div class="commercial-faq">${content.faqs
    .map(
      ([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`,
    )
    .join("")}</div>`;
}

function formLabels(locale, audit) {
  const copy = {
    es: { name: "Nombre", email: "Email", company: "Empresa", url: "URL de la web", sector: "Sector", location: "Localidad", message: audit ? "¿Qué problema notas en tu web?" : "¿Qué necesitas?", consent: "Acepto que WF-Studio use estos datos para responder a mi solicitud.", submit: audit ? "Solicitar auditoría" : "Enviar consulta" },
    en: { name: "Name", email: "Email", company: "Business", url: "Website URL", sector: "Sector", location: "Location", message: audit ? "What problem have you noticed on your website?" : "What do you need?", consent: "I agree that WF-Studio may use this information to answer my request.", submit: audit ? "Request audit" : "Send enquiry" },
    de: { name: "Name", email: "E-Mail", company: "Unternehmen", url: "Website-URL", sector: "Branche", location: "Ort", message: audit ? "Welches Problem hat Ihre Website?" : "Was benötigen Sie?", consent: "Ich stimme zu, dass WF-Studio diese Angaben zur Beantwortung meiner Anfrage verwendet.", submit: audit ? "Analyse anfragen" : "Anfrage senden" },
    fi: { name: "Nimi", email: "Sähköposti", company: "Yritys", url: "Verkkosivun osoite", sector: "Toimiala", location: "Paikkakunta", message: audit ? "Minkä ongelman olet huomannut sivustollasi?" : "Mitä tarvitset?", consent: "Hyväksyn, että WF-Studio käyttää tietoja pyyntööni vastaamiseen.", submit: audit ? "Pyydä analyysi" : "Lähetä viesti" },
  };
  return copy[locale];
}

function renderForm(group, locale) {
  if (!["audit", "contact"].includes(group.kind)) return "";
  const audit = group.kind === "audit";
  const label = formLabels(locale, audit);
  return `<section class="section commercial-form-section" id="form">
    <div class="container commercial-form-wrap">
      <div><span class="section-label">${audit ? escapeHtml(locales[locale].auditLabel) : escapeHtml(locales[locale].contactLabel)}</span><h2>${escapeHtml(group.content[locale].h1)}</h2><p>${escapeHtml(group.content[locale].intro)}</p></div>
      <form class="contact-form" data-contact-form data-form-locale="${locale}" data-form-kind="${audit ? "audit" : "contact"}" data-api-base="https://admin.webfuengirola.com" novalidate>
        <div class="contact-form__grid"><div class="contact-field"><label for="form-name">${label.name}</label><input id="form-name" name="name" required /></div><div class="contact-field"><label for="form-email">${label.email}</label><input id="form-email" name="email" type="email" required /></div></div>
        <div class="contact-field"><label for="form-company">${label.company}</label><input id="form-company" name="company" /></div>
${audit ? `<div class="contact-field"><label for="form-url">${label.url}</label><input id="form-url" name="auditUrl" type="url" required /></div><div class="contact-form__grid"><div class="contact-field"><label for="form-sector">${label.sector}</label><input id="form-sector" name="sector" required /></div><div class="contact-field"><label for="form-location">${label.location}</label><input id="form-location" name="location" value="Fuengirola" required /></div></div>` : ""}
        <div class="contact-field"><label for="form-message">${label.message}</label><textarea id="form-message" name="message" rows="5" required></textarea></div>
        <div class="contact-field contact-field--hp" aria-hidden="true"><label for="form-website">Website</label><input id="form-website" name="website" tabindex="-1" autocomplete="off" /></div>
        <label class="commercial-consent"><input type="checkbox" name="consent" required /> <span>${label.consent}</span></label>
        <div class="contact-form__turnstile" data-turnstile></div><p class="contact-form__status" data-contact-status aria-live="polite"></p>
        <button class="btn btn--primary" type="submit" data-contact-submit>${label.submit}</button>
      </form>
    </div>
  </section>`;
}

function renderRelated(group, locale) {
  const ui = locales[locale];
  const route = (key) => getPageGroup(key).routes[locale];
  return `<div class="commercial-related">
    <a href="${route("audit")}" data-analytics-event="audit_click" data-analytics-locale="${locale}">${escapeHtml(ui.auditLabel)} →</a>
    <a href="${route("prices")}">${escapeHtml(ui.pricesLabel)} →</a>
    <a href="${route("contact")}?sector=${group.key}" data-analytics-event="quote_click" data-analytics-sector="${group.key}" data-analytics-locale="${locale}">${escapeHtml(ui.quoteLabel)} →</a>
  </div>`;
}

function renderFooter(locale) {
  const ui = locales[locale];
  const route = (key) => getPageGroup(key).routes[locale];
  const legalAnchor = locale === "es"
    ? { notice: "aviso-legal", privacy: "privacidad" }
    : { notice: "legal-notice", privacy: "privacy" };
  return `<footer class="footer"><div class="container footer__inner">
    <div class="footer__brand"><a href="${route("home")}" class="commercial-logo commercial-logo--footer"><img src="/img/logo-wf.webp" alt="WF-Studio" width="36" height="36" /><span><strong>WF-Studio</strong><small>Web Fuengirola</small></span></a><p class="footer__tagline">${escapeHtml(getPageGroup("home").content[locale].description)}</p></div>
    <div class="footer__col"><h4>${escapeHtml(ui.servicesLabel)}</h4><ul class="footer__links"><li><a href="${route("clinics")}">${escapeHtml(getPageGroup("clinics").content[locale].h1)}</a></li><li><a href="${route("trainers")}">${escapeHtml(getPageGroup("trainers").content[locale].h1)}</a></li><li><a href="${route("restaurants")}">${escapeHtml(getPageGroup("restaurants").content[locale].h1)}</a></li><li><a href="${route("multilingual")}">${escapeHtml(getPageGroup("multilingual").content[locale].h1)}</a></li></ul></div>
    <div class="footer__col"><h4>${escapeHtml(ui.capabilitiesLabel)}</h4><ul class="footer__links"><li><a href="${route("apps")}">${escapeHtml(ui.appsLabel)}</a></li><li><a href="${route("automation")}">${escapeHtml(ui.automationLabel)}</a></li><li><a href="${route("seo")}">${escapeHtml(ui.seoLabel)}</a></li><li><a href="${route("cases")}">${escapeHtml(ui.casesLabel)}</a></li></ul></div>
    <div class="footer__col"><h4>${escapeHtml(ui.contactLabel)}</h4><ul class="footer__links"><li><a href="${route("prices")}">${escapeHtml(ui.pricesLabel)}</a></li><li><a href="${route("audit")}">${escapeHtml(ui.auditLabel)}</a></li><li><a href="${route("contact")}">${escapeHtml(ui.contactLabel)}</a></li><li><a href="mailto:${brand.email}" data-analytics-event="email_click" data-analytics-locale="${locale}">${brand.email}</a></li><li><a href="tel:${brand.phone}" data-analytics-event="phone_click" data-analytics-locale="${locale}">${brand.phone}</a></li></ul></div>
    <div class="footer__col"><h4>${escapeHtml(ui.legalLabel)}</h4><ul class="footer__links"><li><a href="${legalRoutes[locale]}#${legalAnchor.notice}">${escapeHtml(ui.legalLabel)}</a></li><li><a href="${legalRoutes[locale]}#${legalAnchor.privacy}">${escapeHtml(ui.privacyLabel)}</a></li><li><a href="${legalRoutes[locale]}#cookies">${escapeHtml(ui.cookiesLabel)}</a></li><li><a href="#" data-cookie-preferences-link>${escapeHtml(ui.cookieSettingsLabel)}</a></li></ul></div>
  </div><div class="footer__bottom"><div class="container"><p>© <span id="footer-year"></span> ${brand.displayName}</p></div></div></footer>`;
}

function renderJsonLd(group, locale) {
  const content = group.content[locale];
  const canonical = absolute(group.routes[locale]);
  const faq = {
    "@type": "FAQPage",
    mainEntity: content.faqs.map(([name, answer]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["Organization", "ProfessionalService"],
          "@id": `${brand.site}/#organization`,
          name: brand.name,
          alternateName: brand.localName,
          url: brand.site,
          telephone: brand.phone,
          email: brand.email,
          areaServed: ["Fuengirola", "Costa del Sol", "Málaga"],
        },
        {
          "@type": group.kind === "home" ? "WebSite" : "WebPage",
          "@id": `${canonical}#page`,
          url: canonical,
          name: content.title,
          description: content.description,
          inLanguage: locale,
          about: { "@id": `${brand.site}/#organization` },
        },
        faq,
      ],
    },
    null,
    2,
  );
}

const legalCopy = {
  en: {
    title: "Legal notice, privacy and cookies | WF-Studio",
    description: "Legal information, privacy policy and cookie policy for WF-Studio · Web Fuengirola.",
    h1: "Legal information, privacy and cookies",
    intro: "This page explains who operates the website, how contact data is handled and which technical storage the website uses.",
    index: "Contents",
    notice: "Legal notice",
    noticeText: "This website is operated by WF-Studio. Contact: info@webfuengirola.com. Website: https://webfuengirola.com. Access implies responsible use of the content and services. Text, images, design and code belong to the owner or are used with permission.",
    privacy: "Privacy policy",
    privacyText: "Contact and quote-request data is used only to answer enquiries, prepare requested information and manage communications about WF-Studio services. Processing is based on the user's consent. Data is not sold and is shared only when legally required or with essential service providers under appropriate safeguards.",
    rights: "You may request access, correction, deletion, restriction, objection or portability by emailing info@webfuengirola.com. You may also complain to the Spanish Data Protection Agency.",
    cookies: "Cookie policy",
    cookiesText: "The website uses essential browser storage for language and consent preferences. Cookieless, privacy-oriented traffic measurement may be used without advertising profiles. Any future non-essential cookies will require prior consent.",
    updated: "Last updated: September 2026.",
  },
  de: {
    title: "Impressum, Datenschutz und Cookies | WF-Studio",
    description: "Rechtliche Informationen, Datenschutz- und Cookie-Richtlinie von WF-Studio · Web Fuengirola.",
    h1: "Rechtliche Informationen, Datenschutz und Cookies",
    intro: "Diese Seite erklärt den Betreiber, die Verarbeitung von Kontaktdaten und die technische Speicherung der Website.",
    index: "Inhalt",
    notice: "Rechtliche Hinweise",
    noticeText: "Diese Website wird von WF-Studio betrieben. Kontakt: info@webfuengirola.com. Website: https://webfuengirola.com. Der Zugriff setzt eine verantwortungsvolle Nutzung der Inhalte und Dienste voraus. Texte, Bilder, Design und Code gehören dem Betreiber oder werden mit Genehmigung verwendet.",
    privacy: "Datenschutzerklärung",
    privacyText: "Daten aus Kontakt- und Angebotsanfragen werden ausschließlich zur Beantwortung, zur Erstellung angeforderter Informationen und für die Kommunikation über WF-Studio-Leistungen verwendet. Grundlage ist die Einwilligung. Daten werden nicht verkauft und nur bei gesetzlicher Pflicht oder an notwendige Dienstleister mit geeigneten Garantien weitergegeben.",
    rights: "Sie können Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch oder Datenübertragbarkeit per E-Mail an info@webfuengirola.com verlangen. Eine Beschwerde bei der spanischen Datenschutzbehörde ist ebenfalls möglich.",
    cookies: "Cookie-Richtlinie",
    cookiesText: "Die Website verwendet notwendigen Browserspeicher für Sprach- und Einwilligungspräferenzen. Eine cookielose, datenschutzorientierte Reichweitenmessung kann ohne Werbeprofile eingesetzt werden. Zukünftige nicht notwendige Cookies erfordern vorherige Zustimmung.",
    updated: "Letzte Aktualisierung: September 2026.",
  },
  fi: {
    title: "Lakitiedot, tietosuoja ja evästeet | WF-Studio",
    description: "WF-Studio · Web Fuengirolan lakitiedot, tietosuojakäytäntö ja evästekäytäntö.",
    h1: "Lakitiedot, tietosuoja ja evästeet",
    intro: "Tällä sivulla kerrotaan sivuston ylläpitäjästä, yhteystietojen käsittelystä ja teknisestä tallennuksesta.",
    index: "Sisältö",
    notice: "Lakitiedot",
    noticeText: "Sivustoa ylläpitää WF-Studio. Yhteys: info@webfuengirola.com. Sivusto: https://webfuengirola.com. Sivustoa ja sen sisältöä on käytettävä vastuullisesti. Tekstit, kuvat, suunnittelu ja koodi kuuluvat omistajalle tai niitä käytetään luvalla.",
    privacy: "Tietosuojakäytäntö",
    privacyText: "Yhteydenotto- ja tarjouspyyntötietoja käytetään vain kyselyihin vastaamiseen, pyydettyjen tietojen laatimiseen ja WF-Studion palveluviestintään. Käsittely perustuu käyttäjän suostumukseen. Tietoja ei myydä, ja niitä luovutetaan vain lain vaatiessa tai välttämättömille palveluntarjoajille asianmukaisin suojatoimin.",
    rights: "Voit pyytää tietojen tarkastamista, oikaisua, poistamista, käsittelyn rajoittamista, vastustamista tai siirtoa sähköpostitse osoitteesta info@webfuengirola.com. Voit myös valittaa Espanjan tietosuojaviranomaiselle.",
    cookies: "Evästekäytäntö",
    cookiesText: "Sivusto käyttää välttämätöntä selaintallennusta kieli- ja suostumusasetuksiin. Evästeetöntä, yksityisyyttä kunnioittavaa kävijämittausta voidaan käyttää ilman mainosprofiileja. Tulevat ei-välttämättömät evästeet edellyttävät ennakkosuostumusta.",
    updated: "Päivitetty viimeksi: syyskuu 2026.",
  },
};

function renderLocalizedLegalPage(locale) {
  const copy = legalCopy[locale];
  const canonical = absolute(legalRoutes[locale]);
  const languageLinks = Object.entries(legalRoutes)
    .map(([code, route]) => `  <link rel="alternate" hreflang="${code}" href="${absolute(route)}" />`)
    .join("\n");
  return `<!doctype html>
<html lang="${locale}"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(copy.title)}</title><meta name="description" content="${escapeHtml(copy.description)}" /><meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
${languageLinks}
  <link rel="alternate" hreflang="x-default" href="${absolute(legalRoutes.es)}" />
  <link rel="stylesheet" href="/style.css?v=10" /><link rel="stylesheet" href="/legal-core.css" /><link rel="stylesheet" href="/cookie-banner-core.css" />
</head><body class="commercial-page legal-page" data-sector="legal">
${renderHeader({ key: "legal", routes: legalRoutes }, locale)}
<section class="commercial-hero"><div class="container"><span class="section-label">${brand.displayName}</span><h1>${escapeHtml(copy.h1)}</h1><p>${escapeHtml(copy.intro)}</p></div></section>
<main class="legal-wrap"><nav class="legal-index" aria-label="${escapeHtml(copy.index)}"><p>${escapeHtml(copy.index)}</p><ol><li><a href="#legal-notice">${escapeHtml(copy.notice)}</a></li><li><a href="#privacy">${escapeHtml(copy.privacy)}</a></li><li><a href="#cookies">${escapeHtml(copy.cookies)}</a></li></ol></nav>
<section class="legal-section" id="legal-notice"><h2>${escapeHtml(copy.notice)}</h2><p>${escapeHtml(copy.noticeText)}</p></section>
<section class="legal-section" id="privacy"><h2>${escapeHtml(copy.privacy)}</h2><p>${escapeHtml(copy.privacyText)}</p><p>${escapeHtml(copy.rights)}</p></section>
<section class="legal-section" id="cookies"><h2>${escapeHtml(copy.cookies)}</h2><p>${escapeHtml(copy.cookiesText)}</p><p><a href="#" data-cookie-preferences-link>${escapeHtml(locales[locale].cookieSettingsLabel)}</a></p></section><p>${escapeHtml(copy.updated)}</p></main>
${renderFooter(locale)}<script src="/cookie-banner-core.js"></script><script src="/umami-analytics-core.js"></script><script src="/script.js"></script></body></html>`;
}

export function renderCommercialPage(group, locale) {
  const content = group.content[locale];
  const ui = locales[locale];
  const canonical = absolute(group.routes[locale]);
  const showTiers = ["home", "service", "pricing", "sector"].includes(group.kind);
  const showForm = ["audit", "contact"].includes(group.kind);
  const whatsapp = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(content.whatsappText)}`;
  return `<!doctype html>
<html lang="${locales[locale].htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(content.title)}</title>
  <meta name="description" content="${escapeHtml(content.description)}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href="${canonical}" />
${renderHreflang(group.key)}
  <link rel="icon" href="/favicon.webp" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta property="og:title" content="${escapeHtml(content.title)}" />
  <meta property="og:description" content="${escapeHtml(content.description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${brand.displayName}" />
  <meta property="og:locale" content="${locales[locale].ogLocale}" />
  <meta property="og:image" content="${brand.site}/img/og-cover.webp" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(content.title)}" />
  <meta name="twitter:description" content="${escapeHtml(content.description)}" />
  <meta name="twitter:image" content="${brand.site}/img/og-cover.webp" />
  <script type="application/ld+json">${renderJsonLd(group, locale)}</script>
  <link rel="stylesheet" href="/style.css?v=10" />
  <link rel="stylesheet" href="/cookie-banner-core.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
</head>
<body class="commercial-page commercial-page--${group.kind}" data-sector="${group.key}">
${renderHeader(group, locale)}
<main>
  <section class="commercial-hero"><div class="container">${renderBreadcrumbs(group, locale)}<span class="section-label">${brand.displayName}</span><h1>${escapeHtml(content.h1)}</h1><p>${escapeHtml(content.intro)}</p><div class="commercial-hero__actions"><a class="btn btn--primary btn--lg" href="${getPageGroup("contact").routes[locale]}?sector=${group.key}" data-analytics-event="quote_click" data-analytics-sector="${group.key}" data-analytics-locale="${locale}">${escapeHtml(ui.quoteLabel)}</a><a class="btn btn--outline btn--lg" href="${whatsapp}" target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-sector="${group.key}" data-analytics-locale="${locale}">WhatsApp</a></div></div></section>
${showForm ? "" : `<section class="section"><div class="container"><span class="section-label">${escapeHtml(ui.problemsLabel)}</span><h2>${escapeHtml(ui.problemsLabel)} ${escapeHtml(ui.localContextLabel)}</h2>${renderCards(content.problems)}</div></section>`}
${showForm ? "" : `<section class="section commercial-section--warm"><div class="container"><span class="section-label">${escapeHtml(ui.benefitsLabel)}</span><h2>${escapeHtml(ui.benefitsLabel)}</h2>${renderCards(content.benefits)}${renderCases(group, locale)}</div></section>`}
${showTiers ? `<section class="section" id="modalidades"><div class="container"><span class="section-label">Lite · Express · Profesional</span><h2>${escapeHtml(ui.tiersLabel)}</h2>${renderTierCards(group, locale)}</div></section><section class="section commercial-section--warm"><div class="container"><span class="section-label">${escapeHtml(ui.extrasLabel)}</span><h2>${escapeHtml(ui.extrasLabel)}</h2>${renderExtras(locale)}</div></section>` : ""}
${renderForm(group, locale)}
  <section class="section"><div class="container"><span class="section-label">${escapeHtml(ui.faqLabel)}</span><h2>${escapeHtml(ui.faqLabel)} · Fuengirola</h2>${renderFaqs(content)}<div class="commercial-related-wrap"><h2>${escapeHtml(ui.relatedLabel)}</h2>${renderRelated(group, locale)}</div></div></section>
</main>
${renderFooter(locale)}
<script src="/cookie-banner-core.js"></script>
<script src="/umami-analytics-core.js"></script>
${showForm ? `<script src="/contact-form-core.js"></script>\n<script src="/contact-form.js"></script>` : ""}
<script src="/script.js"></script>
</body>
</html>`;
}

export function generateCommercialPages(outputRoot = root) {
  const written = [];
  for (const group of pageGroups) {
    for (const locale of localeCodes) {
      const file = routeFile(outputRoot, group.routes[locale]);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, renderCommercialPage(group, locale));
      written.push(file);
    }
  }
  for (const locale of ["en", "de", "fi"]) {
    const file = routeFile(outputRoot, legalRoutes[locale]);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, renderLocalizedLegalPage(locale));
    written.push(file);
  }
  return written;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const written = generateCommercialPages();
  console.log(`Generated ${written.length} WF-Studio commercial pages.`);
}
