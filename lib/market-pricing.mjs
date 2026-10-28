import { getMarket } from "../data/markets-data.mjs";

function requirePositiveFinite(value, name) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive finite number`);
  }
}

function requireMarkup(markup) {
  if (!Number.isFinite(markup) || markup < 0) {
    throw new TypeError("markup must be a non-negative finite number");
  }
}

export function convertEurPrice({ eurAmount, rate, increment, markup = 0.05 }) {
  requirePositiveFinite(eurAmount, "eurAmount");
  requirePositiveFinite(rate, "rate");
  requirePositiveFinite(increment, "increment");
  requireMarkup(markup);

  const exact = Number((eurAmount * rate * (1 + markup)).toFixed(8));
  const display = Math.ceil(exact / increment) * increment;

  return { exact, display };
}

export function priceForMarket({ eurAmount, marketKey, snapshot }) {
  const market = getMarket(marketKey);
  const rate =
    market.currency === "EUR" ? 1 : snapshot?.rates?.[market.currency];

  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error(`Missing valid ${market.currency} exchange rate`);
  }

  if (snapshot?.base !== "EUR") {
    throw new Error("Exchange-rate snapshot must use EUR as its base");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(snapshot?.date ?? "")) {
    throw new Error("Exchange-rate snapshot must include a YYYY-MM-DD date");
  }

  const converted = convertEurPrice({
    eurAmount,
    rate,
    increment: market.roundingIncrement,
  });

  return {
    currency: market.currency,
    rate,
    rateDate: snapshot.date,
    ...converted,
  };
}
