import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const site = "https://webfuengirola.com";
const langs = ["en", "de", "fi"];
const allLangs = ["es", ...langs];

const localeMeta = {
  es: { label: "Español", og: "es_ES", blogPath: "/blog/" },
  en: { label: "English", og: "en_GB", blogPath: "/en/blog/" },
  de: { label: "Deutsch", og: "de_DE", blogPath: "/de/blog/" },
  fi: { label: "Suomi", og: "fi_FI", blogPath: "/fi/blog/" },
};

const ui = {
  en: {
    blogTitle: "Web design blog in Fuengirola | Web Fuengirola",
    blogDescription:
      "Clear articles about websites, local SEO, Google, social media and AI for local businesses that want better online enquiries.",
    eyebrow: "Editorial plan",
    hero: "Clear ideas to help your local business sell better online",
    heroSub:
      "Practical articles for local businesses that want to understand what really matters across websites, Google, social media and AI.",
    home: "Home",
    services: "Services",
    cases: "Success stories",
    blog: "Blog",
    calculator: "Price calculator",
    about: "About us",
    cta: "Request a quote",
    read: "Read article",
    minutes: "min",
    articleBadge: "Local business guide",
    keyIdeas: "Key ideas",
    faqTitle: "Frequently asked questions",
    related: "Related articles",
    footer:
      "Websites, local SEO and automation for local businesses on the Costa del Sol.",
    intro:
      "This guide is written for local businesses that need practical decisions, not digital noise. The goal is to understand what to improve first and how a website can support real enquiries.",
    section1: "Why this matters for local businesses",
    section2: "What to review before investing more",
    section3: "How to turn it into contacts",
    paragraph1:
      "A local customer usually wants clarity: what you do, where you work, whether they can trust you and how quickly they can contact you.",
    paragraph2:
      "Good digital work does not start with more tools. It starts with a clear structure, useful content and a path that makes the next step obvious.",
    paragraph3:
      "When your website, Google profile and contact channels tell the same story, visitors feel safer and are more likely to call, write or book.",
    q1: "Do local businesses still need a website?",
    a1: "Yes. Social networks and Google profiles help, but a website gives you a stable base where you control the message, structure and conversion path.",
    q2: "Can this help with local SEO?",
    a2: "Yes, especially when the page answers real search intent, uses clear local signals and links naturally to services and contact options.",
    q3: "What should I improve first?",
    a3: "Start with clarity, mobile speed, visible contact options and content that explains your services in the language customers use.",
  },
  de: {
    blogTitle: "Blog über Webdesign in Fuengirola | Web Fuengirola",
    blogDescription:
      "Klare Artikel über Websites, lokales SEO, Google, soziale Netzwerke und KI für lokale Unternehmen mit mehr echten Anfragen.",
    eyebrow: "Redaktionsplan",
    hero: "Klare Ideen, damit dein lokales Unternehmen online besser verkauft",
    heroSub:
      "Praktische Artikel für lokale Unternehmen, die verstehen wollen, was bei Website, Google, sozialen Netzwerken und KI wirklich sinnvoll ist.",
    home: "Startseite",
    services: "Leistungen",
    cases: "Erfolgsgeschichten",
    blog: "Blog",
    calculator: "Preisrechner",
    about: "Über uns",
    cta: "Angebot anfragen",
    read: "Artikel lesen",
    minutes: "Min.",
    articleBadge: "Ratgeber für lokale Unternehmen",
    keyIdeas: "Wichtige Punkte",
    faqTitle: "Häufige Fragen",
    related: "Ähnliche Artikel",
    footer:
      "Websites, lokales SEO und Automatisierung für lokale Unternehmen an der Costa del Sol.",
    intro:
      "Dieser Ratgeber ist für lokale Unternehmen geschrieben, die praktische Entscheidungen brauchen, nicht mehr digitalen Lärm. Ziel ist zu verstehen, was zuerst verbessert werden sollte und wie die Website echte Anfragen unterstützt.",
    section1: "Warum das für lokale Unternehmen wichtig ist",
    section2: "Was du prüfen solltest, bevor du mehr investierst",
    section3: "Wie daraus echte Kontakte entstehen",
    paragraph1:
      "Ein lokaler Kunde sucht vor allem Klarheit: was du anbietest, wo du arbeitest, ob er dir vertrauen kann und wie einfach er dich erreicht.",
    paragraph2:
      "Gute digitale Arbeit beginnt nicht mit noch mehr Tools. Sie beginnt mit klarer Struktur, nützlichen Inhalten und einem nächsten Schritt, der offensichtlich ist.",
    paragraph3:
      "Wenn Website, Google-Profil und Kontaktwege dieselbe Geschichte erzählen, wirkt dein Angebot sicherer und Besucher fragen eher an.",
    q1: "Brauchen lokale Unternehmen noch eine Website?",
    a1: "Ja. Soziale Netzwerke und Google-Profile helfen, aber eine Website ist die stabile Basis, auf der du Botschaft, Struktur und Kontaktweg kontrollierst.",
    q2: "Hilft das beim lokalen SEO?",
    a2: "Ja, besonders wenn die Seite echte Suchabsichten beantwortet, klare lokale Signale nutzt und sinnvoll auf Leistungen und Kontakt verweist.",
    q3: "Was sollte ich zuerst verbessern?",
    a3: "Beginne mit Klarheit, mobiler Ladezeit, sichtbaren Kontaktmöglichkeiten und Inhalten, die deine Leistungen in der Sprache der Kunden erklären.",
  },
  fi: {
    blogTitle: "Verkkosivublogi Fuengirolassa | Web Fuengirola",
    blogDescription:
      "Selkeitä artikkeleita verkkosivuista, paikallisesta SEO:sta, Googlesta, somesta ja tekoälystä paikallisille yrityksille.",
    eyebrow: "Julkaisusuunnitelma",
    hero: "Selkeitä ideoita, joiden avulla paikallinen yritys myy paremmin verkossa",
    heroSub:
      "Käytännön artikkeleita paikallisille yrityksille, jotka haluavat ymmärtää, mikä verkkosivuissa, Googlessa, somessa ja tekoälyssä oikeasti kannattaa.",
    home: "Etusivu",
    services: "Palvelut",
    cases: "Asiakastarinat",
    blog: "Blogi",
    calculator: "Hintalaskuri",
    about: "Meistä",
    cta: "Pyydä tarjous",
    read: "Lue artikkeli",
    minutes: "min",
    articleBadge: "Opas paikalliselle yritykselle",
    keyIdeas: "Tärkeimmät ajatukset",
    faqTitle: "Usein kysytyt kysymykset",
    related: "Aiheeseen liittyvät artikkelit",
    footer:
      "Verkkosivut, paikallinen SEO ja automaatio paikallisille yrityksille Costa del Solilla.",
    intro:
      "Tämä opas on kirjoitettu paikallisille yrityksille, jotka tarvitsevat käytännöllisiä päätöksiä, eivät lisää digitaalista hälyä. Tavoitteena on ymmärtää, mitä kannattaa parantaa ensin ja miten verkkosivu voi tuoda oikeita yhteydenottoja.",
    section1: "Miksi tämä on tärkeää paikalliselle yritykselle",
    section2: "Mitä kannattaa tarkistaa ennen lisäinvestointeja",
    section3: "Miten tästä syntyy yhteydenottoja",
    paragraph1:
      "Paikallinen asiakas haluaa yleensä selkeyttä: mitä teet, missä toimit, voiko sinuun luottaa ja miten helposti sinuun saa yhteyden.",
    paragraph2:
      "Hyvä digitaalinen tekeminen ei ala uusista työkaluista. Se alkaa selkeästä rakenteesta, hyödyllisestä sisällöstä ja näkyvästä seuraavasta askeleesta.",
    paragraph3:
      "Kun verkkosivu, Google-profiili ja yhteydenottokanavat kertovat samaa tarinaa, kävijä luottaa helpommin ja ottaa todennäköisemmin yhteyttä.",
    q1: "Tarvitseeko paikallinen yritys edelleen verkkosivun?",
    a1: "Kyllä. Sosiaalinen media ja Google-profiili auttavat, mutta verkkosivu on vakaa perusta, jossa hallitset viestiä, rakennetta ja yhteydenoton polkua.",
    q2: "Auttaako tämä paikallisessa SEO:ssa?",
    a2: "Kyllä, etenkin kun sivu vastaa todelliseen hakutarkoitukseen, käyttää selkeitä paikallisia signaaleja ja ohjaa luontevasti palveluihin ja yhteydenottoon.",
    q3: "Mitä kannattaa parantaa ensin?",
    a3: "Aloita selkeydestä, mobiilinopeudesta, näkyvistä yhteydenottotavoista ja sisällöstä, joka selittää palvelusi asiakkaan kielellä.",
  },
};

