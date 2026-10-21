import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

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
