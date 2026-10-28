import assert from "node:assert/strict";
import test from "node:test";

import { convertEurPrice, priceForMarket } from "../lib/market-pricing.mjs";

const snapshot = {
  base: "EUR",
  date: "2026-10-27",
  rates: {
    USD: 1.115,
    MXN: 20.78,
    BRL: 5.9624,
  },
};

test("Mexico prices preserve exact calculation and round upward by 100 MXN", () => {
  const cases = [
    { eurAmount: 200, exact: 4363.8, display: 4400 },
    { eurAmount: 350, exact: 7636.65, display: 7700 },
    { eurAmount: 600, exact: 13091.4, display: 13100 },
  ];

  for (const expected of cases) {
    assert.deepEqual(
      priceForMarket({
        eurAmount: expected.eurAmount,
        marketKey: "mexico",
        snapshot,
      }),
      {
        currency: "MXN",
        rate: 20.78,
        rateDate: "2026-10-27",
        exact: expected.exact,
        display: expected.display,
      },
    );
  }
});

test("the shared conversion helper applies each market rounding increment", () => {
  const eurPrices = [200, 350, 600];

  assert.deepEqual(
    eurPrices.map((eurAmount) =>
      convertEurPrice({ eurAmount, rate: 1.115, increment: 5 }),
    ),
    [
      { exact: 234.15, display: 235 },
      { exact: 409.7625, display: 410 },
      { exact: 702.45, display: 705 },
    ],
  );

  assert.deepEqual(
    eurPrices.map((eurAmount) =>
      convertEurPrice({ eurAmount, rate: 5.9624, increment: 10 }),
    ),
    [
      { exact: 1252.104, display: 1260 },
      { exact: 2191.182, display: 2200 },
      { exact: 3756.312, display: 3760 },
    ],
  );
});

test("the conversion markup defaults to five percent and can be explicit", () => {
  assert.deepEqual(
    convertEurPrice({ eurAmount: 100, rate: 2, increment: 10 }),
    { exact: 210, display: 210 },
  );
  assert.deepEqual(
    convertEurPrice({
      eurAmount: 100,
      rate: 2,
      increment: 10,
      markup: 0.1,
    }),
    { exact: 220, display: 220 },
  );
});

test("invalid amounts, rates and increments are rejected", () => {
  for (const eurAmount of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.throws(
      () => convertEurPrice({ eurAmount, rate: 1, increment: 1 }),
      /eurAmount must be a positive finite number/,
    );
  }

  for (const rate of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.throws(
      () => convertEurPrice({ eurAmount: 1, rate, increment: 1 }),
      /rate must be a positive finite number/,
    );
  }

  for (const increment of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.throws(
      () => convertEurPrice({ eurAmount: 1, rate: 1, increment }),
      /increment must be a positive finite number/,
    );
  }
});

test("a missing market currency rate never falls back to euros", () => {
  assert.throws(
    () =>
      priceForMarket({
        eurAmount: 200,
        marketKey: "mexico",
        snapshot: { base: "EUR", date: "2026-10-27", rates: {} },
      }),
    /Missing valid MXN exchange rate/,
  );
});
