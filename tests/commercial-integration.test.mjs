import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function filesBelow(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(file) : [file];
  });
}

test("the home presents WF-Studio as the primary brand with the local alias", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.match(html, /<strong>WF-Studio<\/strong><small>Web Fuengirola<\/small>/);
  assert.match(html, /"name": "WF-Studio"/);
  assert.match(html, /"alternateName": "Web Fuengirola"/);
});

test("blog pages lead to current commercial routes instead of obsolete product combinations", () => {
  const blogRoots = ["blog", "en/blog", "de/blog", "fi/blog"];
  for (const blogRoot of blogRoots) {
    for (const file of filesBelow(path.join(root, blogRoot)).filter((item) => item.endsWith(".html"))) {
      const html = fs.readFileSync(file, "utf8");
      assert.doesNotMatch(html, /href="[^"]*\/productos\//, path.relative(root, file));
    }
  }
});

test("blog generators use the dual brand", () => {
  for (const script of ["scripts/build-blog-campaign.mjs", "scripts/build-blog-i18n.mjs"]) {
    const source = fs.readFileSync(path.join(root, script), "utf8");
    assert.match(source, /WF-Studio · Web Fuengirola/, script);
  }
});

test("localized blog navigation leads to commercial pages in the same language", () => {
  for (const locale of ["en", "de", "fi"]) {
    const html = fs.readFileSync(path.join(root, locale, "blog/index.html"), "utf8");
    const expected = {
      en: "/en/web-design-fuengirola/",
      de: "/de/webdesign-fuengirola/",
      fi: "/fi/verkkosivut-fuengirola/",
    }[locale];
    assert.match(html, new RegExp(`href="${expected}"`));
  }
});

test("obsolete product combinations redirect and stay out of the index", () => {
  const redirects = {
    "lite-blog-wordpress": "/precios-diseno-web-fuengirola/",
    "express-300-blog-wordpress": "/precios-diseno-web-fuengirola/",
    "web-personalizada": "/diseno-web-fuengirola/",
    "express-migracion-optimizacion-formularios": "/diseno-web-fuengirola/",
    "personalizada-webapp": "/servicios/aplicaciones-web/",
    "mini-saas-personalizado": "/servicios/aplicaciones-web/",
  };
  const nginx = fs.readFileSync(path.join(root, "nginx/default.conf"), "utf8");
  for (const [slug, destination] of Object.entries(redirects)) {
    const html = fs.readFileSync(path.join(root, "productos", slug, "index.html"), "utf8");
    assert.match(html, /content="noindex, follow/);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://webfuengirola.com${destination}"`));
    assert.ok(
      nginx.includes(`location = /productos/${slug}/`) && nginx.includes(`return 301 ${destination}`),
      slug,
    );
  }
});