const postTranslations = {
  "como-salir-en-google-maps-en-fuengirola-y-malaga": {
    en: [
      "How to appear on Google Maps in Fuengirola and Malaga",
      "Profile, reviews, local signals and your website: what usually moves the needle in Maps and nearby searches.",
    ],
    de: [
      "Wie man in Google Maps in Fuengirola und Malaga erscheint",
      "Profil, Bewertungen, lokale Signale und Website: was bei Maps und lokalen Suchen meistens den Unterschied macht.",
    ],
    fi: [
      "Miten näkyä Google Mapsissa Fuengirolassa ja Malagassa",
      "Profiili, arvostelut, paikalliset signaalit ja verkkosivu: asiat, jotka yleensä vaikuttavat Maps-näkyvyyteen.",
    ],
  },
  "cuando-conviene-una-web-de-una-sola-pagina": {
    en: [
      "When a one-page website makes sense",
      "A one-page website can work when the goal is clear, but it is not always the best base for SEO growth.",
    ],
    de: [
      "Wann eine One-Page-Website sinnvoll ist",
      "Eine Website mit nur einer Seite kann funktionieren, wenn das Ziel klar ist, ist aber nicht immer die beste SEO-Basis.",
    ],
    fi: [
      "Milloin yhden sivun verkkosivu kannattaa",
      "Yhden sivun verkkosivu voi toimia, kun tavoite on selkeä, mutta se ei aina ole paras pohja SEO-kasvulle.",
    ],
  },
  "cuanto-cuesta-una-pagina-web-en-fuengirola-y-malaga": {
    en: [
      "How much a website costs in Fuengirola and Malaga",
      "What really affects the price, when a simple website is enough and why comparing only the final number can be misleading.",
    ],
    de: [
      "Was eine Website in Fuengirola und Malaga kostet",
      "Was den Preis wirklich beeinflusst, wann eine einfache Website reicht und warum nur der Endpreis oft täuscht.",
    ],
    fi: [
      "Mitä verkkosivu maksaa Fuengirolassa ja Malagassa",
      "Mikä hintaan oikeasti vaikuttaa, milloin yksinkertainen sivu riittää ja miksi pelkkää loppusummaa ei kannata verrata.",
    ],
  },
  "cuanto-tarda-el-seo-local": {
    en: [
      "How long local SEO takes to show results",
      "What can improve quickly, what usually takes longer and how to understand visibility problems.",
    ],
    de: [
      "Wie lange lokales SEO dauert",
      "Was sich schnell verbessern kann, was länger dauert und wie man Sichtbarkeitsprobleme einordnet.",
    ],
    fi: [
      "Kuinka kauan paikallinen SEO kestää",
      "Mikä voi parantua nopeasti, mikä vie yleensä enemmän aikaa ja miten näkyvyysongelmia kannattaa tulkita.",
    ],
  },
  "diseno-web-para-negocio-local-en-fuengirola": {
    en: [
      "Web design for local businesses in Fuengirola: what it needs",
      "The minimum structure a local website needs to explain the business, activate calls and avoid depending only on social media.",
    ],
    de: [
      "Webdesign für lokale Unternehmen in Fuengirola: was wichtig ist",
      "Die Mindeststruktur, mit der eine lokale Website das Unternehmen erklärt, Anrufe auslöst und nicht nur von Social Media abhängt.",
    ],
    fi: [
      "Verkkosivut paikalliselle yritykselle Fuengirolassa: mitä tarvitaan",
      "Perusrakenne, jolla paikallinen verkkosivu selittää yrityksen, tuo yhteydenottoja eikä nojaa vain someen.",
    ],
  },
  "dominio-hosting-y-correo-para-negocio-local": {
    en: [
      "Domain, hosting and email for a local business",
      "What each piece does, what you should control and which details prevent problems later.",
    ],
    de: [
      "Domain, Hosting und E-Mail für lokale Unternehmen",
      "Was jede Komponente macht, was du kontrollieren solltest und welche Details spätere Probleme vermeiden.",
    ],
    fi: [
      "Verkkotunnus, hosting ja sähköposti paikalliselle yritykselle",
      "Mitä kukin osa tekee, mitä kannattaa hallita itse ja mitkä yksityiskohdat ehkäisevät ongelmia myöhemmin.",
    ],
  },
  "errores-comunes-en-webs-de-negocios-locales": {
    en: [
      "Common mistakes on local business websites",
      "The mistakes that damage a local website even when it looks correct at first glance.",
    ],
    de: [
      "Häufige Fehler auf Websites lokaler Unternehmen",
      "Die Fehler, die einer lokalen Website schaden, auch wenn sie auf den ersten Blick korrekt wirkt.",
    ],
    fi: [
      "Yleisimmät virheet paikallisten yritysten verkkosivuilla",
      "Virheet, jotka heikentävät paikallista verkkosivua, vaikka se näyttäisi ensisilmäyksellä hyvältä.",
    ],
  },
  "google-business-profile-y-web-como-trabajan-juntos": {
    en: [
      "Google Business Profile and website: how they work together",
      "Your Google profile and your website should not compete: together they help customers decide with more confidence.",
    ],
    de: [
      "Google Business Profile und Website: wie sie zusammenarbeiten",
      "Google-Profil und Website sollten nicht konkurrieren: zusammen helfen sie Kunden, sicherer zu entscheiden.",
    ],
    fi: [
      "Google Business Profile ja verkkosivu: miten ne toimivat yhdessä",
      "Google-profiilin ja verkkosivun ei pitäisi kilpailla: yhdessä ne auttavat asiakasta päättämään varmemmin.",
    ],
  },
  "ia-en-buscadores-y-negocios-locales": {
    en: [
      "AI in search engines: what changes for local businesses",
      "What changes when users ask ChatGPT, Gemini, Perplexity and AI answers for local recommendations.",
    ],
    de: [
      "KI in Suchmaschinen: was sich für lokale Unternehmen ändert",
      "Was sich ändert, wenn Nutzer ChatGPT, Gemini, Perplexity und KI-Antworten nach lokalen Empfehlungen fragen.",
    ],
    fi: [
      "Tekoäly hakukoneissa: mikä muuttuu paikallisille yrityksille",
      "Mikä muuttuu, kun käyttäjät pyytävät paikallisia suosituksia ChatGPT:ltä, Geminiltä, Perplexityltä ja tekoälyvastauksilta.",
    ],
  },
  "landing-page-para-campanas-de-google-y-facebook": {
    en: [
      "Landing pages for Google and Facebook campaigns",
      "Why paid traffic needs a focused page, not just a generic homepage.",
    ],
    de: [
      "Landingpages für Google- und Facebook-Kampagnen",
      "Warum bezahlter Traffic eine fokussierte Seite braucht und nicht nur eine allgemeine Startseite.",
    ],
    fi: [
      "Laskeutumissivu Google- ja Facebook-kampanjoille",
      "Miksi maksettu liikenne tarvitsee kohdennetun sivun eikä vain yleistä etusivua.",
    ],
  },
  "mantenimiento-web-que-incluye-y-cuando-compensa": {
    en: [
      "Website maintenance: what it includes and when it pays off",
      "Updates, security, changes, basic SEO and technical support explained for local businesses.",
    ],
    de: [
      "Website-Wartung: was dazugehört und wann sie sich lohnt",
      "Updates, Sicherheit, Änderungen, Basis-SEO und technischer Support für lokale Unternehmen erklärt.",
    ],
    fi: [
      "Verkkosivujen ylläpito: mitä se sisältää ja milloin se kannattaa",
      "Päivitykset, tietoturva, muutokset, perus-SEO ja tekninen tuki selitettynä paikallisille yrityksille.",
    ],
  },
  "por-que-crear-una-web-en-2026": {
    en: [
      "Why create a website in 2026",
      "Pros, cons, differences between Google and social media, Meta ads and why owning your base still matters.",
    ],
    de: [
      "Warum man 2026 eine Website erstellen sollte",
      "Vorteile, Nachteile, Unterschiede zwischen Google und Social Media, Meta Ads und warum eine eigene Basis wichtig bleibt.",
    ],
    fi: [
      "Miksi verkkosivu kannattaa tehdä vuonna 2026",
      "Hyödyt, haitat, Googlen ja somen erot, Meta-mainonta ja miksi oma digitaalinen perusta on edelleen tärkeä.",
    ],
  },
  "resenas-de-google-y-pagina-web": {
    en: [
      "Google reviews and your website: how to use them",
      "How reviews support trust, local SEO and conversion when they are connected to your website.",
    ],
    de: [
      "Google-Bewertungen und Website: wie man sie nutzt",
      "Wie Bewertungen Vertrauen, lokales SEO und Conversion stärken, wenn sie mit der Website verbunden sind.",
    ],
    fi: [
      "Google-arvostelut ja verkkosivu: miten niitä kannattaa hyödyntää",
      "Miten arvostelut vahvistavat luottamusta, paikallista SEO:ta ja yhteydenottoja, kun ne yhdistetään verkkosivuun.",
    ],
  },
  "sabias-que-cada-vez-mas-gente-usa-ia-para-encontrar-un-servicio": {
    en: [
      "More people use AI to find services: what it means",
      "How ChatGPT, Gemini and Perplexity already influence how customers discover and compare businesses.",
    ],
    de: [
      "Immer mehr Menschen nutzen KI, um Dienstleistungen zu finden",
      "Wie ChatGPT, Gemini und Perplexity bereits beeinflussen, wie Kunden Unternehmen entdecken und vergleichen.",
    ],
    fi: [
      "Yhä useampi käyttää tekoälyä palveluiden löytämiseen",
      "Miten ChatGPT, Gemini ja Perplexity vaikuttavat jo siihen, miten asiakkaat löytävät ja vertailevat yrityksiä.",
    ],
  },
  "seo-local-fuengirola-malaga-y-publicidad-con-ia": {
    en: [
      "Local SEO in Fuengirola and Malaga with advertising and AI support",
      "What to separate by city, when local landing pages make sense and how AI fits into acquisition.",
    ],
    de: [
      "Lokales SEO in Fuengirola und Malaga mit Werbung und KI",
      "Was nach Stadt getrennt werden sollte, wann lokale Landingpages sinnvoll sind und wie KI zur Akquise passt.",
    ],
    fi: [
      "Paikallinen SEO Fuengirolassa ja Malagassa mainonnan ja tekoälyn tuella",
      "Mitä kannattaa erottaa kaupungeittain, milloin paikalliset laskeutumissivut toimivat ja miten tekoäly sopii hankintaan.",
    ],
  },
  "seo-local-para-servicios-a-domicilio": {
    en: [
      "Local SEO for home services",
      "How mobile services can gain visibility with service areas, reviews and clear pages.",
    ],
    de: [
      "Lokales SEO für Dienstleistungen beim Kunden",
      "Wie mobile Dienstleistungen mit Einzugsgebieten, Bewertungen und klaren Seiten sichtbarer werden.",
    ],
    fi: [
      "Paikallinen SEO kotiin tuotaville palveluille",
      "Miten liikkuvat palvelut voivat saada näkyvyyttä palvelualueilla, arvosteluilla ja selkeillä sivuilla.",
    ],
  },
  "velocidad-web-en-movil-y-seo-local": {
    en: [
      "Mobile website speed and local SEO",
      "Why mobile speed affects trust, rankings and enquiries for local businesses.",
    ],
    de: [
      "Mobile Website-Geschwindigkeit und lokales SEO",
      "Warum mobile Ladezeit Vertrauen, Rankings und Anfragen lokaler Unternehmen beeinflusst.",
    ],
    fi: [
      "Mobiilinopeus ja paikallinen SEO",
      "Miksi mobiilinopeus vaikuttaa paikallisen yrityksen luottamukseen, sijoituksiin ja yhteydenottoihin.",
    ],
  },
  "web-para-clinica-y-fisioterapia-en-fuengirola": {
    en: [
      "Website for clinics and physiotherapy in Fuengirola",
      "A healthcare website should build trust first: clear services, team, reviews and easy booking.",
    ],
    de: [
      "Website für Klinik und Physiotherapie in Fuengirola",
      "Eine Gesundheitswebsite muss zuerst Vertrauen schaffen: klare Leistungen, Team, Bewertungen und einfache Terminbuchung.",
    ],
    fi: [
      "Verkkosivu klinikalle ja fysioterapialle Fuengirolassa",
      "Terveyspalvelun sivun pitää ensin rakentaa luottamusta: selkeät palvelut, tiimi, arvostelut ja helppo ajanvaraus.",
    ],
  },
  "web-para-restaurante-en-fuengirola": {
    en: [
      "Website for a restaurant in Fuengirola: bookings, menu and Google",
      "Bookings, menu, opening hours, real photos and Google Maps: the basics for better restaurant conversion.",
    ],
    de: [
      "Website für ein Restaurant in Fuengirola: Reservierungen, Karte und Google",
      "Reservierungen, Karte, Öffnungszeiten, echte Fotos und Google Maps: die Basis für bessere Restaurant-Anfragen.",
    ],
    fi: [
      "Verkkosivu ravintolalle Fuengirolassa: varaukset, menu ja Google",
      "Varaukset, menu, aukioloajat, aidot kuvat ja Google Maps: perusta parempaan ravintolan konversioon.",
    ],
  },
  "web-vs-redes-sociales-para-negocio-local": {
    en: [
      "Website vs social media for a local business",
      "When social media helps, when it falls short and why a website usually converts attention into contact better.",
    ],
    de: [
      "Website vs. soziale Netzwerke für lokale Unternehmen",
      "Wann Social Media hilft, wann es zu kurz greift und warum eine Website Aufmerksamkeit besser in Kontakt verwandelt.",
    ],
    fi: [
      "Verkkosivu vai some paikalliselle yritykselle",
      "Milloin some auttaa, milloin se ei riitä ja miksi verkkosivu muuttaa huomion usein paremmin yhteydenotoiksi.",
    ],
  },
  "whatsapp-en-la-web-para-convertir-mas-clientes": {
    en: [
      "WhatsApp on your website: how to convert more customers",
      "How to use WhatsApp without turning the website into a mess of buttons and distractions.",
    ],
    de: [
      "WhatsApp auf der Website: mehr Kundenanfragen gewinnen",
      "Wie man WhatsApp nutzt, ohne die Website mit Buttons und Ablenkungen zu überladen.",
    ],
    fi: [
      "WhatsApp verkkosivulla: miten se tuo enemmän asiakkaita",
      "Miten WhatsAppia käytetään ilman, että sivu täyttyy painikkeista ja häiriöistä.",
    ],
  },
};

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function extractSpanishPosts() {
  const posts = [];
  const blogDir = path.join(root, "blog");
  for (const dirent of fs.readdirSync(blogDir, { withFileTypes: true })) {
    if (!dirent.isDirectory()) continue;
    const slug = dirent.name;
    const file = path.join(blogDir, slug, "index.html");
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf8");
    const title =
      html
        .match(/<h1 class="subpage-hero__title">([\s\S]*?)<\/h1>/)?.[1]
        ?.replace(/<[^>]+>/g, "")
        .trim() ||
      html
        .match(/<title>([\s\S]*?)<\/title>/)?.[1]
        ?.replace(/\s*\|\s*Web Fuengirola$/, "")
        .trim() ||
      slug;
    const description =
      html.match(/<meta name="description" content="([^"]+)"/)?.[1] || "";
    const date =
      html.match(/"datePublished"\s*:\s*"([^"]+)"/)?.[1] || "2026-07-16";
    const dateLabel =
      html.match(/<span>(\d{1,2}\s+[a-záéíóú]+\s+\d{4})<\/span>/i)?.[1] ||
      new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(date));
    const minutes = html.match(/<span>(\d+\s*min)<\/span>/i)?.[1] || "6 min";
    const image =
      html.match(
        /<meta property="og:image" content="https:\/\/webfuengirola\.com\/img\/([^"]+)"/,
      )?.[1] || "blog-home-og.png";
    const tag =
      html.match(/<span class="badge">([^<]+)<\/span>/)?.[1] || "Blog";
    posts.push({
      slug,
      title,
      description,
      date,
      dateLabel,
      minutes,
      image,
      tag,
    });
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

