import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { renderSiteHeader } from "../scripts/site-navigation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function publicHtmlFiles(directory = root) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === "node_modules" || entry.name === ".git") return [];
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return publicHtmlFiles(absolute);
    return entry.name.endsWith(".html") ? [absolute] : [];
  });
}

const expectedSpanishNavigation = [
  ["/", "Inicio"],
  ["/servicios/", "Servicios"],
  ["/casos/", "Portfolio"],
  ["/blog/", "Blog"],
  ["/web-solidaria/", "Web Solidaria"],
  ["https://portal.webfuengirola.com/cliente", "Área cliente"],
];

function primaryNavigation(file) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const nav = html.match(
    /<nav class="nav" id="nav"[^>]*>([\s\S]*?)<\/nav>/,
  )?.[1];
  assert.ok(nav, `${file} must expose the shared primary navigation`);
  return [...nav.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].map(
    ([, href, label]) => [href, label.trim()],
  );
}

test("Spanish public page families use the Home navigation contract", () => {
  for (const file of [
    "index.html",
    "servicios/index.html",
    "casos/index.html",
    "casos/agama/index.html",
    "blog/index.html",
    "sobre-nosotros/index.html",
    "web-solidaria/index.html",
  ]) {
    assert.deepEqual(primaryNavigation(file), expectedSpanishNavigation, file);
  }
});

test("every localized commercial navigation includes client access and excludes Resources", () => {
  const expectations = {
    "en/websites-for-restaurants-fuengirola/index.html": [
      ["/en/", "Home"],
      ["/en/web-design-fuengirola/", "Services"],
      ["/en/case-studies/", "Case studies"],
      ["/en/blog/", "Blog"],
      ["/web-solidaria/", "Web Solidaria"],
      ["https://portal.webfuengirola.com/cliente", "Client area"],
    ],
    "de/websites-fuer-restaurants-fuengirola/index.html": [
      ["/de/", "Startseite"],
      ["/de/webdesign-fuengirola/", "Leistungen"],
      ["/de/referenzen/", "Referenzen"],
      ["/de/blog/", "Blog"],
      ["/web-solidaria/", "Web Solidaria"],
      ["https://portal.webfuengirola.com/cliente", "Kundenbereich"],
    ],
    "fi/verkkosivut-ravintoloille-fuengirola/index.html": [
      ["/fi/", "Etusivu"],
      ["/fi/verkkosivut-fuengirola/", "Palvelut"],
      ["/fi/asiakastyot/", "Asiakastyöt"],
      ["/fi/blog/", "Blogi"],
      ["/web-solidaria/", "Web Solidaria"],
      ["https://portal.webfuengirola.com/cliente", "Asiakasalue"],
    ],
  };

  for (const [file, expected] of Object.entries(expectations)) {
    assert.deepEqual(primaryNavigation(file), expected, file);
  }
});

test("Resources routes and links are absent from the public site", () => {
  assert.equal(fs.existsSync(path.join(root, "recursos")), false);
  const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  assert.doesNotMatch(sitemap, /\/recursos(?:\/|&lt;)/);

  for (const file of publicHtmlFiles()) {
    const html = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(
      html,
      /href="[^"]*\/recursos\//,
      path.relative(root, file),
    );
  }
});

test("retired Resources URLs preserve traffic with explicit redirects", () => {
  const nginx = fs.readFileSync(path.join(root, "nginx/default.conf"), "utf8");
  for (const [route, target] of [
    ["recursos", "/servicios/"],
    ["recursos/herramientas", "/servicios/#precios"],
    ["recursos/guias", "/blog/"],
    ["recursos/checklists", "/auditoria-web-gratis/"],
  ]) {
    assert.match(
      nginx,
      new RegExp(
        `location ~ \\^/${route}/\\?\\$ \\{[\\s\\S]*?return 301 ${target.replaceAll("/", "\\/")};`,
      ),
    );
  }
});

test("the removed calculator leaves no public JavaScript, CSS or translation residue", () => {
  const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
  const styles = fs.readFileSync(path.join(root, "style.css"), "utf8");
  assert.doesNotMatch(
    script,
    /calculator|calculadora|estimator|calcLabel|navResources/i,
  );
  assert.doesNotMatch(styles, /calculator|calculadora|estimator/i);

  const dockerfile = fs.readFileSync(path.join(root, "Dockerfile.web"), "utf8");
  assert.doesNotMatch(dockerfile, /\/app\/recursos(?:\s|\\)/);
  const copiedPaths = dockerfile
    .match(/RUN cp -R \\\n([\s\S]*?)\s+\/out\//)?.[1]
    ?.match(/\/app\/[^\s\\]+/g);
  assert.ok(copiedPaths?.length, "Dockerfile must declare production files");
  for (const source of copiedPaths) {
    assert.equal(
      fs.existsSync(path.join(root, source.slice("/app/".length))),
      true,
      `Docker source is missing: ${source}`,
    );
  }

  const socialPosts = fs
    .readdirSync(path.join(root, "content/posts"))
    .filter((file) => /^post-\d{2}-.+\.md$/.test(file))
    .map((file) =>
      fs.readFileSync(path.join(root, "content/posts", file), "utf8"),
    )
    .join("\n");
  assert.doesNotMatch(socialPosts, /calculadora de precios/i);
});

test("every public page generator renders the shared header directly", () => {
  for (const file of [
    "scripts/build-services.mjs",
    "scripts/build-casos.mjs",
    "scripts/build-blog-campaign.mjs",
    "scripts/build-blog-i18n.mjs",
    "scripts/build-commercial-pages.mjs",
  ]) {
    const source = fs.readFileSync(path.join(root, file), "utf8");
    assert.match(
      source,
      /import \{[^}]*renderSiteHeader[^}]*\} from "\.\/site-navigation\.mjs";/s,
      file,
    );
    assert.match(source, /renderSiteHeader\(\{/, file);
    assert.doesNotMatch(source, /<header class="header" id="header">/, file);
  }

  const packageJson = JSON.parse(
    fs.readFileSync(path.join(root, "package.json"), "utf8"),
  );
  assert.doesNotMatch(packageJson.scripts["build:all"], /build:navigation/);
});

test("service landings expose Services as the active navigation item", () => {
  for (const [locale, pathname] of [
    ["es", "/aplicaciones-web-fuengirola/"],
    ["en", "/en/web-applications-fuengirola/"],
    ["de", "/de/web-anwendungen-fuengirola/"],
    ["fi", "/fi/verkkosovellukset-fuengirola/"],
  ]) {
    const header = renderSiteHeader({ locale, pathname });
    assert.match(
      header,
      /data-page-transition="services" aria-current="page"/,
      pathname,
    );
  }
});
