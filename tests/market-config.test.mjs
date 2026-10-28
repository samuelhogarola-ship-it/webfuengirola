import assert from "node:assert/strict";
import test from "node:test";

import {
  getMarket,
  getMarketLocale,
  getPublishedMarkets,
  marketOrder,
  markets,
} from "../data/markets-data.mjs";

test("the registry exposes every planned market in its public order", () => {
  assert.deepEqual(marketOrder, ["spain", "mexico", "usa", "brasil"]);
  assert.deepEqual(Object.keys(markets), marketOrder);
});

test("only Spain and Mexico are publishable in the first phase", () => {
  assert.equal(getMarket("spain").published, true);
  assert.equal(getMarket("mexico").published, true);
  assert.equal(getMarket("usa").published, false);
  assert.equal(getMarket("brasil").published, false);
  assert.deepEqual(
    getPublishedMarkets().map(({ key }) => key),
    ["spain", "mexico"],
  );
});

test("Mexico keeps its regional locales, routes and MXN rounding contract", () => {
  const mexico = getMarket("mexico");

  assert.equal(mexico.primaryLocale, "es-MX");
  assert.equal(mexico.currency, "MXN");
  assert.equal(mexico.roundingIncrement, 100);
  assert.deepEqual(mexico.routes, {
    "es-MX": "/mexico/",
    "en-MX": "/mexico/en/",
  });
  assert.deepEqual(getMarketLocale("mexico", "en-MX"), {
    code: "en-MX",
    route: "/mexico/en/",
    label: "English",
  });
});

test("Spain preserves the four existing Fuengirola routes", () => {
  assert.deepEqual(getMarket("spain").routes, {
    "es-ES": "/",
    "en-GB": "/en/",
    "de-DE": "/de/",
    "fi-FI": "/fi/",
  });
});

test("configured routes never collide across markets or locales", () => {
  const routes = marketOrder.flatMap((marketKey) =>
    Object.values(getMarket(marketKey).routes),
  );

  assert.equal(new Set(routes).size, routes.length);
});

test("unknown market and locale lookups fail descriptively", () => {
  assert.throws(() => getMarket("canada"), /Unknown market: canada/);
  assert.throws(
    () => getMarketLocale("mexico", "fr-CA"),
    /Unknown locale fr-CA for market mexico/,
  );
});
