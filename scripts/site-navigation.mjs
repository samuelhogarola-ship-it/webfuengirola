import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { getMarket, getPublishedMarkets } from "../data/markets-data.mjs";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const clientPortal = "https://portal.webfuengirola.com/cliente";

const navigation = {
  es: {
    ariaLabel: "Navegación principal",
    openMenu: "Abrir menú",
    changeLanguage: "Cambiar idioma",
    items: [
      ["/", "Inicio", "home"],
      ["/servicios/", "Servicios", "services"],
      ["/casos/", "Portfolio", "cases"],
      ["/blog/", "Blog", "blog"],
      ["/web-solidaria/", "Web Solidaria", "solidarity"],
      [clientPortal, "Área cliente", "client"],
    ],
  },
  en: {
    ariaLabel: "Main navigation",
    openMenu: "Open menu",
    changeLanguage: "Change language",
    items: [
      ["/en/", "Home", "home"],
      ["/en/web-design-fuengirola/", "Services", "services"],
      ["/en/case-studies/", "Case studies", "cases"],
      ["/en/blog/", "Blog", "blog"],
      ["/web-solidaria/", "Web Solidaria", "solidarity"],
      [clientPortal, "Client area", "client"],
    ],
  },
  de: {
    ariaLabel: "Hauptnavigation",
    openMenu: "Menü öffnen",
    changeLanguage: "Sprache ändern",
    items: [
      ["/de/", "Startseite", "home"],
      ["/de/webdesign-fuengirola/", "Leistungen", "services"],
      ["/de/referenzen/", "Referenzen", "cases"],
      ["/de/blog/", "Blog", "blog"],
      ["/web-solidaria/", "Web Solidaria", "solidarity"],
      [clientPortal, "Kundenbereich", "client"],
    ],
  },
  fi: {
    ariaLabel: "Päänavigointi",
    openMenu: "Avaa valikko",
    changeLanguage: "Vaihda kieli",
    items: [
      ["/fi/", "Etusivu", "home"],
      ["/fi/verkkosivut-fuengirola/", "Palvelut", "services"],
      ["/fi/asiakastyot/", "Asiakastyöt", "cases"],
      ["/fi/blog/", "Blogi", "blog"],
      ["/web-solidaria/", "Web Solidaria", "solidarity"],
      [clientPortal, "Asiakasalue", "client"],
    ],
  },
};

const languageLabels = {
  es: "Español",
  en: "English",
  de: "Deutsch",
  fi: "Suomi",
};
const homeRoutes = { es: "/", en: "/en/", de: "/de/", fi: "/fi/" };

function activeKey(pathname, locale) {
  if (pathname === homeRoutes[locale]) return "home";
  if (pathname === "/web-solidaria/") return "solidarity";
  if (pathname.includes("/blog/")) return "blog";
  if (
    /^\/(?:casos|en\/case-studies|de\/referenzen|fi\/asiakastyot)\//.test(
      pathname,
    )
  ) {
    return "cases";
  }
  if (
    pathname.startsWith("/servicios/") ||
    /^\/(?:aplicaciones-web|auditoria-web-gratis|diseno-web|seo-local|web-multidioma|web-para-)/.test(
      pathname,
    ) ||
    /^\/en\/(?:free-website-audit|multilingual-websites|web-applications|web-design|websites-for-)/.test(
      pathname,
    ) ||
    /^\/de\/(?:kostenlose-website-analyse|mehrsprachige-websites|web-anwendungen|webdesign|websites-fuer-)/.test(
      pathname,
    ) ||
    /^\/fi\/(?:maksuton-verkkosivuanalyysi|monikieliset-verkkosivut|verkkosivut|verkkosovellukset)/.test(
      pathname,
    )
  ) {
    return "services";
  }
  return "";
}

export function renderDefaultLanguageMenu(locale) {
  const copy = navigation[locale] ?? navigation.es;
  return `<details class="language-menu">
        <summary aria-label="${copy.changeLanguage}: ${languageLabels[locale]}"><span aria-hidden="true">${locale.toUpperCase()}</span><svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" /></svg></summary>
        <div class="language-menu__options">${Object.entries(homeRoutes)
          .map(
            ([code, href]) =>
              `<a href="${href}" lang="${code}"${code === locale ? ' aria-current="page"' : ""}>${languageLabels[code]}${code === locale ? ' <span aria-hidden="true">✓</span>' : ""}</a>`,
          )
          .join("")}</div>
      </details>`;
}

