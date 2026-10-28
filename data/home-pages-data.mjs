import { brand, getPageGroup, tiers } from "./commercial-pages-data.mjs";
import { getMarket } from "./markets-data.mjs";

const spainLocales = {
  "es-ES": {
    sourceLocale: "es",
    ogLocale: "es_ES",
    hero: {
      eyebrow: "Diseño web en Fuengirola para negocio local",
      h1: "La web que tu negocio se merece.",
      intro:
        "Orientada a explicar mejor tu negocio, captar contactos y crecer con una base digital clara.",
    },
    labels: {
      home: "Inicio",
      services: "Servicios",
      portfolio: "Portfolio",
      process: "Cómo trabajamos",
      contact: "Contacto",
      client: "Área cliente",
      language: "Cambiar idioma",
      nav: "Navegación principal",
      primaryCta: "Pedir presupuesto",
      portfolioCta: "Ver portfolio",
      servicesEyebrow: "Servicios",
      servicesHeading: "Una web clara para cada etapa del negocio",
      casesEyebrow: "Proyectos recientes",
      casesHeading: "Casos de éxito",
      processEyebrow: "01 · 02 · 03",
      processHeading: "De la idea a una web publicada",
      faqHeading: "Preguntas frecuentes",
      contactHeading: "Cuéntanos qué necesitas",
      contactText:
        "Te responderemos con el siguiente paso más útil para tu proyecto.",
      from: "Desde",
      tax: "+ IVA",
    },
    process: [
      [
        "Diagnóstico",
        "Revisamos negocio, público, materiales y objetivo comercial.",
      ],
      [
        "Propuesta",
        "Definimos alcance, calendario, precio y entregables antes de empezar.",
      ],
      [
        "Producción y entrega",
        "Diseñamos, desarrollamos, revisamos contigo y publicamos.",
      ],
    ],
  },
  "en-GB": {
    sourceLocale: "en",
    ogLocale: "en_GB",
    hero: {
      eyebrow: "Web design in Fuengirola for local businesses",
      h1: "The website your business deserves.",
      intro:
        "Built to explain your business clearly, generate enquiries and support steady digital growth.",
    },
    labels: {
      home: "Home",
      services: "Services",
      portfolio: "Case studies",
      process: "How we work",
      contact: "Contact",
      client: "Client area",
      language: "Change language",
      nav: "Main navigation",
      primaryCta: "Request a quote",
      portfolioCta: "View portfolio",
      servicesEyebrow: "Services",
      servicesHeading: "A clear website for every stage of the business",
      casesEyebrow: "Recent projects",
      casesHeading: "Selected case studies",
      processEyebrow: "01 · 02 · 03",
      processHeading: "From the idea to a published website",
      faqHeading: "Frequently asked questions",
      contactHeading: "Tell us what you need",
      contactText:
        "We will reply with the most useful next step for your project.",
      from: "From",
      tax: "+ VAT",
    },
    process: [
      [
        "Discovery",
        "We review the business, audience, materials and commercial goal.",
      ],
      [
        "Proposal",
        "We define scope, schedule, price and deliverables before starting.",
      ],
      [
        "Production and handover",
        "We design, build, review the work with you and publish.",
      ],
    ],
  },
  "de-DE": {
    sourceLocale: "de",
    ogLocale: "de_DE",
    hero: {
      eyebrow: "Webdesign in Fuengirola für lokale Unternehmen",
      h1: "Die Website, die Ihr Unternehmen verdient.",
      intro:
        "Klar gestaltet, um Ihr Angebot zu erklären, Anfragen zu gewinnen und digital weiterzuwachsen.",
    },
    labels: {
      home: "Startseite",
      services: "Leistungen",
      portfolio: "Referenzen",
      process: "So arbeiten wir",
      contact: "Kontakt",
      client: "Kundenbereich",
      language: "Sprache ändern",
      nav: "Hauptnavigation",
      primaryCta: "Angebot anfragen",
      portfolioCta: "Referenzen ansehen",
      servicesEyebrow: "Leistungen",
      servicesHeading: "Eine klare Website für jede Unternehmensphase",
      casesEyebrow: "Aktuelle Projekte",
      casesHeading: "Ausgewählte Referenzen",
      processEyebrow: "01 · 02 · 03",
      processHeading: "Von der Idee bis zur veröffentlichten Website",
      faqHeading: "Häufige Fragen",
      contactHeading: "Erzählen Sie uns von Ihrem Projekt",
      contactText: "Wir antworten mit dem sinnvollsten nächsten Schritt.",
      from: "Ab",
      tax: "+ MwSt.",
    },
    process: [
      [
        "Analyse",
        "Wir prüfen Unternehmen, Zielgruppe, Material und Geschäftsziel.",
      ],
      [
        "Angebot",
        "Wir definieren Umfang, Zeitplan, Preis und Leistungen vor dem Start.",
      ],
      [
        "Umsetzung",
        "Wir gestalten, entwickeln, prüfen gemeinsam und veröffentlichen.",
      ],
    ],
  },
  "fi-FI": {
    sourceLocale: "fi",
    ogLocale: "fi_FI",
    hero: {
      eyebrow: "Verkkosivut Fuengirolan paikallisille yrityksille",
      h1: "Verkkosivusto, jonka yrityksesi ansaitsee.",
      intro:
        "Selkeä kokonaisuus, joka esittelee yrityksen, tuo yhteydenottoja ja tukee kasvua.",
    },
    labels: {
      home: "Etusivu",
      services: "Palvelut",
      portfolio: "Asiakastyöt",
      process: "Näin työskentelemme",
      contact: "Yhteystiedot",
      client: "Asiakasalue",
      language: "Vaihda kieli",
      nav: "Päänavigaatio",
      primaryCta: "Pyydä tarjous",
      portfolioCta: "Katso asiakastyöt",
      servicesEyebrow: "Palvelut",
      servicesHeading: "Selkeä verkkosivusto yrityksen jokaiseen vaiheeseen",
      casesEyebrow: "Viimeisimmät projektit",
      casesHeading: "Valittuja asiakastöitä",
      processEyebrow: "01 · 02 · 03",
      processHeading: "Ideasta julkaistuksi verkkosivustoksi",
      faqHeading: "Usein kysytyt kysymykset",
      contactHeading: "Kerro, mitä tarvitset",
      contactText:
        "Vastaamme projektillesi hyödyllisimmällä seuraavalla askeleella.",
      from: "Alkaen",
      tax: "+ ALV",
    },
    process: [
      [
        "Kartoitus",
        "Käymme läpi yrityksen, yleisön, materiaalit ja tavoitteen.",
      ],
      [
        "Ehdotus",
        "Sovimme laajuuden, aikataulun, hinnan ja toimitukset etukäteen.",
      ],
      [
        "Tuotanto ja julkaisu",
        "Suunnittelemme, rakennamme, tarkistamme ja julkaisemme.",
      ],
    ],
  },
};

