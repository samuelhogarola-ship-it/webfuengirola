import assert from "node:assert/strict";
import test from "node:test";

import { getPageGroup } from "../data/commercial-pages-data.mjs";
import { getMarketPage } from "../data/market-pages-data.mjs";
import { renderCommercialPage } from "../scripts/build-commercial-pages.mjs";
import { renderMarketPage } from "../scripts/build-market-pages.mjs";
import {
  normalizeSiteHeader,
  resolveMarketRoute,
  renderMarketSelector,
  renderSiteHeader,
} from "../scripts/site-navigation.mjs";

const snapshot = {
  base: "EUR",
  date: "2026-10-27",
  rates: { USD: 1.115, MXN: 20.78, BRL: 5.9624 },
};

test("market routes preserve a compatible source language or use the market default", () => {
  const expectations = {
    "es-ES": {
      spain: "/",
      mexico: "/mexico/",
      usa: "/usa/es/",
      brasil: "/brasil/",
    },
    "en-GB": {
      spain: "/en/",
      mexico: "/mexico/en/",
      usa: "/usa/",
      brasil: "/brasil/",
    },
    "de-DE": {
      spain: "/de/",
      mexico: "/mexico/",
      usa: "/usa/",
      brasil: "/brasil/",
    },
    "fi-FI": {
      spain: "/fi/",
      mexico: "/mexico/",
      usa: "/usa/",
      brasil: "/brasil/",
    },
    "pt-BR": {
      spain: "/",
      mexico: "/mexico/",
      usa: "/usa/",
      brasil: "/brasil/",
    },
  };

  for (const [sourceLocale, routes] of Object.entries(expectations)) {
    for (const [targetMarket, route] of Object.entries(routes)) {
      assert.equal(
        resolveMarketRoute({ targetMarket, sourceLocale }),
        route,
        `${sourceLocale} -> ${targetMarket}`,
      );
    }
  }
});

test("the market selector exposes all four published identities", () => {
  const html = renderMarketSelector({
    currentMarket: "spain",
    localeCode: "es-ES",
  });

  assert.match(html, /class="market-menu"/);
  assert.match(html, /href="\/"[^>]*aria-current="page"[^>]*>España/);
  assert.match(html, /href="\/mexico\/"[^>]*>México/);
  assert.match(html, /href="\/usa\/es\/"[^>]*>USA/);
  assert.match(html, /href="\/brasil\/"[^>]*>Brasil/);
  assert.match(html, /data-analytics-event="market_switch"/);
  assert.match(html, /data-analytics-market="spain"/);
  assert.match(html, /data-analytics-target-market="mexico"/);
});

test("an English Mexico selector keeps English where the destination supports it", () => {
  const html = renderMarketSelector({
    currentMarket: "mexico",
    localeCode: "en-MX",
  });

  assert.match(html, /href="\/en\/"[^>]*>España/);
  assert.match(html, /href="\/mexico\/en\/"[^>]*aria-current="page"/);
  assert.match(html, /href="\/usa\/"[^>]*>USA/);
  assert.match(html, /href="\/brasil\/"[^>]*>Brasil/);
});

test("Mexico language links stay inside the Mexico market", () => {
  const html = renderMarketPage(getMarketPage("mexico", "en-MX"), snapshot);
  const languageMenu = html.match(
    /<details class="language-menu">[\s\S]*?<\/details>/,
  )?.[0];

  assert.ok(languageMenu);
  assert.match(languageMenu, /href="\/mexico\/" hreflang="es-MX"/);
  assert.match(languageMenu, /href="\/mexico\/en\/" hreflang="en-MX"/);
  assert.doesNotMatch(languageMenu, /href="\/(?:en|de|fi)\/"/);
});

test("generated Spain and Mexico pages embed the selector with the current market", () => {
  const spain = renderCommercialPage(getPageGroup("design"), "es");
  const mexico = renderMarketPage(getMarketPage("mexico", "es-MX"), snapshot);

  assert.match(
    spain,
    /<details class="market-menu">[\s\S]*?href="\/" aria-current="page"/,
  );
  assert.match(
    mexico,
    /<details class="market-menu">[\s\S]*?href="\/mexico\/" aria-current="page"/,
  );
});

test("the shared header is backward-compatible when no market menu is supplied", () => {
  const header = renderSiteHeader({ locale: "es", pathname: "/" });

  assert.match(header, /aria-label="Navegación principal"/);
  assert.match(header, /<details class="language-menu">/);
  assert.doesNotMatch(header, /class="market-menu"/);
});

test("normalizing a regional English page keeps the English navigation", () => {
  const header = renderSiteHeader({
    locale: "en",
    pathname: "/mexico/en/",
  });
  const html = `<!doctype html><html lang="en-MX"><body>${header}</body></html>`;

  const normalized = normalizeSiteHeader(html, "/mexico/en/");

  assert.match(normalized, /aria-label="Main navigation"/);
  assert.match(normalized, />Home<\/a>/);
  assert.doesNotMatch(normalized, /aria-label="Navegación principal"/);
});
