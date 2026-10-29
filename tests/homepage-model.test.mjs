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
    assert.equal(record.faqs.length, localeCode === "es-ES" ? 10 : 3);
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
    assert.doesNotMatch(html, /class="process/);
    assert.match(html, /class="whatsapp-fab"/);
    assert.match(html, /id="page-transition"/);
    assert.match(html, /class="market-menu"/);
    assert.match(html, /class="language-menu"/);
    assert.doesNotMatch(html, /commercial-page--home|commercial-hero/);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  }
});

test("Spain restores five real homepage cases without decorative numbering or cropped previews", () => {
  const html = renderHomepage(getHomepageRecord("spain", "es-ES"), snapshot);

  for (const slug of [
    "sport-massage-fuengirola",
    "agama",
    "suvilla",
    "samuel-coach-aleman",
    "vokabellab",
  ]) {
    assert.match(html, new RegExp(`href="/casos/${slug}/"`));
  }

  assert.equal((html.match(/class="case-showcase__item"/g) ?? []).length, 5);
  assert.doesNotMatch(html, /case-showcase__number">0[1-9]</);
  assert.match(html, /case-showcase__media--screen[^>]*>[\s\S]*sport-massage-landing\.png/);
  assert.match(html, /case-showcase__media--agama-main[^>]*>[\s\S]*agama-tienda-online\.png/);
  assert.match(html, /case-showcase__media--screen[^>]*>[\s\S]*suvilla-real\.webp/);
  assert.match(html, /href="\/casos\/"[^>]*>Ver todos los proyectos/);
});

test("every market homepage reuses the five-case reference layout and original WhatsApp icon", () => {
  for (const [marketKey, locale] of [
    ["spain", "es-ES"],
    ["mexico", "es-MX"],
    ["mexico", "en-MX"],
    ["usa", "en-US"],
    ["usa", "es-US"],
    ["brasil", "pt-BR"],
  ]) {
    const html = renderHomepage(getHomepageRecord(marketKey, locale), snapshot);
    assert.equal(
      (html.match(/class="case-showcase__item"/g) ?? []).length,
      5,
      `${marketKey}/${locale}`,
    );
    assert.doesNotMatch(html, /case-showcase__number">0[1-9]</);
    assert.match(html, /class="whatsapp-fab"[^>]*>[\s\S]*?<svg/);
    assert.doesNotMatch(html, />undefined</);
    assert.doesNotMatch(html, /<section class="process section"/);
    assert.match(html, /<section class="faq-home"/);
  }
});

test("Spain restores the original homepage FAQ treatment and removes the generic process block", () => {
  const record = getHomepageRecord("spain", "es-ES");
  const html = renderHomepage(record, snapshot);

  assert.equal(record.faqs.length, 10);
  assert.match(html, /<section class="faq-home"/);
  assert.match(html, /Todas tus dudas resueltas/);
  assert.equal((html.match(/class="faq-home__item"/g) ?? []).length, 10);
  assert.doesNotMatch(html, /<section class="process section"/);
  assert.doesNotMatch(html, /<div class="faq-list"/);
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
    ["mexico", "en-MX", "/en/case-studies/", "/mexico/en/#services"],
    ["usa", "en-US", "/en/case-studies/", "/usa/#services"],
    ["brasil", "pt-BR", "/casos/", "/brasil/#services"],
  ];

  for (const [market, locale, portfolioRoute, relatedServiceRoute] of cases) {
    const html = renderHomepage(getHomepageRecord(market, locale), snapshot);
    assert.match(html, new RegExp(`href="${portfolioRoute}"`));
    assert.match(html, new RegExp(`href="${relatedServiceRoute}"`));
  }
});

test("regional homepages use neutral WF-Studio branding and the shared real-case catalogue", () => {
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
    assert.match(html, /Sport Massage Fuengirola/);
    assert.match(html, />Agama</);
    assert.match(html, /SuVilla Inmobiliaria/);
    assert.match(html, /Samuel Coach Alemán/);
    assert.match(html, />Vokabellab</);
  }
});
