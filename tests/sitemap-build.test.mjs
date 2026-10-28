import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function runScript(script, cwd) {
  const result = spawnSync(process.execPath, [script], {
    cwd,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
}

function sitemapEntry(loc, lastmod) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
}

test("the sitemap build preserves lastmod unless a newer dateModified applies", () => {
  const outputRoot = fs.mkdtempSync(path.join(os.tmpdir(), "wf-sitemap-"));
  fs.mkdirSync(path.join(outputRoot, "scripts"));
  fs.copyFileSync(
    path.join(root, "scripts/build-sitemap.mjs"),
    path.join(outputRoot, "scripts/build-sitemap.mjs"),
  );

  fs.writeFileSync(
    path.join(outputRoot, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset>\n${[
      sitemapEntry("https://webfuengirola.com/", "2026-10-16"),
      sitemapEntry("https://webfuengirola.com/updated/", "2026-09-01"),
    ].join("\n")}\n</urlset>\n`,
  );
  fs.writeFileSync(
    path.join(outputRoot, "index.html"),
    '<link rel="canonical" href="https://webfuengirola.com/" /><script type="application/ld+json">{"dateModified":"2026-07-01"}</script>',
  );
  for (const [slug, modified] of [
    ["updated", "2026-10-17"],
    ["new", "2026-08-20"],
  ]) {
    fs.mkdirSync(path.join(outputRoot, slug));
    fs.writeFileSync(
      path.join(outputRoot, slug, "index.html"),
      `<link rel="canonical" href="https://webfuengirola.com/${slug}/" /><script type="application/ld+json">{"dateModified":"${modified}"}</script>`,
    );
  }

  runScript("scripts/build-sitemap.mjs", outputRoot);
  const sitemap = fs.readFileSync(path.join(outputRoot, "sitemap.xml"), "utf8");

  assert.match(
    sitemap,
    /<loc>https:\/\/webfuengirola\.com\/<\/loc>\s*<lastmod>2026-10-16<\/lastmod>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/webfuengirola\.com\/updated\/<\/loc>\s*<lastmod>2026-10-17<\/lastmod>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/webfuengirola\.com\/new\/<\/loc>\s*<lastmod>2026-08-20<\/lastmod>/,
  );
});

test("the portfolio build leaves sitemap ownership to build-sitemap", () => {
  const outputRoot = fs.mkdtempSync(path.join(os.tmpdir(), "wf-portfolio-"));
  for (const directory of ["scripts", "data", "portfolio"]) {
    fs.mkdirSync(path.join(outputRoot, directory));
  }
  for (const relativePath of [
    "scripts/build-portfolio.mjs",
    "data/cases-data.mjs",
    "data/services-data.mjs",
    "portfolio/projects-data.mjs",
  ]) {
    fs.copyFileSync(
      path.join(root, relativePath),
      path.join(outputRoot, relativePath),
    );
  }

  runScript("scripts/build-portfolio.mjs", outputRoot);

  assert.equal(fs.existsSync(path.join(outputRoot, "sitemap.xml")), false);
});

test("the project sitemap advances only pages whose content changed", () => {
  const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  for (const route of [
    "servicios/",
    "casos/",
    "en/web-design-fuengirola/",
    "de/webdesign-fuengirola/",
    "fi/verkkosivut-fuengirola/",
  ]) {
    assert.match(
      sitemap,
      new RegExp(
        `<loc>https://webfuengirola.com/${route.replaceAll("/", "\\/")}<\\/loc>\\s*<lastmod>2026-10-18<\\/lastmod>`,
      ),
    );
  }
  assert.match(
    sitemap,
    /<loc>https:\/\/webfuengirola\.com\/<\/loc>\s*<lastmod>2026-10-16<\/lastmod>/,
  );
});

test("the production build publishes exactly the two Mexico market routes", () => {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(root, "package.json"), "utf8"),
  );
  const buildAll = packageJson.scripts["build:all"];
  const marketBuildIndex = buildAll.indexOf("build:markets");
  const sitemapBuildIndex = buildAll.indexOf("build:sitemap");

  assert.ok(marketBuildIndex >= 0, "build:all must run build:markets");
  assert.ok(
    marketBuildIndex < sitemapBuildIndex,
    "market pages must exist before the sitemap is generated",
  );
  assert.match(packageJson.scripts.check, /scripts\/build-market-pages\.mjs/);
  assert.match(
    packageJson.scripts.check,
    /scripts\/update-exchange-rates\.mjs/,
  );

  const dockerfile = fs.readFileSync(path.join(root, "Dockerfile.web"), "utf8");
  assert.match(dockerfile, /\/app\/mexico\s*\\/);

  assert.equal(fs.existsSync(path.join(root, "mexico/index.html")), true);
  assert.equal(fs.existsSync(path.join(root, "mexico/en/index.html")), true);

  const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  const mexicoUrls = [
    ...sitemap.matchAll(/<loc>([^<]*\/mexico\/[^<]*)<\/loc>/g),
  ]
    .map((match) => match[1])
    .sort();
  assert.deepEqual(mexicoUrls, [
    "https://webfuengirola.com/mexico/",
    "https://webfuengirola.com/mexico/en/",
  ]);
});
