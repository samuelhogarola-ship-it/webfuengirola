export const brand = {
  name: "WF-Studio",
  localName: "Web Fuengirola",
  displayName: "WF-Studio · Web Fuengirola",
  site: "https://webfuengirola.com",
  email: "info@webfuengirola.com",
  phone: "+34622923988",
  whatsapp: "34622923988",
};

export const locales = {
  es: {
    code: "es",
    htmlLang: "es",
    ogLocale: "es_ES",
    label: "Español",
    homeLabel: "Inicio",
    servicesLabel: "Webs especializadas",
    seoLabel: "SEO local",
    casesLabel: "Casos",
    pricesLabel: "Precios",
    blogLabel: "Blog",
    contactLabel: "Contacto",
    capabilitiesLabel: "Soluciones",
    appsLabel: "Aplicaciones web",
    automationLabel: "Automatización e IA",
    legalLabel: "Legal y privacidad",
    privacyLabel: "Privacidad",
    cookiesLabel: "Cookies",
    cookieSettingsLabel: "Preferencias de cookies",
    quoteLabel: "Pedir presupuesto",
    auditLabel: "Auditoría gratuita",
    problemsLabel: "Lo que resolvemos",
    benefitsLabel: "Una web pensada para tu sector",
    tiersLabel: "Tres modalidades, el mismo precio para cada sector",
    extrasLabel: "Extras disponibles",
    faqLabel: "Preguntas frecuentes",
    relatedLabel: "Siguiente paso",
    fromLabel: "Desde",
    vatLabel: "+ IVA",
    localContextLabel: "en Fuengirola",
  },
  en: {
    code: "en",
    htmlLang: "en",
    ogLocale: "en_GB",
    label: "English",
    homeLabel: "Home",
    servicesLabel: "Specialist websites",
    seoLabel: "Local SEO",
    casesLabel: "Case studies",
    pricesLabel: "Prices",
    blogLabel: "Blog",
    contactLabel: "Contact",
    capabilitiesLabel: "Solutions",
    appsLabel: "Web applications",
    automationLabel: "Automation and AI",
    legalLabel: "Legal and privacy",
    privacyLabel: "Privacy",
    cookiesLabel: "Cookies",
    cookieSettingsLabel: "Cookie settings",
    quoteLabel: "Request a quote",
    auditLabel: "Free website audit",
    problemsLabel: "What we solve",
    benefitsLabel: "A website designed for your sector",
    tiersLabel: "Three packages, the same price in every sector",
    extrasLabel: "Available extras",
    faqLabel: "Frequently asked questions",
    relatedLabel: "Next step",
    fromLabel: "From",
    vatLabel: "+ VAT",
    localContextLabel: "in Fuengirola",
  },
  de: {
    code: "de",
    htmlLang: "de",
    ogLocale: "de_DE",
    label: "Deutsch",
    homeLabel: "Startseite",
    servicesLabel: "Branchen-Websites",
    seoLabel: "Lokales SEO",
    casesLabel: "Referenzen",
    pricesLabel: "Preise",
    blogLabel: "Blog",
    contactLabel: "Kontakt",
    capabilitiesLabel: "Lösungen",
    appsLabel: "Web-Anwendungen",
    automationLabel: "Automatisierung und KI",
    legalLabel: "Rechtliches und Datenschutz",
    privacyLabel: "Datenschutz",
    cookiesLabel: "Cookies",
    cookieSettingsLabel: "Cookie-Einstellungen",
    quoteLabel: "Angebot anfragen",
    auditLabel: "Kostenlose Website-Analyse",
    problemsLabel: "Was wir lösen",
    benefitsLabel: "Eine Website für Ihre Branche",
    tiersLabel: "Drei Pakete, gleiche Preise für jede Branche",
    extrasLabel: "Verfügbare Extras",
    faqLabel: "Häufige Fragen",
    relatedLabel: "Nächster Schritt",
    fromLabel: "Ab",
    vatLabel: "+ MwSt.",
    localContextLabel: "in Fuengirola",
  },
  fi: {
    code: "fi",
    htmlLang: "fi",
    ogLocale: "fi_FI",
    label: "Suomi",
    homeLabel: "Etusivu",
    servicesLabel: "Toimialakohtaiset sivut",
    seoLabel: "Paikallinen SEO",
    casesLabel: "Asiakastyöt",
    pricesLabel: "Hinnat",
    blogLabel: "Blogi",
    contactLabel: "Yhteystiedot",
    capabilitiesLabel: "Ratkaisut",
    appsLabel: "Verkkosovellukset",
    automationLabel: "Automaatio ja tekoäly",
    legalLabel: "Lakisivut ja tietosuoja",
    privacyLabel: "Tietosuoja",
    cookiesLabel: "Evästeet",
    cookieSettingsLabel: "Evästeasetukset",
    quoteLabel: "Pyydä tarjous",
    auditLabel: "Maksuton verkkosivuanalyysi",
    problemsLabel: "Mitä ratkaisemme",
    benefitsLabel: "Toimialallesi suunniteltu verkkosivu",
    tiersLabel: "Kolme pakettia, sama hinta jokaiselle toimialalle",
    extrasLabel: "Saatavilla olevat lisäpalvelut",
    faqLabel: "Usein kysytyt kysymykset",
    relatedLabel: "Seuraava askel",
    fromLabel: "Alkaen",
    vatLabel: "+ ALV",
    localContextLabel: "Fuengirolassa",
  },
};

