import { brand, getPageGroup, tiers } from "./commercial-pages-data.mjs";
import { marketPages } from "./market-pages-data.mjs";
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
      blog: "Blog",
      solidarity: "Web Solidaria",
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
    faqs: [
      [
        "¿Necesito empezar con una web grande desde el principio?",
        "No. Muchas veces basta una estructura simple y clara. Si luego hace falta crecer, la base ya queda preparada sin rehacer todo.",
      ],
      [
        "¿Y si no tengo todavía todos los textos o las fotos?",
        "No hace falta llegar con todo resuelto. Se ordena el mensaje, se pide solo lo necesario y se publica sin eternizar el proceso.",
      ],
      [
        "¿Qué diferencia hay entre tener web y trabajar el SEO local?",
        "La web es la base. El SEO local es el trabajo para que esa base aparezca mejor cuando alguien busca tu servicio en Google o en Maps. Una cosa sin la otra suele quedarse corta.",
      ],
      [
        "¿Después de publicar me quedo solo con la web?",
        "Puede quedarse publicada sin más, llevar mantenimiento puntual o entrar en seguimiento solo si compensa de verdad para el negocio.",
      ],
      [
        "¿Cuánto voy a tardar en tener algo útil?",
        "La primera conversación sirve para aterrizar alcance y siguiente paso. No para dejarte semanas esperando sin saber qué encaja.",
      ],
      [
        "¿Qué es publicidad para la IA?",
        "Es preparar contenido claro sobre tu negocio para que buscadores y herramientas de inteligencia artificial entiendan mejor qué haces, dónde trabajas y por qué pueden recomendarte cuando alguien pregunta por un servicio como el tuyo.",
      ],
      [
        "¿Necesito comprar un bono muchas veces?",
        "No. Los bonos son para empresas que necesitan mucho contenido o mejoras constantes, sobre todo cuando tienen mucha competencia y quieren impulsar el negocio con más fuerza. Las empresas pequeñas con algunos cambios mensuales pueden usar un pack, horas sueltas o mantenimiento puntual.",
      ],
      [
        "¿Qué es el SEO?",
        "El SEO es el trabajo para que tu web aparezca mejor cuando alguien busca tus servicios en Google. Incluye estructura, textos, velocidad, contenido útil y señales que ayudan a que la página se entienda y compita mejor.",
      ],
      [
        "¿Qué es SEO local?",
        "Es SEO enfocado a búsquedas con zona: por ejemplo, diseño web en Fuengirola, entrenador personal en Mijas o gimnasio en Los Boliches. Sirve para captar clientes cerca de tu negocio o en las zonas donde quieres trabajar.",
      ],
      [
        "¿Cuánto me cuesta el hosting y el dominio?",
        "El dominio suele pagarse una vez al año y el hosting depende de lo que necesite la web. Para una web sencilla, el coste puede ser bajo; si necesitas más rendimiento, correo, mantenimiento o soporte, se calcula aparte para que no pagues de más.",
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
      blog: "Blog",
      solidarity: "Web Solidaria",
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
      blog: "Blog",
      solidarity: "Web Solidaria",
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
      blog: "Blogi",
      solidarity: "Web Solidaria",
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
    contactPhone: spain.contactPhone,
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
      (localized.faqs ?? content.faqs).map(([question, answer]) =>
        Object.freeze({ question, answer }),
      ),
    ),
    labels: Object.freeze(localized.labels),
    whatsappText: content.whatsappText,
    brand: brand.displayName,
  });
}

const portugueseTiers = Object.freeze([
  Object.freeze({
    name: "Lite",
    features: Object.freeze([
      "Landing page focada",
      "Design responsivo",
      "Formulário de contato",
      "Base técnica para SEO",
    ]),
  }),
  Object.freeze({
    name: "Express",
    features: Object.freeze([
      "Site comercial completo",
      "Até cinco seções principais",
      "Integração de contato",
      "Otimização de desempenho",
    ]),
  }),
  Object.freeze({
    name: "Professional",
    features: Object.freeze([
      "Arquitetura de conteúdo ampliada",
      "Jornadas de conversão",
      "Integrações acordadas",
      "Documentação de entrega",
    ]),
  }),
]);

