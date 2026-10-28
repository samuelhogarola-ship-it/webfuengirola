import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { getMarketPage, marketPages } from "../data/market-pages-data.mjs";
import {
  generateMarketPages,
  renderMarketHreflang,
  renderMarketPage,
  renderMarketTierCards,
} from "../scripts/build-market-pages.mjs";

const snapshot = {
  base: "EUR",
  date: "2026-10-27",
  rates: { USD: 1.115, MXN: 20.78, BRL: 5.9624 },
};

function flattenCopy(page) {
  return JSON.stringify(page);
}

test("Mexico exposes exactly its Spanish and English regional pages", () => {
  assert.deepEqual(Object.keys(marketPages.mexico), ["es-MX", "en-MX"]);
  assert.equal(getMarketPage("mexico", "es-MX").route, "/mexico/");
  assert.equal(getMarketPage("mexico", "en-MX").route, "/mexico/en/");
  assert.throws(
    () => getMarketPage("mexico", "de-MX"),
    /Unknown market page: mexico\/de-MX/,
  );
});

test("USA and Brasil expose their approved regional locales", () => {
  assert.deepEqual(Object.keys(marketPages.usa), ["en-US", "es-US"]);
  assert.deepEqual(Object.keys(marketPages.brasil), ["pt-BR"]);
  assert.equal(getMarketPage("usa", "en-US").route, "/usa/");
  assert.equal(getMarketPage("usa", "es-US").route, "/usa/es/");
  assert.equal(getMarketPage("brasil", "pt-BR").route, "/brasil/");
});

test("all regional records are complete, original, and free of invented local presence", () => {
  for (const [marketKey, pages] of Object.entries(marketPages)) {
    for (const page of Object.values(pages)) {
      const copy = flattenCopy(page);
      assert.equal(page.marketKey, marketKey);
      assert.equal(page.htmlLang, page.localeCode);
      assert.match(page.title, /WF-Studio/);
      assert.ok(page.description.length > 80);
      assert.ok(page.h1.length > 20);
      assert.ok(page.intro.length > 80);
      assert.equal(page.problems.length, 3);
      assert.equal(page.benefits.length, 3);
      assert.equal(page.tierUses.length, 3);
      assert.equal(page.process.length, 3);
      assert.equal(page.faqs.length, 3);
      assert.ok(page.labels && Object.keys(page.labels).length >= 16);
      assert.doesNotMatch(
        copy,
        /Fuengirola|oficina (?:en|local)|local office|based in (?:Mexico|USA|Brazil)|equipe local|resultado garantizado|guaranteed result/i,
      );
    }
  }
});

test("each Mexico page satisfies the complete content contract", () => {
  for (const page of Object.values(marketPages.mexico)) {
    assert.equal(page.marketKey, "mexico");
    assert.equal(page.htmlLang, page.localeCode);
    assert.match(page.title, /WF-Studio/);
    assert.ok(page.description.length > 80);
    assert.ok(page.h1.length > 20);
    assert.ok(page.intro.length > 80);
    assert.equal(page.problems.length, 3);
    assert.equal(page.benefits.length, 3);
    assert.equal(page.tierUses.length, 3);
    assert.equal(page.faqs.length, 3);
    assert.ok(page.faqs.every(({ question, answer }) => question && answer));
    assert.ok(page.labels && Object.keys(page.labels).length >= 16);
    assert.ok(page.whatsappText.length > 20);
  }
});

test("Mexico copy presents a European studio without inventing local claims", () => {
  const spanishCopy = flattenCopy(getMarketPage("mexico", "es-MX"));
  const englishCopy = flattenCopy(getMarketPage("mexico", "en-MX"));

  assert.match(spanishCopy, /México/);
  assert.match(spanishCopy, /Europa|europe[oa]/i);
  assert.match(englishCopy, /Mexico/);
  assert.match(englishCopy, /Europe|European/);

  for (const copy of [spanishCopy, englishCopy]) {
    assert.doesNotMatch(
      copy,
      /oficina en México|Mexico office|based in Mexico|equipo local|local team|acreditad|accredit|resultado garantizado|guaranteed result/i,
    );
  }
});