export const tiers = [
  {
    key: "lite",
    price: 200,
    name: {
      es: "Web Lite",
      en: "Web Lite",
      de: "Web Lite",
      fi: "Web Lite",
    },
    features: {
      es: [
        "Una página enfocada a conversión",
        "WhatsApp y formulario",
        "SEO técnico básico",
        "Publicación rápida",
      ],
      en: [
        "One conversion-focused page",
        "WhatsApp and contact form",
        "Essential technical SEO",
        "Fast launch",
      ],
      de: [
        "Eine auf Anfragen ausgerichtete Seite",
        "WhatsApp und Kontaktformular",
        "Technische SEO-Grundlage",
        "Schnelle Veröffentlichung",
      ],
      fi: [
        "Yksi yhteydenottoihin keskittyvä sivu",
        "WhatsApp ja yhteydenottolomake",
        "Teknisen SEO:n perusteet",
        "Nopea julkaisu",
      ],
    },
  },
  {
    key: "express",
    price: 350,
    popular: true,
    name: {
      es: "Web Express",
      en: "Web Express",
      de: "Web Express",
      fi: "Web Express",
    },
    features: {
      es: [
        "Hasta cinco páginas",
        "Servicios y preguntas frecuentes",
        "Opción de blog",
        "Estructura para varios objetivos",
      ],
      en: [
        "Up to five pages",
        "Services and FAQs",
        "Optional blog",
        "Structure for several goals",
      ],
      de: [
        "Bis zu fünf Seiten",
        "Leistungen und häufige Fragen",
        "Blog optional",
        "Struktur für mehrere Ziele",
      ],
      fi: [
        "Enintään viisi sivua",
        "Palvelut ja usein kysytyt kysymykset",
        "Blogi valinnaisena",
        "Rakenne usealle tavoitteelle",
      ],
    },
  },
  {
    key: "professional",
    price: 600,
    name: {
      es: "Web Profesional",
      en: "Professional Website",
      de: "Professionelle Website",
      fi: "Ammattitason verkkosivu",
    },
    features: {
      es: [
        "Hasta diez páginas",
        "Recorridos de captación avanzados",
        "Analítica preparada",
        "Base para crecer con SEO",
      ],
      en: [
        "Up to ten pages",
        "Advanced enquiry journeys",
        "Analytics-ready setup",
        "Foundation for SEO growth",
      ],
      de: [
        "Bis zu zehn Seiten",
        "Erweiterte Anfragewege",
        "Vorbereitete Webanalyse",
        "Grundlage für weiteres SEO-Wachstum",
      ],
      fi: [
        "Enintään kymmenen sivua",
        "Edistyneet yhteydenottopolut",
        "Valmis analytiikka",
        "Pohja SEO-kasvulle",
      ],
    },
  },
];

export const extras = {
  es: ["Blog", "Migración", "Optimización", "Formularios avanzados", "Idiomas", "Mantenimiento", "Hosting y correo", "Integraciones"],
  en: ["Blog", "Migration", "Optimisation", "Advanced forms", "Languages", "Maintenance", "Hosting and email", "Integrations"],
  de: ["Blog", "Migration", "Optimierung", "Erweiterte Formulare", "Sprachen", "Wartung", "Hosting und E-Mail", "Integrationen"],
  fi: ["Blogi", "Siirto", "Optimointi", "Edistyneet lomakkeet", "Kielet", "Ylläpito", "Hosting ja sähköposti", "Integraatiot"],
};

export const legalRoutes = {
  es: "/legal.html",
  en: "/en/legal/",
  de: "/de/rechtliches/",
  fi: "/fi/lakitiedot/",
};

const localeCodes = Object.keys(locales);

const routes = {
  home: { es: "/", en: "/en/", de: "/de/", fi: "/fi/" },
  design: {
    es: "/diseno-web-fuengirola/",
    en: "/en/web-design-fuengirola/",
    de: "/de/webdesign-fuengirola/",
    fi: "/fi/verkkosivut-fuengirola/",
  },
  seo: {
    es: "/seo-local-fuengirola/",
    en: "/en/local-seo-fuengirola/",
    de: "/de/lokales-seo-fuengirola/",
    fi: "/fi/paikallinen-seo-fuengirola/",
  },
  prices: {
    es: "/precios-diseno-web-fuengirola/",
    en: "/en/web-design-prices-fuengirola/",
    de: "/de/webdesign-preise-fuengirola/",
    fi: "/fi/verkkosivujen-hinnat-fuengirola/",
  },
  audit: {
    es: "/auditoria-web-gratis/",
    en: "/en/free-website-audit/",
    de: "/de/kostenlose-website-analyse/",
    fi: "/fi/maksuton-verkkosivuanalyysi/",
  },
  contact: {
    es: "/contacto/",
    en: "/en/contact/",
    de: "/de/kontakt/",
    fi: "/fi/yhteystiedot/",
  },
  cases: {
    es: "/casos/",
    en: "/en/case-studies/",
    de: "/de/referenzen/",
    fi: "/fi/asiakastyot/",
  },
  apps: {
    es: "/aplicaciones-web-fuengirola/",
    en: "/en/web-applications-fuengirola/",
    de: "/de/web-anwendungen-fuengirola/",
    fi: "/fi/verkkosovellukset-fuengirola/",
  },
  automation: {
    es: "/automatizacion-ia-fuengirola/",
    en: "/en/automation-ai-fuengirola/",
    de: "/de/automatisierung-ki-fuengirola/",
    fi: "/fi/automaatio-tekoaly-fuengirola/",
  },
  clinics: {
    es: "/web-para-clinicas-fuengirola/",
    en: "/en/websites-for-clinics-fuengirola/",
    de: "/de/websites-fuer-praxen-fuengirola/",
    fi: "/fi/verkkosivut-klinikoille-fuengirola/",
  },
  physio: {
    es: "/web-para-fisioterapeutas-fuengirola/",
    en: "/en/websites-for-physiotherapists-fuengirola/",
    de: "/de/websites-fuer-physiotherapie-fuengirola/",
    fi: "/fi/verkkosivut-fysioterapeuteille-fuengirola/",
  },
  trainers: {
    es: "/web-para-entrenadores-personales-fuengirola/",
    en: "/en/websites-for-personal-trainers-fuengirola/",
    de: "/de/websites-fuer-personal-trainer-fuengirola/",
    fi: "/fi/verkkosivut-personal-trainereille-fuengirola/",
  },
  gyms: {
    es: "/web-para-gimnasios-fuengirola/",
    en: "/en/websites-for-gyms-fuengirola/",
    de: "/de/websites-fuer-fitnessstudios-fuengirola/",
    fi: "/fi/verkkosivut-kuntosaleille-fuengirola/",
  },
  restaurants: {
    es: "/web-para-restaurantes-fuengirola/",
    en: "/en/websites-for-restaurants-fuengirola/",
    de: "/de/websites-fuer-restaurants-fuengirola/",
    fi: "/fi/verkkosivut-ravintoloille-fuengirola/",
  },
  localBusiness: {
    es: "/web-para-negocios-locales-fuengirola/",
    en: "/en/websites-for-local-businesses-fuengirola/",
    de: "/de/websites-fuer-lokale-unternehmen-fuengirola/",
    fi: "/fi/verkkosivut-paikallisille-yrityksille-fuengirola/",
  },
  multilingual: {
    es: "/web-multidioma-fuengirola/",
    en: "/en/multilingual-websites-fuengirola/",
    de: "/de/mehrsprachige-websites-fuengirola/",
    fi: "/fi/monikieliset-verkkosivut-fuengirola/",
  },
};