function localizedPost(post, lang) {
  const translated = postTranslations[post.slug]?.[lang];
  const title = translated?.[0] || post.title;
  const description = translated?.[1] || post.description;
  return {
    ...post,
    title,
    description,
    excerpt: description,
    minutes: post.minutes.replace("min", ui[lang].minutes),
  };
}

function hrefLangLinks(slug = "") {
  const page = slug ? `${slug}/` : "";
  return allLangs
    .map((lang) => {
      const href =
        lang === "es" ? `${site}/blog/${page}` : `${site}/${lang}/blog/${page}`;
      return `  <link rel="alternate" hreflang="${lang}" href="${href}" />`;
    })
    .concat([
      `  <link rel="alternate" hreflang="x-default" href="${site}/blog/${page}" />`,
    ])
    .join("\n");
}

function languageSwitcher(slug = "", currentLang) {
  const page = slug ? `${slug}/` : "";
  return `<div class="lang-switcher" aria-label="Article language selector">
    ${allLangs
      .map((lang) => {
        const href =
          lang === "es"
            ? `${site}/blog/${page}`
            : `${site}/${lang}/blog/${page}`;
        return `<a class="lang-switcher__btn${lang === currentLang ? " is-active" : ""}" href="${href}" hreflang="${lang}">${localeMeta[lang].label}</a>`;
      })
      .join("\n    ")}
  </div>`;
}