test("Spanish and English are independently localized rather than duplicated", () => {
  const spanish = getMarketPage("mexico", "es-MX");
  const english = getMarketPage("mexico", "en-MX");

  assert.notEqual(spanish.h1, english.h1);
  assert.notEqual(spanish.intro, english.intro);
  assert.notDeepEqual(spanish.problems, english.problems);
  assert.notDeepEqual(spanish.benefits, english.benefits);
  assert.notDeepEqual(spanish.tierUses, english.tierUses);
  assert.notDeepEqual(spanish.faqs, english.faqs);
});

test("Mexico hreflang stays regional, reciprocal, and Mexico-primary", () => {
  const alternates = renderMarketHreflang("mexico");

  assert.match(
    alternates,
    /hreflang="es-MX" href="https:\/\/webfuengirola\.com\/mexico\/"/,
  );
  assert.match(
    alternates,
    /hreflang="en-MX" href="https:\/\/webfuengirola\.com\/mexico\/en\/"/,
  );
  assert.match(
    alternates,
    /hreflang="x-default" href="https:\/\/webfuengirola\.com\/mexico\/"/,
  );
});

test("Mexico package cards use the approved MXN conversions and neutral tax copy", () => {
  const page = getMarketPage("mexico", "es-MX");
  const html = renderMarketTierCards(page, snapshot);

  assert.match(html, /\$4,400 MXN/);
  assert.match(html, /\$7,700 MXN/);
  assert.match(html, /\$13,100 MXN/);
  assert.match(html, /Impuestos y servicios de terceros/);
  assert.match(html, /2026-10-27/);
  assert.doesNotMatch(html, /€|\+ IVA|\+ VAT/);
});

test("each rendered Mexico page carries regional SEO, market data, and safe claims", () => {
  for (const page of Object.values(marketPages.mexico)) {
    const html = renderMarketPage(page, snapshot);
    const canonical = `https://webfuengirola.com${page.route}`;

    assert.match(html, new RegExp(`<html lang="${page.htmlLang}"`));
    assert.match(html, new RegExp(`rel="canonical" href="${canonical}"`));
    assert.match(
      html,
      new RegExp(`property="og:locale" content="${page.ogLocale}"`),
    );
    assert.match(html, /hreflang="es-MX"/);
    assert.match(html, /hreflang="en-MX"/);
    assert.match(html, /hreflang="x-default"/);
    assert.match(
      html,
      /<body[^>]*data-market="mexico"[^>]*data-locale="(?:es|en)-MX"/,
    );
    assert.match(html, /"areaServed":"Mexico"/);
    assert.match(html, /data-market="mexico"/);
    assert.match(html, new RegExp(`data-locale="${page.localeCode}"`));
    assert.match(html, /data-currency="MXN"/);
    assert.match(html, new RegExp(`data-source-route="${page.route}"`));
    assert.match(html, /href="\/mexico\/" hreflang="es-MX"/);
    assert.match(html, /href="\/mexico\/en\/" hreflang="en-MX"/);
    assert.match(html, /2026-10-27/);
    assert.doesNotMatch(
      html,
      /€|\+ IVA|\+ VAT|oficina en México|Mexico office|based in Mexico|street address/i,
    );
  }
});

test("the generator writes both Mexico locale routes from the source records", async (t) => {
  const outputRoot = await mkdtemp(path.join(tmpdir(), "wf-markets-"));
  t.after(() => rm(outputRoot, { recursive: true, force: true }));

  const written = await generateMarketPages(outputRoot, {
    marketKeys: ["mexico"],
    snapshot,
  });

  assert.deepEqual(
    written.map((file) => path.relative(outputRoot, file)),
    ["mexico/index.html", "mexico/en/index.html"],
  );
  assert.match(
    await readFile(path.join(outputRoot, "mexico/index.html"), "utf8"),
    /<html lang="es-MX"/,
  );
  assert.match(
    await readFile(path.join(outputRoot, "mexico/en/index.html"), "utf8"),
    /<html lang="en-MX"/,
  );
});