export function renderMarketSelector({ currentMarket, localeCode }) {
  const current = getMarket(currentMarket);
  const language = localeCode?.split("-")[0] ?? "es";
  const label =
    {
      es: "Cambiar mercado",
      en: "Change market",
      de: "Markt wechseln",
      fi: "Vaihda markkinaa",
    }[language] ?? "Change market";

  return `<details class="market-menu">
        <summary aria-label="${label}: ${current.label}"><span aria-hidden="true">${current.label}</span><svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" /></svg></summary>
        <div class="market-menu__options">${getPublishedMarkets()
          .map((market) => {
            const isCurrent = market.key === currentMarket;
            const href = market.routes[market.primaryLocale];
            return `<a href="${href}"${isCurrent ? ' aria-current="page"' : ""} data-analytics-event="market_switch" data-analytics-market="${currentMarket}" data-analytics-target-market="${market.key}">${market.label}${isCurrent ? ' <span aria-hidden="true">✓</span>' : ""}</a>`;
          })
          .join("")}</div>
      </details>`;
}

export function renderSiteHeader({
  locale = "es",
  pathname = "/",
  languageMenu = "",
  marketMenu = "",
  items,
  ariaLabel,
  homeHref,
  logoLabel,
  logoAlt,
} = {}) {
  const copy = navigation[locale] ?? navigation.es;
  const current = activeKey(pathname, locale);
  const navItems = items ?? copy.items;
  const links = navItems
    .map(([href, label, key]) => {
      const external = href.startsWith("http");
      const active = items ? href === pathname : key === current;
      return `<li><a href="${href}" class="nav__link${key === "client" ? " nav__link--client" : ""}${active ? " nav__link--active" : ""}"${key === "services" ? ' data-page-transition="services"' : ""}${active ? ' aria-current="page"' : ""}${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a></li>`;
    })
    .join("\n          ");
  return `<header class="header" id="header">
    <div class="container header__inner">
      <a href="${homeHref ?? homeRoutes[locale]}" class="logo" aria-label="${logoLabel ?? "WF-Studio · Web Fuengirola"}">
        <img src="/img/logo-wf.webp" alt="${logoAlt ?? "WF-Studio · Web Fuengirola"}" class="logo__img" width="36" height="36" loading="eager" />
      </a>
      <nav class="nav" id="nav" aria-label="${ariaLabel ?? copy.ariaLabel}">
        <ul class="nav__list">
          ${links}
        </ul>
      </nav>
      ${marketMenu}
      ${languageMenu || renderDefaultLanguageMenu(locale)}
      <button type="button" class="hamburger" id="hamburger" aria-label="${copy.openMenu}" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
    </div>
  </header>`;
}

export function normalizeSiteHeader(html, pathname = "/") {
  const locale =
    html
      .match(/<html\b[^>]*\blang="(es|en|de|fi)(?:-[a-z]{2})?"/i)?.[1]
      ?.toLowerCase() ?? "es";
  const existingHeader = html.match(
    /<header class="header" id="header">[\s\S]*?<\/header>/,
  )?.[0];
  if (!existingHeader) return html;
  const existingLanguageMenu = existingHeader.match(
    /<details class="language-menu">[\s\S]*?<\/details>/,
  )?.[0];
  const languageMenu = existingLanguageMenu?.includes("data-analytics-event")
    ? existingLanguageMenu
    : "";
  const marketMenu = existingHeader.match(
    /<details class="market-menu">[\s\S]*?<\/details>/,
  )?.[0];
  return html.replace(
    existingHeader,
    renderSiteHeader({
      locale,
      pathname,
      languageMenu,
      marketMenu: marketMenu ?? "",
    }),
  );
}

function htmlFiles(directory, root) {
  const ignored = new Set([
    ".git",
    ".worktrees",
    "apps",
    "dist",
    "node_modules",
    "output",
    "portfolio",
    "test-results",
    "testing",
    "tmp",
  ]);
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (directory === root && ignored.has(entry.name)) return [];
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(file, root);
    return entry.name.endsWith(".html") ? [file] : [];
  });
}

export function synchronizePublicNavigation(root = projectRoot) {
  let updated = 0;
  for (const file of htmlFiles(root, root)) {
    const html = fs.readFileSync(file, "utf8");
    const canonical = html.match(
      /<link\b[^>]*rel="canonical"[^>]*href="https:\/\/webfuengirola\.com([^"#]*)/,
    )?.[1];
    const relativeDirectory = path
      .relative(root, path.dirname(file))
      .replaceAll(path.sep, "/");
    const fallback = relativeDirectory ? `/${relativeDirectory}/` : "/";
    const normalized = normalizeSiteHeader(html, canonical || fallback);
    if (normalized === html) continue;
    fs.writeFileSync(file, normalized);
    updated += 1;
  }
  return updated;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  console.log(
    `Synchronized navigation in ${synchronizePublicNavigation()} pages.`,
  );
}