const topics = {
  home: {
    kind: "home",
    es: ["WF-Studio: diseño web en Fuengirola", "negocios de Fuengirola", "una presencia digital clara", "convertir visitas en contactos"],
    en: ["WF-Studio: web design in Fuengirola", "international and local businesses in Fuengirola", "a clear online presence", "turn visits into enquiries"],
    de: ["WF-Studio: Webdesign in Fuengirola", "lokale und internationale Unternehmen in Fuengirola", "einen klaren digitalen Auftritt", "Besuche in Anfragen verwandeln"],
    fi: ["WF-Studio: verkkosivut Fuengirolassa", "Fuengirolan paikalliset ja kansainväliset yritykset", "selkeän digitaalisen näkyvyyden", "muuttaa käynnit yhteydenotoiksi"],
  },
  design: {
    kind: "service",
    es: ["Diseño web en Fuengirola", "empresas y autónomos de Fuengirola", "una web rápida que explique bien el negocio", "captar clientes desde Google y móvil"],
    en: ["Web design in Fuengirola", "business owners in Fuengirola", "a fast website that explains the business clearly", "win enquiries from search and mobile"],
    de: ["Webdesign in Fuengirola", "Unternehmen und Selbstständige in Fuengirola", "eine schnelle Website mit klarer Leistung", "Kunden über Suche und Mobilgeräte gewinnen"],
    fi: ["Verkkosivujen suunnittelu Fuengirolassa", "Fuengirolan yritykset ja yrittäjät", "nopean sivuston, joka kertoo palvelusta selkeästi", "saada asiakkaita hausta ja mobiilista"],
  },
  seo: {
    kind: "service",
    es: ["SEO local en Fuengirola", "negocios que necesitan visibilidad local en Fuengirola", "una presencia coherente entre web y Google", "aparecer ante clientes cercanos"],
    en: ["Local SEO in Fuengirola", "businesses seeking local visibility in Fuengirola", "consistent website and Google signals", "appear for nearby customers"],
    de: ["Lokales SEO in Fuengirola", "Unternehmen mit lokalem Sichtbarkeitsbedarf in Fuengirola", "konsistente Signale auf Website und Google", "von Kunden in der Nähe gefunden werden"],
    fi: ["Paikallinen SEO Fuengirolassa", "Fuengirolassa näkyvyyttä tarvitsevat yritykset", "yhtenäiset verkkosivu- ja Google-signaalit", "näkyä lähellä oleville asiakkaille"],
  },
  prices: {
    kind: "pricing",
    es: ["Precios de diseño web en Fuengirola", "negocios que comparan una web en Fuengirola", "tres opciones transparentes", "elegir sin pagar por alcance innecesario"],
    en: ["Web design prices in Fuengirola", "businesses comparing website costs in Fuengirola", "three transparent packages", "choose without paying for unnecessary scope"],
    de: ["Webdesign-Preise in Fuengirola", "Unternehmen, die Website-Kosten in Fuengirola vergleichen", "drei transparente Pakete", "ohne unnötigen Umfang wählen"],
    fi: ["Verkkosivujen hinnat Fuengirolassa", "Fuengirolassa verkkosivujen hintoja vertailevat yritykset", "kolme läpinäkyvää pakettia", "valita ilman turhaa laajuutta"],
  },
  audit: {
    kind: "audit",
    es: ["Auditoría web gratuita en Fuengirola", "negocios de Fuengirola con una web que no convierte", "un diagnóstico inicial práctico", "saber qué corregir primero"],
    en: ["Free website audit in Fuengirola", "Fuengirola businesses whose website does not convert", "a practical initial diagnosis", "know what to fix first"],
    de: ["Kostenlose Website-Analyse in Fuengirola", "Unternehmen in Fuengirola mit einer schwachen Website", "eine praktische Erstanalyse", "die wichtigsten Verbesserungen erkennen"],
    fi: ["Maksuton verkkosivuanalyysi Fuengirolassa", "Fuengirolan yritykset, joiden sivu ei tuo yhteydenottoja", "käytännöllisen alkukartoituksen", "tietää mitä korjata ensin"],
  },
  contact: {
    kind: "contact",
    es: ["Contacta con WF-Studio en Fuengirola", "negocios que buscan ayuda digital en Fuengirola", "una recomendación clara", "dar el siguiente paso sin compromiso"],
    en: ["Contact WF-Studio in Fuengirola", "businesses looking for digital help in Fuengirola", "a clear recommendation", "take the next step without obligation"],
    de: ["WF-Studio in Fuengirola kontaktieren", "Unternehmen mit digitalem Bedarf in Fuengirola", "eine klare Empfehlung", "unverbindlich den nächsten Schritt machen"],
    fi: ["Ota yhteyttä WF-Studioon Fuengirolassa", "Fuengirolassa digitaalista apua etsivät yritykset", "selkeän suosituksen", "ottaa seuraava askel ilman sitoumusta"],
  },
  cases: {
    kind: "cases",
    cases: ["sport-massage-fuengirola", "personal-trainer-fuengirola", "gimnasio-nuevo-estilo", "agama", "samuel-coach-aleman", "fisioapp-panel-clinica", "vokabellab"],
    es: ["Casos de éxito de WF-Studio en Fuengirola", "negocios con proyectos digitales reales", "ejemplos claros de webs, SEO y aplicaciones", "valorar el enfoque antes de pedir presupuesto"],
    en: ["WF-Studio case studies in Fuengirola", "businesses looking for real digital project examples", "clear examples of websites, SEO and applications", "assess our approach before requesting a quote"],
    de: ["Referenzen von WF-Studio in Fuengirola", "Unternehmen, die reale digitale Projekte sehen möchten", "klare Beispiele für Websites, SEO und Anwendungen", "unseren Ansatz vor einer Anfrage beurteilen"],
    fi: ["WF-Studion asiakastyöt Fuengirolassa", "yritykset, jotka haluavat nähdä todellisia digiprojekteja", "selkeät esimerkit verkkosivuista, SEO:sta ja sovelluksista", "arvioida toteutustapaa ennen tarjouspyyntöä"],
  },
  apps: {
    kind: "capability",
    es: ["Aplicaciones web a medida en Fuengirola", "negocios que necesitan una herramienta propia", "paneles, reservas y flujos adaptados al trabajo real", "ahorrar tareas y centralizar operaciones"],
    en: ["Custom web applications in Fuengirola", "businesses that need their own digital tool", "dashboards, bookings and workflows fitted to real operations", "save admin time and centralise work"],
    de: ["Individuelle Web-Anwendungen in Fuengirola", "Unternehmen mit Bedarf an einem eigenen digitalen Werkzeug", "Dashboards, Buchungen und Abläufe passend zum Arbeitsalltag", "Verwaltung sparen und Prozesse bündeln"],
    fi: ["Räätälöidyt verkkosovellukset Fuengirolassa", "yritykset, jotka tarvitsevat oman digitaalisen työkalun", "todelliseen työhön sopivat hallintapaneelit, varaukset ja työnkulut", "säästää hallintoaikaa ja keskittää toimintoja"],
  },
  automation: {
    kind: "capability",
    es: ["Automatización e IA para negocios en Fuengirola", "equipos que repiten tareas administrativas", "automatizaciones prácticas conectadas a sus herramientas", "ganar tiempo sin complicar el negocio"],
    en: ["Automation and AI for businesses in Fuengirola", "teams repeating administrative tasks", "practical automations connected to their tools", "save time without adding operational complexity"],
    de: ["Automatisierung und KI für Unternehmen in Fuengirola", "Teams mit wiederkehrenden Verwaltungsaufgaben", "praktische Automationen für vorhandene Werkzeuge", "Zeit sparen ohne neue Komplexität"],
    fi: ["Automaatio ja tekoäly Fuengirolan yrityksille", "toistuvia hallintotehtäviä tekevät tiimit", "käytännölliset automaatiot nykyisiin työkaluihin", "säästää aikaa ilman lisämonimutkaisuutta"],
  },
  clinics: {
    kind: "sector",
    cases: ["fisioapp-panel-clinica", "sport-massage-fuengirola"],
    es: ["Web para clínicas en Fuengirola", "clínicas y centros sanitarios de Fuengirola", "servicios, profesionales y citas bien organizados", "generar solicitudes con confianza"],
    en: ["Websites for clinics in Fuengirola", "clinics and healthcare centres in Fuengirola", "well-organised services, practitioners and appointments", "generate trusted appointment enquiries"],
    de: ["Websites für Praxen in Fuengirola", "Praxen und Gesundheitszentren in Fuengirola", "klar strukturierte Leistungen, Team und Termine", "vertrauensvolle Terminanfragen gewinnen"],
    fi: ["Verkkosivut klinikoille Fuengirolassa", "Fuengirolan klinikat ja terveyspalvelut", "selkeästi järjestetyt palvelut, ammattilaiset ja ajanvarauksen", "saada luottamusta herättäviä ajanvarauksia"],
  },
  physio: {
    kind: "sector",
    cases: ["sport-massage-fuengirola", "fisioapp-panel-clinica"],
    es: ["Web para fisioterapeutas en Fuengirola", "fisioterapeutas y centros de recuperación de Fuengirola", "tratamientos, ubicación y reservas claras", "recibir pacientes sin depender de plataformas"],
    en: ["Websites for physiotherapists in Fuengirola", "physiotherapists and recovery centres in Fuengirola", "clear treatments, location and booking paths", "receive patients without relying on platforms"],
    de: ["Websites für Physiotherapie in Fuengirola", "Physiotherapeuten und Rehazentren in Fuengirola", "klare Behandlungen, Lage und Terminwege", "Patienten ohne Plattformabhängigkeit gewinnen"],
    fi: ["Verkkosivut fysioterapeuteille Fuengirolassa", "Fuengirolan fysioterapeutit ja kuntoutuskeskukset", "selkeät hoidot, sijainnin ja ajanvarauksen", "saada asiakkaita ilman alustariippuvuutta"],
  },
  trainers: {
    kind: "sector",
    cases: ["personal-trainer-fuengirola", "gimnasio-nuevo-estilo"],
    es: ["Web para entrenadores personales en Fuengirola", "entrenadores personales de Fuengirola", "planes, especialidad y contacto directo", "convertir búsquedas locales en alumnos"],
    en: ["Websites for personal trainers in Fuengirola", "personal trainers working in Fuengirola", "clear programmes, expertise and direct contact", "turn local searches into clients"],
    de: ["Websites für Personal Trainer in Fuengirola", "Personal Trainer in Fuengirola", "klare Programme, Spezialisierung und direkten Kontakt", "lokale Suchen in Kunden verwandeln"],
    fi: ["Verkkosivut personal trainereille Fuengirolassa", "Fuengirolassa toimivat personal trainerit", "selkeät valmennukset, osaamisen ja yhteydenoton", "muuttaa paikalliset haut asiakkaiksi"],
  },
  gyms: {
    kind: "sector",
    cases: ["gimnasio-nuevo-estilo", "personal-trainer-fuengirola"],
    es: ["Web para gimnasios en Fuengirola", "gimnasios y estudios deportivos de Fuengirola", "clases, horarios, tarifas y ubicaciones claras", "captar pruebas y nuevas altas"],
    en: ["Websites for gyms in Fuengirola", "gyms and fitness studios in Fuengirola", "clear classes, timetables, prices and locations", "generate trial visits and memberships"],
    de: ["Websites für Fitnessstudios in Fuengirola", "Fitnessstudios und Trainingszentren in Fuengirola", "klare Kurse, Zeiten, Preise und Standorte", "Probetrainings und Mitglieder gewinnen"],
    fi: ["Verkkosivut kuntosaleille Fuengirolassa", "Fuengirolan kuntosalit ja liikuntastudiot", "selkeät tunnit, aikataulut, hinnat ja sijainnit", "saada kokeilijoita ja uusia jäseniä"],
  },
  restaurants: {
    kind: "sector",
    cases: [],
    es: ["Web para restaurantes en Fuengirola", "restaurantes, bares y cafeterías de Fuengirola", "carta, horarios, ubicación e idiomas bien resueltos", "conseguir reservas directas"],
    en: ["Websites for restaurants in Fuengirola", "restaurants, bars and cafés in Fuengirola", "a clear menu, hours, location and languages", "win direct bookings"],
    de: ["Websites für Restaurants in Fuengirola", "Restaurants, Bars und Cafés in Fuengirola", "klare Speisekarte, Zeiten, Lage und Sprachen", "direkte Reservierungen gewinnen"],
    fi: ["Verkkosivut ravintoloille Fuengirolassa", "Fuengirolan ravintolat, baarit ja kahvilat", "selkeän ruokalistan, aukioloajat, sijainnin ja kielet", "saada suoria pöytävarauksia"],
  },
  localBusiness: {
    kind: "sector",
    cases: ["sport-massage-fuengirola", "gimnasio-nuevo-estilo"],
    es: ["Web para negocios locales en Fuengirola", "comercios, profesionales y servicios de Fuengirola", "una oferta local fácil de encontrar y entender", "generar llamadas y mensajes cercanos"],
    en: ["Websites for local businesses in Fuengirola", "shops, professionals and service businesses in Fuengirola", "a local offer that is easy to find and understand", "generate nearby calls and messages"],
    de: ["Websites für lokale Unternehmen in Fuengirola", "Geschäfte, Dienstleister und Selbstständige in Fuengirola", "ein lokales Angebot, das leicht gefunden und verstanden wird", "Anrufe und Nachrichten aus der Nähe gewinnen"],
    fi: ["Verkkosivut paikallisille yrityksille Fuengirolassa", "Fuengirolan liikkeet, ammattilaiset ja palveluyritykset", "helposti löydettävän ja ymmärrettävän paikallisen tarjonnan", "saada puheluita ja viestejä lähialueelta"],
  },
  multilingual: {
    kind: "sector",
    cases: ["samuel-coach-aleman", "vokabellab"],
    es: ["Web multidioma en Fuengirola", "negocios de Fuengirola con clientes internacionales", "una estructura real por idioma", "captar residentes y visitantes en su lengua"],
    en: ["Multilingual websites in Fuengirola", "Fuengirola businesses with international customers", "a proper structure for every language", "reach residents and visitors in their language"],
    de: ["Mehrsprachige Websites in Fuengirola", "Unternehmen in Fuengirola mit internationaler Kundschaft", "eine echte Struktur für jede Sprache", "Einwohner und Besucher in ihrer Sprache erreichen"],
    fi: ["Monikieliset verkkosivut Fuengirolassa", "Fuengirolan kansainvälisiä asiakkaita palvelevat yritykset", "aidon rakenteen jokaiselle kielelle", "tavoittaa asukkaat ja vierailijat heidän kielellään"],
  },
};

