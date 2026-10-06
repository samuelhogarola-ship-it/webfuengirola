import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const slugs = [
  "web-para-entrenador-personal-contenidos-contacto",
  "como-medir-contactos-web-negocio-local",
  "contenidos-locales-utiles-sin-duplicar-paginas",
];
const site = "https://webfuengirola.com";

test("new guides have consistent editorial metadata, sources and discovery paths", () => {
  const index = fs.readFileSync("blog/index.html", "utf8");
  const sitemap = fs.readFileSync("sitemap.xml", "utf8");
  const register = fs.readFileSync(
    "docs/seo/2026-10-06-local-business-urls.csv",
    "utf8",
  );
  for (const slug of slugs) {
    const html = fs.readFileSync(path.join("blog", slug, "index.html"), "utf8");
    const url = `${site}/blog/${slug}/`;
    const description = html.match(
      /<meta name="description" content="([^"]+)"/,
    )[1];
    assert.ok(description.length >= 140 && description.length <= 160, slug);
    assert.match(html, /<html lang="es">/);
    assert.ok(html.includes(`rel="canonical" href="${url}"`));
    assert.ok(index.includes(`./${slug}/`));
    assert.ok(sitemap.includes(`<loc>${url}</loc>`));
    assert.ok(register.includes(url));
    const data = JSON.parse(
      html.match(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
      )[1],
    );
    const article = data["@graph"].find(
      (item) => item["@type"] === "BlogPosting",
    );
    assert.equal(article.datePublished, "2026-10-06");
    assert.equal(article.dateModified, "2026-10-06");
    assert.equal(article.mainEntityOfPage, url);
    assert.equal(article.author["@type"], "Person");
    assert.ok(
      html.includes(
        'href="https://webfuengirola.com/">Diseñado por WF Studio</a>',
      ),
    );
    assert.match(html, /https:\/\/(developers|support)\.google\.com\//);
    assert.doesNotMatch(html, /"@type": "FAQPage"/);
    const image = new URL(article.image).pathname.slice(1);
    assert.ok(
      image.endsWith(".webp") && fs.statSync(image).size < 100_000,
      image,
    );
    for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
      const link = new URL(match[1], url);
      if (link.origin !== site) continue;
      const file = `.${link.pathname}${link.pathname.endsWith("/") ? "index.html" : ""}`;
      assert.ok(fs.existsSync(file), `${slug}: ${link.pathname}`);
    }
  }
});

test("new ES guides never become fallback translations or shift old publication dates", () => {
  for (const lang of ["en", "de", "fi"]) {
    const index = fs.readFileSync(`${lang}/blog/index.html`, "utf8");
    for (const slug of slugs) {
      assert.ok(!fs.existsSync(`${lang}/blog/${slug}/index.html`));
      assert.ok(!index.includes(slug));
      assert.ok(
        !fs
          .readFileSync(`blog/${slug}/index.html`, "utf8")
          .includes(`hreflang="${lang}"`),
      );
    }
  }
  for (const [slug, date] of [
    ["diseno-web-para-negocio-local-en-fuengirola", "2026-07-05"],
    ["dominio-hosting-y-correo-para-negocio-local", "2026-07-18"],
  ]) {
    assert.ok(
      fs
        .readFileSync(`blog/${slug}/index.html`, "utf8")
        .includes(`"datePublished": "${date}"`),
    );
  }
});