function nav(lang, depth = 2) {
  const prefix = "../".repeat(depth);
  const copy = ui[lang];
  return `<header class="header" id="header">
    <div class="container header__inner">
      <a href="${prefix}" class="logo" aria-label="Web Fuengirola">
        <img src="${prefix}img/logo-wf.webp" alt="Web Fuengirola" class="logo__img" width="36" height="36" loading="eager" />
      </a>
      <nav class="nav" id="nav" aria-label="Main navigation">
        <ul class="nav__list">
          <li><a href="${prefix}" class="nav__link">${copy.home}</a></li>
          <li><a href="${prefix}servicios/" class="nav__link">${copy.services}</a></li>
          <li><a href="${prefix}casos/" class="nav__link">${copy.cases}</a></li>
          <li><a href="${localeMeta[lang].blogPath}" class="nav__link nav__link--active">${copy.blog}</a></li>
          <li><a href="${prefix}recursos/" class="nav__link">${copy.calculator}</a></li>
          <li><a href="${prefix}sobre-nosotros/" class="nav__link">${copy.about}</a></li>
        </ul>
      </nav>
      <a href="https://wa.me/34622923988?text=Hola%2C%20quiero%20una%20web%20para%20mi%20negocio" class="btn btn--primary header__cta" target="_blank" rel="noopener noreferrer">${copy.cta}</a>
      <button type="button" class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="nav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
}

function footer(lang, depth = 2) {
  const prefix = "../".repeat(depth);
  return `<footer class="footer">
    <div class="container footer__inner">
      <div>
        <a href="${prefix}" class="footer__brand">
          <img src="${prefix}img/logo-wf.webp" alt="Web Fuengirola" width="34" height="34" loading="lazy" />
          <span>Web Fuengirola</span>
        </a>
        <p class="footer__tagline">${ui[lang].footer}</p>
      </div>
      <nav class="footer__nav" aria-label="Footer navigation">
        <ul>
          <li><a href="${localeMeta[lang].blogPath}">${ui[lang].blog}</a></li>
          <li><a href="${prefix}servicios/">${ui[lang].services}</a></li>
          <li><a href="${prefix}contacto/">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </footer>`;
}

function head({
  lang,
  title,
  description,
  canonical,
  image,
  type = "article",
  slug = "",
}) {
  const pageTitle = title.includes("Web Fuengirola")
    ? title
    : `${title} | Web Fuengirola`;
  return `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href="${canonical}" />
${hrefLangLinks(slug)}
  <link rel="icon" type="image/webp" href="${site}/favicon.webp" sizes="48x48" />
  <link rel="shortcut icon" href="${site}/favicon.webp" />
  <link rel="apple-touch-icon" href="${site}/apple-touch-icon.png" sizes="180x180" />
  <link rel="manifest" href="${site}/site.webmanifest" />
  <meta property="og:type" content="${type === "blog" ? "website" : "article"}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${site}/img/${image}" />
  <meta property="og:image:secure_url" content="${site}/img/${image}" />
  <meta property="og:image:alt" content="${escapeHtml(title)}" />
  <meta property="og:site_name" content="Web Fuengirola" />
  <meta property="og:locale" content="${localeMeta[lang].og}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${site}/img/${image}" />
  <link rel="stylesheet" href="${slug ? "../../../" : "../../"}cookie-banner-core.css" />
  <link rel="stylesheet" href="${slug ? "../../../" : "../../"}style.css?v=10" />
</head>`;
}

function blogIndex(lang, posts) {
  const copy = ui[lang];
  const canonical = `${site}/${lang}/blog/`;
  const cards = posts
    .map((post) => {
      const p = localizedPost(post, lang);
      return `<article class="blog-card">
        <a href="./${p.slug}/" class="blog-card__media" aria-label="${escapeHtml(copy.read)}: ${escapeHtml(p.title)}">
          <img src="../../img/${p.image}" alt="${escapeHtml(p.title)}" class="blog-card__image" width="1200" height="630" loading="lazy" decoding="async" />
        </a>
        <span class="tag tag--blue">${escapeHtml(p.tag)}</span>
        <h3 class="blog-card__title"><a href="./${p.slug}/">${escapeHtml(p.title)}</a></h3>
        <p class="blog-card__excerpt">${escapeHtml(p.excerpt)}</p>
        <div class="blog-card__meta"><span>${escapeHtml(p.dateLabel)}</span><span>${escapeHtml(p.minutes)}</span></div>
        <a href="./${p.slug}/" class="btn btn--ghost btn--sm">${copy.read}</a>
      </article>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="${lang}">
${head({ lang, title: copy.blogTitle, description: copy.blogDescription, canonical, image: "blog-home-og.png", type: "blog" })}
<body class="project-page blog-page">
  ${nav(lang, 2)}
  <main>
    <section class="subpage-hero blog-hero">
      <div class="container blog-hero__inner">
        <nav class="project-breadcrumb" aria-label="Breadcrumb"><a href="../../">${copy.home}</a><span>/</span><span>${copy.blog}</span></nav>
        ${languageSwitcher("", lang)}
        <span class="badge">${copy.eyebrow}</span>
        <h1 class="subpage-hero__title">${copy.hero}</h1>
        <p class="subpage-hero__sub">${copy.heroSub}</p>
      </div>
    </section>
    <section class="service-detail blog-listing">
      <div class="container">
        <div class="section-header">
          <span class="section-label">${copy.eyebrow}</span>
          <h2 class="section-title">${copy.blogTitle}</h2>
          <p class="section-sub">${copy.blogDescription}</p>
        </div>
        <div class="blog-grid">
          ${cards}
        </div>
      </div>
    </section>
  </main>
  ${footer(lang, 2)}
</body>
</html>
`;
}

function articlePage(lang, post, relatedPosts) {
  const copy = ui[lang];
  const p = localizedPost(post, lang);
  const canonical = `${site}/${lang}/blog/${post.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.home,
            item: `${site}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.blog,
            item: `${site}/${lang}/blog/`,
          },
          { "@type": "ListItem", position: 3, name: p.title, item: canonical },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        mainEntityOfPage: canonical,
        headline: p.title,
        description: p.description,
        image: `${site}/img/${p.image}`,
        datePublished: p.date,
        dateModified: p.date,
        inLanguage: lang,
        author: { "@type": "Organization", name: "Web Fuengirola" },
        publisher: {
          "@type": "Organization",
          name: "Web Fuengirola",
          logo: { "@type": "ImageObject", url: `${site}/img/logo-wf.webp` },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        inLanguage: lang,
        mainEntity: [
          {
            "@type": "Question",
            name: copy.q1,
            acceptedAnswer: { "@type": "Answer", text: copy.a1 },
          },
          {
            "@type": "Question",
            name: copy.q2,
            acceptedAnswer: { "@type": "Answer", text: copy.a2 },
          },
          {
            "@type": "Question",
            name: copy.q3,
            acceptedAnswer: { "@type": "Answer", text: copy.a3 },
          },
        ],
      },
    ],
  };
  const related = relatedPosts
    .slice(0, 3)
    .map((item) => {
      const r = localizedPost(item, lang);
      return `<a href="../${r.slug}/">${escapeHtml(r.title)}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="${lang}">
${head({ lang, title: p.title, description: p.description, canonical, image: p.image, slug: post.slug })}
<body class="project-page blog-post-page">
  <script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>
  ${nav(lang, 3)}
  <main>
    <article>
      <section class="subpage-hero blog-post-hero">
        <div class="container">
          <nav class="project-breadcrumb" aria-label="Breadcrumb"><a href="../../../">${copy.home}</a><span>/</span><a href="../">${copy.blog}</a><span>/</span><span>${escapeHtml(p.title)}</span></nav>
          ${languageSwitcher(post.slug, lang)}
          <span class="badge">${copy.articleBadge}</span>
          <h1 class="subpage-hero__title">${escapeHtml(p.title)}</h1>
          <p class="subpage-hero__sub">${escapeHtml(p.description)}</p>
          <div class="blog-card__meta"><span>${escapeHtml(p.dateLabel)}</span><span>${escapeHtml(p.minutes)}</span></div>
        </div>
      </section>
      <section class="service-detail">
        <div class="container">
          <div class="blog-post-layout">
            <div class="blog-post-content">
              <figure class="blog-post-featured">
                <img src="../../../img/${p.image}" alt="${escapeHtml(p.title)}" width="1200" height="630" loading="eager" decoding="async" />
              </figure>
              <p>${escapeHtml(copy.intro)}</p>
              <h2>${escapeHtml(copy.section1)}</h2>
              <p>${escapeHtml(copy.paragraph1)}</p>
              <p>${escapeHtml(p.description)}</p>
              <h2>${escapeHtml(copy.section2)}</h2>
              <p>${escapeHtml(copy.paragraph2)}</p>
              <ul>
                <li>${escapeHtml(copy.q3)}</li>
                <li>${escapeHtml(copy.a2)}</li>
                <li>${escapeHtml(copy.a3)}</li>
              </ul>
              <h2>${escapeHtml(copy.section3)}</h2>
              <p>${escapeHtml(copy.paragraph3)}</p>
              <div class="blog-post-faq" id="faq">
                <h2>${escapeHtml(copy.faqTitle)}</h2>
                <h3>${escapeHtml(copy.q1)}</h3>
                <p>${escapeHtml(copy.a1)}</p>
                <h3>${escapeHtml(copy.q2)}</h3>
                <p>${escapeHtml(copy.a2)}</p>
                <h3>${escapeHtml(copy.q3)}</h3>
                <p>${escapeHtml(copy.a3)}</p>
              </div>
              <div class="blog-post-cta">
                <h2>${escapeHtml(copy.cta)}</h2>
                <p>${escapeHtml(copy.footer)}</p>
                <a href="https://wa.me/34622923988?text=Hola%2C%20quiero%20una%20web%20para%20mi%20negocio" class="btn btn--primary" target="_blank" rel="noopener noreferrer">${escapeHtml(copy.cta)}</a>
              </div>
            </div>
            <aside class="blog-post-sidebar">
              <div class="portfolio-card">
                <span class="section-label">${escapeHtml(copy.related)}</span>
                <div class="project-detail__related-links">${related}</div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </article>
  </main>
  ${footer(lang, 3)}
</body>
</html>
`;
}

function writeLocalizedPages(posts) {
  for (const lang of langs) {
    const base = path.join(root, lang, "blog");
    fs.mkdirSync(base, { recursive: true });
    fs.writeFileSync(path.join(base, "index.html"), blogIndex(lang, posts));

    for (const post of posts) {
      const dir = path.join(base, post.slug);
      fs.mkdirSync(dir, { recursive: true });
      const related = posts.filter((item) => item.slug !== post.slug);
      fs.writeFileSync(
        path.join(dir, "index.html"),
        articlePage(lang, post, related),
      );
    }
  }
}

function addSpanishHreflang(posts) {
  const targets = [
    path.join(root, "blog", "index.html"),
    ...posts.map((post) => path.join(root, "blog", post.slug, "index.html")),
  ];
  for (const file of targets) {
    let html = fs.readFileSync(file, "utf8");
    const slug = file.endsWith(path.join("blog", "index.html"))
      ? ""
      : path.basename(path.dirname(file));
    html = html.replace(
      /\n\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>/g,
      "",
    );
    const canonicalMatch = html.match(/<link rel="canonical" href="[^"]+" \/>/);
    if (!canonicalMatch) continue;
    html = html.replace(
      canonicalMatch[0],
      `${canonicalMatch[0]}\n${hrefLangLinks(slug)}`,
    );
    fs.writeFileSync(file, html);
  }
}

function updateSitemap(posts) {
  const sitemapFile = path.join(root, "sitemap.xml");
  let xml = fs.readFileSync(sitemapFile, "utf8");
  const additions = [];
  for (const lang of langs) {
    additions.push(`${site}/${lang}/blog/`);
    for (const post of posts)
      additions.push(`${site}/${lang}/blog/${post.slug}/`);
  }
  const existing = new Set(
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
  );
  const blocks = additions
    .filter((loc) => !existing.has(loc))
    .map(
      (loc) =>
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>2026-07-16</lastmod>\n  </url>`,
    )
    .join("\n");
  if (blocks) {
    xml = xml.replace("</urlset>", `${blocks}\n</urlset>`);
    fs.writeFileSync(sitemapFile, xml);
  }
}

const posts = extractSpanishPosts();
writeLocalizedPages(posts);
addSpanishHreflang(posts);
updateSitemap(posts);
console.log(`Generated ${posts.length} blog posts in ${langs.join(", ")}.`);