// Each sector carries its own decision criteria. These are not keyword swaps:
// they drive its pain points, functionality, package scope and first FAQ.
const sectorInsights = {
  clinics: {
    es: ["especialidades, tratamientos y cuadro profesional", "confianza clínica, colegiación y acceso a citas", "búsquedas por especialidad y síntomas", "¿Se puede presentar información sanitaria sin prometer resultados?", "Sí. La estructura explica profesionales, tratamientos y criterios de atención con lenguaje prudente, sin garantías médicas ni testimonios inventados."],
    en: ["specialities, treatments and clinical team", "clinical trust, credentials and appointment access", "searches by speciality and symptoms", "Can healthcare information be presented without promising outcomes?", "Yes. The structure explains practitioners, treatments and access criteria in careful language, without medical guarantees or invented testimonials."],
    de: ["Fachgebiete, Behandlungen und Praxisteam", "medizinisches Vertrauen, Qualifikation und Terminzugang", "Suchen nach Fachgebiet und Beschwerden", "Können Gesundheitsleistungen ohne Erfolgsversprechen dargestellt werden?", "Ja. Die Struktur erklärt Team, Behandlungen und Terminwege sachlich, ohne medizinische Garantien oder erfundene Bewertungen."],
    fi: ["erikoisalat, hoidot ja ammattilaiset", "terveyspalvelun luotettavuus, pätevyys ja ajanvaraus", "haut erikoisalan ja oireen mukaan", "Voiko terveyspalveluista kertoa lupaamatta hoitotuloksia?", "Kyllä. Rakenne esittelee ammattilaiset, hoidot ja ajanvarauksen asiallisesti ilman hoitotakuita tai keksittyjä arvioita."],
  },
  physio: {
    es: ["lesiones, técnicas, duración de sesión y recuperación", "titulación, valoración inicial y reserva rápida", "búsquedas por dolor, lesión y tratamiento", "¿Conviene organizar la web por tratamientos o por dolencias?", "Normalmente se combinan ambos recorridos: tratamientos para explicar el servicio y dolencias para responder a la intención de búsqueda sin diagnosticar online."],
    en: ["injuries, techniques, session length and recovery", "qualifications, initial assessment and quick booking", "searches by pain, injury and treatment", "Should the website be organised by treatments or conditions?", "Usually both journeys work together: treatments explain the service, while condition pages answer search intent without diagnosing online."],
    de: ["Verletzungen, Techniken, Sitzungsdauer und Rehabilitation", "Qualifikation, Erstbefund und schnelle Buchung", "Suchen nach Schmerz, Verletzung und Behandlung", "Soll die Website nach Behandlungen oder Beschwerden gegliedert sein?", "Meist werden beide Wege kombiniert: Behandlungen erklären die Leistung, Beschwerdeseiten beantworten Suchintentionen ohne Online-Diagnose."],
    fi: ["vammat, menetelmät, käynnin kesto ja kuntoutus", "pätevyys, ensiarvio ja nopea ajanvaraus", "haut kivun, vamman ja hoidon mukaan", "Kannattaako sivusto jäsentää hoitojen vai vaivojen mukaan?", "Usein molemmat polut toimivat yhdessä: hoidot kertovat palvelusta ja vaivasivut vastaavat hakutarpeeseen ilman verkkodiagnoosia."],
  },
  trainers: {
    es: ["objetivos, metodología, formatos y seguimiento", "credenciales, casos reales y llamada de valoración", "búsquedas por objetivo, zona e idioma", "¿Cómo se diferencia un entrenador sin competir solo por precio?", "La web convierte método, especialidad y forma de acompañamiento en una propuesta comparable, apoyada por pruebas reales y una primera conversación clara."],
    en: ["goals, coaching method, formats and follow-up", "credentials, real cases and an assessment call", "searches by goal, area and language", "How can a trainer stand out without competing only on price?", "The website turns method, expertise and support into a comparable proposition, backed by real proof and a clear first conversation."],
    de: ["Ziele, Trainingsmethode, Formate und Betreuung", "Qualifikation, echte Fälle und Erstgespräch", "Suchen nach Ziel, Gebiet und Sprache", "Wie hebt sich ein Trainer ab, ohne nur über den Preis zu konkurrieren?", "Die Website macht Methode, Spezialisierung und Betreuung vergleichbar und stützt sie mit echten Nachweisen und einem klaren Erstgespräch."],
    fi: ["tavoitteet, valmennusmenetelmä, toteutustavat ja seuranta", "pätevyys, aidot asiakastapaukset ja alkukartoitus", "haut tavoitteen, alueen ja kielen mukaan", "Miten valmentaja erottuu kilpailematta vain hinnalla?", "Sivusto tekee menetelmästä, osaamisesta ja tuesta vertailtavan kokonaisuuden, jota tukevat aidot näytöt ja selkeä alkukeskustelu."],
  },
  gyms: {
    es: ["clases, horarios, bonos, cuotas y prueba", "instalaciones, entrenadores y proceso de alta", "búsquedas por actividad, horario y barrio", "¿Cómo se evitan preguntas repetidas sobre horarios y tarifas?", "Una parrilla móvil clara, fichas de actividad y precios actualizables reducen consultas repetitivas y conducen directamente a reservar una prueba."],
    en: ["classes, timetables, passes, memberships and trials", "facilities, coaches and joining process", "searches by activity, time and neighbourhood", "How can repeated questions about timetables and prices be reduced?", "A clear mobile timetable, activity pages and editable prices answer routine questions and lead directly to a trial booking."],
    de: ["Kurse, Zeiten, Karten, Beiträge und Probetraining", "Ausstattung, Trainer und Anmeldung", "Suchen nach Aktivität, Uhrzeit und Stadtteil", "Wie lassen sich wiederkehrende Fragen zu Zeiten und Preisen vermeiden?", "Ein klarer mobiler Kursplan, Aktivitätsseiten und pflegbare Preise beantworten Standardfragen und führen direkt zum Probetraining."],
    fi: ["tunnit, aikataulut, kortit, jäsenyydet ja kokeilut", "tilat, valmentajat ja liittyminen", "haut lajin, ajan ja alueen mukaan", "Miten aikatauluja ja hintoja koskevia toistuvia kysymyksiä voi vähentää?", "Selkeä mobiiliaikataulu, lajisivut ja päivitettävät hinnat vastaavat peruskysymyksiin ja ohjaavat suoraan kokeiluun."],
  },
  restaurants: {
    es: ["carta, alérgenos, horarios, ubicación y reservas", "fotografía real, reseñas y disponibilidad multidioma", "búsquedas por cocina, ocasión y cercanía", "¿Es mejor recibir reservas directamente o usar una plataforma?", "La web puede priorizar la reserva directa y mantener plataformas como apoyo, reduciendo comisiones sin perder el canal que el restaurante ya utiliza."],
    en: ["menu, allergens, opening hours, location and bookings", "real photography, reviews and multilingual availability", "searches by cuisine, occasion and proximity", "Is direct booking better than relying on a platform?", "The website can prioritise direct bookings while retaining platforms as support, reducing commission without removing a channel the restaurant already uses."],
    de: ["Speisekarte, Allergene, Öffnungszeiten, Lage und Reservierung", "echte Fotos, Bewertungen und mehrere Sprachen", "Suchen nach Küche, Anlass und Nähe", "Sind direkte Reservierungen besser als eine Plattform?", "Die Website kann Direktreservierungen priorisieren und Plattformen ergänzend behalten, um Provisionen zu senken ohne einen bestehenden Kanal zu verlieren."],
    fi: ["ruokalista, allergeenit, aukioloajat, sijainti ja varaukset", "aidot kuvat, arviot ja monikielisyys", "haut keittiön, tilanteen ja läheisyyden mukaan", "Kannattaako varaukset ottaa suoraan vai alustan kautta?", "Sivusto voi painottaa suoria varauksia ja säilyttää alustat tukikanavana, jolloin provisiot vähenevät ilman nykyisen kanavan poistamista."],
  },
  localBusiness: {
    es: ["servicios, zona atendida, horario y contacto inmediato", "reseñas verificables, mapa y respuesta por WhatsApp", "búsquedas de servicio cerca de cada barrio", "¿Hace falta una web si el negocio ya tiene ficha de Google?", "Sí: la ficha facilita el descubrimiento y la web desarrolla servicios, confianza y conversión. Ambas deben compartir datos y reforzarse mutuamente."],
    en: ["services, coverage area, opening hours and immediate contact", "verifiable reviews, map and WhatsApp response", "near-me service searches by neighbourhood", "Is a website needed when the business already has a Google profile?", "Yes. The profile supports discovery and the website develops services, trust and conversion. Both should share consistent information and reinforce each other."],
    de: ["Leistungen, Einzugsgebiet, Öffnungszeiten und Sofortkontakt", "prüfbare Bewertungen, Karte und WhatsApp-Antwort", "lokale Dienstleistungssuchen nach Stadtteil", "Braucht ein Unternehmen mit Google-Profil noch eine Website?", "Ja. Das Profil fördert die Entdeckung, die Website erklärt Leistungen, Vertrauen und Kontakt. Beide sollten konsistente Daten zeigen und sich ergänzen."],
    fi: ["palvelut, toiminta-alue, aukioloajat ja nopea yhteys", "todennettavat arviot, kartta ja WhatsApp-vastaus", "lähipalveluhaut kaupunginosittain", "Tarvitaanko verkkosivua, jos yrityksellä on jo Google-profiili?", "Kyllä. Profiili auttaa löytymään ja sivusto kertoo palveluista, luottamuksesta ja yhteydenotosta. Tietojen pitää olla yhtenäiset ja kanavien tukea toisiaan."],
  },
  multilingual: {
    es: ["idiomas, URLs, traducción y mantenimiento coordinado", "cambio de idioma visible y mensajes adaptados culturalmente", "búsquedas equivalentes en cada mercado", "¿Basta con traducir automáticamente una única página?", "No para competir bien: cada idioma necesita URL indexable, metadatos, navegación equivalente y revisión humana del mensaje y la intención de búsqueda."],
    en: ["languages, URLs, translation and coordinated maintenance", "a visible language switch and culturally adapted messages", "equivalent searches in every market", "Is automatically translating one page enough?", "Not for strong visibility. Each language needs an indexable URL, metadata, equivalent navigation and human review of the message and search intent."],
    de: ["Sprachen, URLs, Übersetzung und koordinierte Pflege", "sichtbarer Sprachwechsel und kulturell passende Botschaften", "gleichwertige Suchen in jedem Markt", "Reicht die automatische Übersetzung einer einzigen Seite?", "Für gute Sichtbarkeit nicht. Jede Sprache braucht eine indexierbare URL, Metadaten, gleichwertige Navigation und eine menschliche Prüfung von Botschaft und Suchintention."],
    fi: ["kielet, URL-osoitteet, käännökset ja yhteinen ylläpito", "näkyvä kielenvaihto ja kulttuuriin sopivat viestit", "vastaavat haut jokaisella markkinalla", "Riittääkö yhden sivun automaattinen käännös?", "Ei vahvaan näkyvyyteen. Jokainen kieli tarvitsee indeksoitavan URL:n, metatiedot, vastaavan navigoinnin sekä viestin ja hakutarkoituksen ihmistarkistuksen."],
  },
};

