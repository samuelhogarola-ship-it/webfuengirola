import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("service cards render a dedicated compact action instead of an oversized generic button", () => {
  const html = fs.readFileSync(path.join(root, "servicios/index.html"), "utf8");
  assert.equal(
    (html.match(/class="btn btn--outline service-card__cta"/g) ?? []).length,
    6,
  );
});

test("Web Solidaria keeps a dedicated white page, one H1, and no obsolete icon claims", () => {
  const html = fs.readFileSync(
    path.join(root, "web-solidaria/index.html"),
    "utf8",
  );

  assert.match(html, /<body class="solidaria-page">/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /horses-of-gili-real\.webp/);
  assert.doesNotMatch(html, /solidaria__grid|solidaria__card|solidaria__icon/);
  assert.doesNotMatch(
    html,
    /SEO sin coste|de forma altruista|web profesional gratis|SEO incluido|Google Business Profile/i,
  );
});
