import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  getHomepageRecord,
  homepageRecords,
} from "../data/home-pages-data.mjs";
import {
  generateHomepages,
  renderHomepage,
} from "../scripts/render-homepage.mjs";

const snapshot = {
  base: "EUR",
  date: "2026-10-27",
  rates: { USD: 1.115, MXN: 20.78, BRL: 5.9624 },
};

test("Spain exposes four Fuengirola homepage records from one contract", () => {
  assert.deepEqual(Object.keys(homepageRecords.spain), [
    "es-ES",
    "en-GB",
    "de-DE",
    "fi-FI",
  ]);

  for (const localeCode of Object.keys(homepageRecords.spain)) {
    const record = getHomepageRecord("spain", localeCode);
    assert.equal(record.marketKey, "spain");
    assert.equal(record.currency, "EUR");
    assert.equal(record.localeCode, localeCode);
    assert.ok(record.hero.h1.length > 20);
    assert.equal(record.services.length, 3);
    assert.equal(record.process.length, 3);
    assert.equal(record.faqs.length, 3);
  }
});

test("every Spain locale renders the Spanish reference homepage shell", () => {
  for (const localeCode of Object.keys(homepageRecords.spain)) {
    const html = renderHomepage(
      getHomepageRecord("spain", localeCode),
      snapshot,
    );

    assert.match(html, /<body class="home-page"/);
    assert.match(html, /class="hero hero--cinematic"/);
    assert.match(html, /hero-northern-lights-screen-branded\.png/);
    assert.match(html, /class="stack-cards-track"/);
    assert.match(html, /class="case-showcase/);
    assert.match(html, /class="process/);
    assert.match(html, /class="whatsapp-fab"/);
    assert.match(html, /id="page-transition"/);
    assert.match(html, /class="market-menu"/);
    assert.match(html, /class="language-menu"/);
    assert.doesNotMatch(html, /commercial-page--home|commercial-hero/);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  }
});

test("the shared homepage generator writes the four Spain routes", async (t) => {
  const outputRoot = await mkdtemp(path.join(tmpdir(), "wf-homepages-"));
  t.after(() => rm(outputRoot, { recursive: true, force: true }));

  const written = await generateHomepages(outputRoot, {
    marketKeys: ["spain"],
    snapshot,
  });

  assert.deepEqual(
    written.map((file) => path.relative(outputRoot, file)),
    ["index.html", "en/index.html", "de/index.html", "fi/index.html"],
  );
  assert.match(
    await readFile(path.join(outputRoot, "de/index.html"), "utf8"),
    /<html lang="de-DE"/,
  );
});

test("the shared homepage contract publishes all nine market and locale records", () => {
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(homepageRecords).map(([market, records]) => [
        market,
        Object.keys(records),
      ]),
    ),
    {
      spain: ["es-ES", "en-GB", "de-DE", "fi-FI"],
      mexico: ["es-MX", "en-MX"],
      usa: ["en-US", "es-US"],
      brasil: ["pt-BR"],
    },
  );
});

test("Mexico, USA, and Brasil keep their identity inside the reference shell", () => {
  for (const [marketKey, localeCodes] of Object.entries({
    mexico: ["es-MX", "en-MX"],
    usa: ["en-US", "es-US"],
    brasil: ["pt-BR"],
  })) {
    for (const localeCode of localeCodes) {
      const record = getHomepageRecord(marketKey, localeCode);
      const html = renderHomepage(record, snapshot);
      const copy = JSON.stringify(record);

      assert.match(html, /class="hero hero--cinematic"/);
      assert.match(html, /class="stack-cards-track"/);
      assert.match(html, new RegExp(`data-market="${marketKey}"`));
      assert.match(html, new RegExp(`data-locale="${localeCode}"`));
      assert.match(html, new RegExp(`data-currency="${record.currency}"`));
      assert.match(html, new RegExp(`data-form-market="${marketKey}"`));
      assert.match(html, new RegExp(`data-form-locale="${localeCode}"`));
      assert.match(html, new RegExp(`data-form-currency="${record.currency}"`));
      assert.match(
        html,
        new RegExp(
          `data-source-route="${record.route.replaceAll("/", "\\/")}"`,
        ),
      );
      assert.match(
        html,
        new RegExp(`data-api-base="https:\\/\\/admin\\.webfuengirola\\.com"`),
      );
      assert.doesNotMatch(html, /commercial-page--home|commercial-hero/);
      assert.doesNotMatch(
        copy,
        /Fuengirola|\+ IVA|\+ VAT|oficina (?:en|local)|local office|based in (?:Mexico|USA|Brazil)|equipe local/i,
      );
    }
  }
});

test("regional service cards use current EUR conversions plus five percent", () => {
  const cases = [
    ["mexico", "es-MX", "MXN", [4400, 7700, 13100]],
    ["usa", "en-US", "USD", [235, 410, 705]],
    ["brasil", "pt-BR", "BRL", [1260, 2200, 3760]],
  ];

  for (const [marketKey, localeCode, currency, prices] of cases) {
    const html = renderHomepage(
      getHomepageRecord(marketKey, localeCode),
      snapshot,
    );
    for (const price of prices) {
      assert.match(html, new RegExp(`data-tier-price="${price}"`));
    }
    assert.match(html, new RegExp(`data-currency="${currency}"`));
    assert.match(html, /2026-10-27/);
    assert.doesNotMatch(html, /\+ IVA|\+ VAT/);
  }
});

test("service package links preserve the selected plan for the contact form", () => {
  const record = getHomepageRecord("mexico", "es-MX");
  const html = renderHomepage(record, snapshot);

  for (const plan of ["lite", "express", "professional"]) {
    assert.match(
      html,
      new RegExp(
        `href="/mexico/\\?plan=${plan}#contact"[^>]*data-analytics-event="tier_select"[^>]*data-analytics-tier="${plan}"`,
      ),
    );
  }
});

test("localized home actions keep users in a compatible language journey", () => {
  const cases = [
    ["spain", "en-GB", "/en/case-studies/", "/en/local-seo-fuengirola/"],
    ["spain", "de-DE", "/de/referenzen/", "/de/lokales-seo-fuengirola/"],
    ["spain", "fi-FI", "/fi/asiakastyot/", "/fi/paikallinen-seo-fuengirola/"],
    ["mexico", "en-MX", "/en/case-studies/", "/en/local-seo-fuengirola/"],
    ["usa", "en-US", "/en/case-studies/", "/en/local-seo-fuengirola/"],
    ["brasil", "pt-BR", "/casos/", "/brasil/#services"],
  ];

  for (const [market, locale, portfolioRoute, relatedServiceRoute] of cases) {
    const html = renderHomepage(getHomepageRecord(market, locale), snapshot);
    assert.match(html, new RegExp(`href="${portfolioRoute}"`));
    assert.match(html, new RegExp(`href="${relatedServiceRoute}"`));
  }
});

test("regional homepages use neutral WF-Studio branding and market-safe cases", () => {
  for (const [market, locale] of [
    ["mexico", "es-MX"],
    ["mexico", "en-MX"],
    ["usa", "en-US"],
    ["usa", "es-US"],
    ["brasil", "pt-BR"],
  ]) {
    const html = renderHomepage(getHomepageRecord(market, locale), snapshot);

    assert.match(html, /property="og:site_name" content="WF-Studio"/);
    assert.match(html, /class="logo" aria-label="WF-Studio"/);
    assert.doesNotMatch(html, /Sport Massage Fuengirola/);
    assert.match(html, />Agama</);
    assert.match(html, />Vokabellab</);
  }
});