function makeContent(locale, topic, groupKey) {
  const [subject, audience, solution, outcome] = topic[locale];
  if (locale === "es") {
    const content = {
      title: `${subject} | WF-Studio · Web Fuengirola`,
      description: `${subject} para ${audience}: ${solution} para ${outcome}. Presupuesto claro y trato directo en Fuengirola.`,
      h1: `${subject} para ${outcome}`,
      intro: `WF-Studio crea ${solution} para ${audience}. Diseñamos cada recorrido pensando en cómo busca, compara y contacta un cliente real en Fuengirola, con una propuesta clara y sin añadir complejidad que el negocio no necesita.`,
      problems: [
        `${audience} pierden oportunidades cuando no muestran ${solution} desde la primera visita.`,
        `Quien quiere ${outcome} necesita entender la propuesta, la prueba y el siguiente paso desde el móvil.`,
        `Una página genérica no responde a las dudas concretas que plantea ${subject.toLowerCase()}.`,
      ],
      benefits: [
        `${solution} presentada con una jerarquía específica para ${audience}.`,
        `Recorridos de llamada, WhatsApp y formulario diseñados para ${outcome}.`,
        `Contenido local que conecta ${subject.toLowerCase()} con búsquedas reales en Fuengirola.`,
      ],
      tierUses: [
        `Una página centrada en ${solution} y un único recorrido para ${outcome}.`,
        `Hasta cinco páginas para explicar la oferta de ${audience}, resolver objeciones y captar contactos.`,
        `Hasta diez páginas para cubrir variantes de ${subject.toLowerCase()}, contenidos y recorridos avanzados.`,
      ],
      faqs: [
        [`¿Cómo ayuda ${subject.toLowerCase()} a ${audience}?`, `Ordena ${solution} para que el cliente pueda ${outcome} con menos fricción y más confianza.`],
        [`¿Qué modalidad encaja con este proyecto?`, `Lite cubre un recorrido concreto; Express separa los contenidos principales; Profesional permite trabajar más búsquedas, servicios y puntos de conversión.`],
        [`¿Qué extras suelen aportar valor aquí?`, `Se añaden blog, idiomas, formularios, integraciones o mantenimiento solo cuando ayudan a ${outcome}; no se venden como productos aislados.`],
      ],
      whatsappText: `Hola, me interesa ${subject.toLowerCase()}`,
    };
    return applySectorInsight(content, locale, sectorInsights[groupKey]?.[locale]);
  }
  if (locale === "en") {
    const content = {
      title: `${subject} | WF-Studio · Web Fuengirola`,
      description: `${subject} for ${audience}: ${solution} built to ${outcome}. Clear pricing and direct support in Fuengirola.`,
      h1: `${subject} built to ${outcome}`,
      intro: `WF-Studio delivers ${solution} for ${audience}. Each journey reflects how real customers search, compare and get in touch in Fuengirola, with clear scope and no unnecessary complexity.`,
      problems: [
        `${audience} lose opportunities when ${solution} is not clear from the first visit.`,
        `People who want to ${outcome} need to find the offer, proof and next step quickly on mobile.`,
        `A generic page does not answer the specific questions behind ${subject.toLowerCase()}.`,
      ],
      benefits: [
        `${solution} presented with a hierarchy designed for ${audience}.`,
        `Call, WhatsApp and form journeys built to ${outcome}.`,
        `Local content connecting ${subject.toLowerCase()} with real searches in Fuengirola.`,
      ],
      tierUses: [
        `One page focused on ${solution} and one direct journey to ${outcome}.`,
        `Up to five pages to explain the offer for ${audience}, answer objections and receive enquiries.`,
        `Up to ten pages for variants of ${subject.toLowerCase()}, content and advanced enquiry journeys.`,
      ],
      faqs: [
        [`How does ${subject.toLowerCase()} help ${audience}?`, `It organises ${solution} so customers can ${outcome} with less friction and more confidence.`],
        [`Which package suits this project?`, `Lite covers one focused journey, Express separates the main content, and Professional supports more searches, services and conversion points.`],
        [`Which extras are useful here?`, `Blog, languages, forms, integrations or maintenance are added only when they help the business ${outcome}; they are not separate headline products.`],
      ],
      whatsappText: `Hello, I am interested in ${subject.toLowerCase()}`,
    };
    return applySectorInsight(content, locale, sectorInsights[groupKey]?.[locale]);
  }
  if (locale === "de") {
    const content = {
      title: `${subject} | WF-Studio · Web Fuengirola`,
      description: `${subject} für ${audience}: ${solution}, um ${outcome}. Klare Preise und direkter Kontakt in Fuengirola.`,
      h1: `${subject}, um ${outcome}`,
      intro: `WF-Studio entwickelt ${solution} für ${audience}. Jede Seite berücksichtigt, wie echte Kunden in Fuengirola suchen, vergleichen und Kontakt aufnehmen – mit klarem Umfang und ohne unnötige Komplexität.`,
      problems: [
        `${audience} verlieren Chancen, wenn ${solution} beim ersten Besuch nicht klar wird.`,
        `Wer ${outcome} möchte, muss Angebot, Nachweise und den nächsten Schritt mobil schnell finden.`,
        `Eine allgemeine Seite beantwortet nicht die konkreten Fragen zu ${subject}.`,
      ],
      benefits: [
        `${solution} mit einer Hierarchie, die auf ${audience} abgestimmt ist.`,
        `Anruf-, WhatsApp- und Formularwege mit dem Ziel, ${outcome}.`,
        `Lokale Inhalte verbinden ${subject} mit echten Suchanfragen in Fuengirola.`,
      ],
      tierUses: [
        `Eine Seite mit Fokus auf ${solution}, um ${outcome}.`,
        `Bis zu fünf Seiten, um das Angebot für ${audience} zu erklären, Einwände zu klären und Anfragen zu gewinnen.`,
        `Bis zu zehn Seiten für Varianten von ${subject}, Inhalte und erweiterte Kontaktwege.`,
      ],
      faqs: [
        [`Wie hilft ${subject} ${audience}?`, `Die Website ordnet ${solution}, damit Kunden leichter ${outcome}.`],
        [`Welches Paket passt zu diesem Projekt?`, `Lite deckt einen klaren Weg ab, Express trennt die wichtigsten Inhalte und Professional ermöglicht mehr Suchthemen, Leistungen und Kontaktpunkte.`],
        [`Welche Extras sind hier sinnvoll?`, `Blog, Sprachen, Formulare, Integrationen oder Wartung kommen nur hinzu, wenn sie dabei helfen, ${outcome}.`],
      ],
      whatsappText: `Hallo, ich interessiere mich für ${subject}`,
    };
    return applySectorInsight(content, locale, sectorInsights[groupKey]?.[locale]);
  }
  const content = {
    title: `${subject} | WF-Studio · Web Fuengirola`,
    description: `${subject} kohderyhmälle ${audience}: ${solution}, jotta yritys voi ${outcome}. Selkeät hinnat ja suora palvelu Fuengirolassa.`,
    h1: `${subject}, joiden avulla yritys voi ${outcome}`,
    intro: `WF-Studio toteuttaa ${solution} kohderyhmälle ${audience}. Rakenne perustuu siihen, miten oikeat asiakkaat etsivät, vertailevat ja ottavat yhteyttä Fuengirolassa – selkeästi ja ilman tarpeetonta monimutkaisuutta.`,
    problems: [
      `${audience} menettävät mahdollisuuksia, jos ${solution} ei avaudu heti ensimmäisellä käynnillä.`,
      `Kun tavoitteena on ${outcome}, tarjonnan, näytön osaamisesta ja seuraavan askeleen pitää löytyä nopeasti mobiilissa.`,
      `Yleinen sivu ei vastaa palveluun ${subject.toLowerCase()} liittyviin erityiskysymyksiin.`,
    ],
    benefits: [
      `${solution} esitetään kohderyhmälle ${audience} suunnitellulla hierarkialla.`,
      `Puhelu-, WhatsApp- ja lomakepolut tukevat tavoitetta ${outcome}.`,
      `Paikallinen sisältö yhdistää aiheen ${subject.toLowerCase()} todellisiin Fuengirolan hakuihin.`,
    ],
    tierUses: [
      `Yksi sivu keskittyy ratkaisuun ${solution} ja tavoitteeseen ${outcome}.`,
      `Enintään viisi sivua kohderyhmän ${audience} tarjonnan, luottamuksen ja yhteydenottojen esittämiseen.`,
      `Enintään kymmenen sivua aiheen ${subject.toLowerCase()} eri hakuihin, sisältöihin ja asiakaspolkuihin.`,
    ],
    faqs: [
      [`Miten ${subject.toLowerCase()} auttaa kohderyhmää ${audience}?`, `Se järjestää ratkaisun ${solution}, jotta asiakas voi ${outcome} sujuvammin ja luottavaisemmin.`],
      [`Mikä paketti sopii tähän projektiin?`, `Lite kattaa yhden selkeän polun, Express erottaa tärkeimmät sisällöt ja Ammattitaso tukee useampia hakuja, palveluja ja yhteydenottopisteitä.`],
      [`Mitkä lisäpalvelut ovat hyödyllisiä?`, `Blogi, kielet, lomakkeet, integraatiot tai ylläpito lisätään vain, jos ne auttavat tavoitetta ${outcome}.`],
    ],
    whatsappText: `Hei, olen kiinnostunut palvelusta: ${subject}`,
  };
  return applySectorInsight(content, locale, sectorInsights[groupKey]?.[locale]);
}

