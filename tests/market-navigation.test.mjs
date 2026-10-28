import assert from "node:assert/strict";
import test from "node:test";

import { getPageGroup } from "../data/commercial-pages-data.mjs";
import { getMarketPage } from "../data/market-pages-data.mjs";
import { renderCommercialPage } from "../scripts/build-commercial-pages.mjs";
import { renderMarketPage } from "../scripts/build-market-pages.mjs";
import {
  normalizeSiteHeader,
  renderMarketSelector,
  renderSiteHeader,
} from "../scripts/site-navigation.mjs";

const snapshot = {
  base: "EUR",
  date: "2026-10-27",
  rates: { USD: 1.115, MXN: 20.78, BRL: 5.9624 },
};

test("the market selector exposes only published Spain and Mexico routes", () => {
  const html = renderMarketSelector({
    currentMarket: "spain",
    localeCode: "es-ES",
  });

  assert.match(html, /class="market-menu"/);
  assert.match(html, /href="\/"[^>]*aria-current="page"[^>]*>España/);
  assert.match(html, /href="\/mexico\/"[^>]*>México/);
  assert.doesNotMatch(html, /\/usa\/|\/brasil\/|>USA<|>Brasil</);
  assert.match(html, /data-analytics-event="market_switch"/);
  assert.match(html, /data-analytics-market="spain"/);
  assert.match(html, /data-analytics-target-market="mexico"/);
});

test("Mexico receives current state without exposing future markets", () => {
  const html = renderMarketSelector({
    currentMarket: "mexico",
    localeCode: "en-MX",
  });

  assert.match(html, /href="\/mexico\/"[^>]*aria-current="page"/);
  assert.doesNotMatch(html, /\/usa\/|\/brasil\//);
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