const homeGroup = getPageGroup("home");
const spain = getMarket("spain");

function buildSpainRecord(localeCode, localized) {
  const content = homeGroup.content[localized.sourceLocale];
  return Object.freeze({
    marketKey: "spain",
    localeCode,
    sourceLocale: localized.sourceLocale,
    route: spain.routes[localeCode],
    htmlLang: localeCode,
    ogLocale: localized.ogLocale,
    currency: "EUR",
    areaServed: "Fuengirola, Costa del Sol, Málaga",
    title: content.title,
    description: content.description,
    hero: Object.freeze(localized.hero),
    problems: Object.freeze(content.problems),
    benefits: Object.freeze(content.benefits),
    services: Object.freeze(
      tiers.map((tier, index) =>
        Object.freeze({
          key: tier.key,
          eurPrice: tier.price,
          name: tier.name[localized.sourceLocale],
          description: content.tierUses[index],
          features: Object.freeze(tier.features[localized.sourceLocale]),
          popular: Boolean(tier.popular),
        }),
      ),
    ),
    process: Object.freeze(
      localized.process.map(([title, text]) => Object.freeze({ title, text })),
    ),
    faqs: Object.freeze(
      content.faqs.map(([question, answer]) =>
        Object.freeze({ question, answer }),
      ),
    ),
    labels: Object.freeze(localized.labels),
    whatsappText: content.whatsappText,
    brand: brand.displayName,
  });
}

export const homepageRecords = Object.freeze({
  spain: Object.freeze(
    Object.fromEntries(
      Object.entries(spainLocales).map(([localeCode, localized]) => [
        localeCode,
        buildSpainRecord(localeCode, localized),
      ]),
    ),
  ),
});

export function getHomepageRecord(marketKey, localeCode) {
  const record = homepageRecords[marketKey]?.[localeCode];
  if (!record) {
    throw new Error(`Unknown homepage record: ${marketKey}/${localeCode}`);
  }
  return record;
}