function applySectorInsight(content, locale, insight) {
  if (!insight) return content;
  const [focus, trust, searches, question, answer] = insight;
  const copy = {
    es: {
      problems: [`El cliente necesita comparar ${focus} antes de contactar.`, `La decisión se frena cuando faltan ${trust}.`, `La web debe responder a ${searches} sin crear páginas vacías.`],
      benefits: [`Arquitectura específica para mostrar ${focus}.`, `Bloques de confianza dedicados a ${trust}.`, `Contenido y enlaces internos preparados para ${searches}.`],
      tiers: [`Una landing centrada en ${focus}.`, `Hasta cinco páginas para separar ${focus} y explicar ${trust}.`, `Hasta diez páginas para desarrollar ${searches}, contenidos y conversiones avanzadas.`],
    },
    en: {
      problems: [`Customers need to compare ${focus} before getting in touch.`, `Decisions stall when ${trust} are missing.`, `The website must answer ${searches} without creating thin pages.`],
      benefits: [`A sector-specific structure for ${focus}.`, `Dedicated trust blocks covering ${trust}.`, `Content and internal links prepared for ${searches}.`],
      tiers: [`One landing page focused on ${focus}.`, `Up to five pages to separate ${focus} and explain ${trust}.`, `Up to ten pages to develop ${searches}, content and advanced conversions.`],
    },
    de: {
      problems: [`Kunden müssen ${focus} vor der Kontaktaufnahme vergleichen können.`, `Entscheidungen stocken, wenn ${trust} fehlen.`, `Die Website muss ${searches} beantworten, ohne dünne Seiten zu erzeugen.`],
      benefits: [`Eine branchenspezifische Struktur für ${focus}.`, `Eigene Vertrauensbereiche zu ${trust}.`, `Inhalte und interne Links für ${searches}.`],
      tiers: [`Eine Landingpage mit Fokus auf ${focus}.`, `Bis zu fünf Seiten, um ${focus} zu trennen und ${trust} zu erklären.`, `Bis zu zehn Seiten für ${searches}, Inhalte und erweiterte Kontaktwege.`],
    },
    fi: {
      problems: [`Asiakkaan pitää voida vertailla aiheita ${focus} ennen yhteydenottoa.`, `Päätös viivästyy, jos ${trust} puuttuvat.`, `Sivuston pitää vastata hakuihin ${searches} ilman ohuita sivuja.`],
      benefits: [`Toimialakohtainen rakenne aiheille ${focus}.`, `Omat luottamusosiot aiheille ${trust}.`, `Sisältö ja sisäiset linkit hakuihin ${searches}.`],
      tiers: [`Yksi laskeutumissivu aiheille ${focus}.`, `Enintään viisi sivua erottamaan ${focus} ja selittämään ${trust}.`, `Enintään kymmenen sivua hakuihin ${searches}, sisältöihin ja edistyneisiin yhteydenottoihin.`],
    },
  }[locale];
  return { ...content, problems: copy.problems, benefits: copy.benefits, tierUses: copy.tiers, faqs: [[question, answer], ...content.faqs.slice(1)] };
}

export const pageGroups = Object.entries(topics).map(([key, topic]) => ({
  key,
  kind: topic.kind,
  routes: routes[key],
  content: Object.fromEntries(
    localeCodes.map((locale) => [locale, makeContent(locale, topic, key)]),
  ),
  cases: topic.cases ?? [],
}));

export const commercialRoutes = pageGroups.flatMap((group) =>
  localeCodes.map((locale) => ({
    groupKey: group.key,
    kind: group.kind,
    locale,
    path: group.routes[locale],
  })),
);

export function getPageGroup(groupKey) {
  return pageGroups.find((group) => group.key === groupKey);
}

export function getAlternateRoutes(groupKey) {
  const group = getPageGroup(groupKey);
  if (!group) throw new Error(`Unknown commercial page group: ${groupKey}`);
  return { ...group.routes };
}