const sharedRegionalLabels = Object.freeze({
  es: Object.freeze({
    home: "Inicio",
    services: "Servicios",
    portfolio: "Portfolio",
    blog: "Blog",
    solidarity: "Web Solidaria",
    process: "Cómo trabajamos",
    contact: "Contacto",
    client: "Área cliente",
    language: "Cambiar idioma",
    nav: "Navegación principal",
    portfolioCta: "Ver portfolio",
    servicesEyebrow: "Servicios",
    casesEyebrow: "Trabajo verificable",
    casesHeading: "Proyectos reales",
    processEyebrow: "01 · 02 · 03",
  }),
  en: Object.freeze({
    home: "Home",
    services: "Services",
    portfolio: "Case studies",
    blog: "Blog",
    solidarity: "Web Solidaria",
    process: "How we work",
    contact: "Contact",
    client: "Client area",
    language: "Change language",
    nav: "Main navigation",
    portfolioCta: "View case studies",
    servicesEyebrow: "Services",
    casesEyebrow: "Verifiable work",
    casesHeading: "Selected case studies",
    processEyebrow: "01 · 02 · 03",
  }),
  pt: Object.freeze({
    home: "Início",
    services: "Serviços",
    portfolio: "Portfólio",
    blog: "Blog",
    solidarity: "Web Solidaria",
    process: "Como trabalhamos",
    contact: "Contato",
    client: "Área do cliente",
    language: "Alterar idioma",
    nav: "Navegação principal",
    portfolioCta: "Ver portfólio",
    servicesEyebrow: "Serviços",
    casesEyebrow: "Trabalho verificável",
    casesHeading: "Projetos selecionados",
    processEyebrow: "01 · 02 · 03",
  }),
});

const areaServedByMarket = Object.freeze({
  mexico: "Mexico",
  usa: "United States",
  brasil: "Brazil",
});

function regionalTierCopy(sourceLocale, tier, index) {
  if (sourceLocale === "pt") return portugueseTiers[index];
  return Object.freeze({
    name: tier.name[sourceLocale],
    features: Object.freeze(tier.features[sourceLocale]),
  });
}

function buildRegionalRecord(page) {
  const market = getMarket(page.marketKey);
  const sourceLocale = page.localeCode.split("-")[0];
  const sharedLabels = sharedRegionalLabels[sourceLocale];
  return Object.freeze({
    marketKey: page.marketKey,
    localeCode: page.localeCode,
    sourceLocale,
    route: page.route,
    htmlLang: page.htmlLang,
    ogLocale: page.ogLocale,
    currency: market.currency,
    contactPhone: market.contactPhone,
    areaServed: areaServedByMarket[page.marketKey],
    title: page.title,
    description: page.description,
    hero: Object.freeze({
      eyebrow: page.labels.heroEyebrow,
      h1: page.h1,
      intro: page.intro,
    }),
    problems: Object.freeze(page.problems),
    benefits: Object.freeze(page.benefits),
    services: Object.freeze(
      tiers.map((tier, index) => {
        const localizedTier = regionalTierCopy(sourceLocale, tier, index);
        return Object.freeze({
          key: tier.key,
          eurPrice: tier.price,
          name: localizedTier.name,
          description: page.tierUses[index],
          features: localizedTier.features,
          popular: Boolean(tier.popular),
        });
      }),
    ),
    process: Object.freeze(page.process.map((item) => Object.freeze(item))),
    faqs: Object.freeze(page.faqs.map((item) => Object.freeze(item))),
    labels: Object.freeze({
      ...sharedLabels,
      primaryCta: page.labels.primaryCta,
      servicesHeading: page.labels.packagesHeading,
      processHeading: page.labels.processHeading,
      faqHeading: page.labels.faqHeading,
      contactHeading: page.labels.contactHeading,
      contactText: page.labels.contactIntro,
      from: page.labels.from,
      tax: page.labels.taxNote,
      rateNote: page.labels.rateNote,
    }),
    contactForm: Object.freeze({
      name: page.labels.name,
      email: page.labels.email,
      company: page.labels.company,
      message: page.labels.message,
      submit: page.labels.submit,
      legal: page.labels.legal,
    }),
    whatsappText: page.whatsappText,
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
  ...Object.fromEntries(
    Object.entries(marketPages).map(([marketKey, pages]) => [
      marketKey,
      Object.freeze(
        Object.fromEntries(
          Object.entries(pages).map(([localeCode, page]) => [
            localeCode,
            buildRegionalRecord(page),
          ]),
        ),
      ),
    ]),
  ),
});

export function getHomepageRecord(marketKey, localeCode) {
  const record = homepageRecords[marketKey]?.[localeCode];
  if (!record) {
    throw new Error(`Unknown homepage record: ${marketKey}/${localeCode}`);
  }
  return record;
}
