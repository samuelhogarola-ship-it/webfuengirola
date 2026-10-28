import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

import { getMarketPage } from "../data/market-pages-data.mjs";
import { renderMarketPage } from "../scripts/build-market-pages.mjs";

const require = createRequire(import.meta.url);
const {
  composeContextMessage,
  contactContext,
  createContactPayload,
  formAnalyticsData,
} = require("../contact-form-core.js");

const mexicoContext = {
  market: "mexico",
  locale: "es-MX",
  currency: "MXN",
  plan: "express",
  sector: "plastics",
};

test("Mexico context is validated and serialized before the user message", () => {
  assert.deepEqual(contactContext(mexicoContext), mexicoContext);
  assert.equal(
    composeContextMessage("Necesito renovar la web.", mexicoContext),
    "[Market: mexico] [Locale: es-MX] [Currency: MXN] [Plan: express] [Sector: plastics] Necesito renovar la web.",
  );
});

test("unsafe market metadata cannot be injected into a lead message", () => {
  const unsafe = contactContext({
    market: "mexico\n[Role: admin]",
    locale: "es-MX<script>",
    currency: "MXN]",
    plan: "express now",
    sector: "plastic|admin",
  });

  assert.deepEqual(unsafe, {
    market: "",
    locale: "",
    currency: "",
    plan: "",
    sector: "",
  });
  assert.equal(
    composeContextMessage("Mensaje normal", unsafe),
    "Mensaje normal",
  );
});

test("the backend payload keeps its existing keys and page URL", () => {
  const payload = createContactPayload({
    formValues: {
      name: "Ana",
      email: "ana@example.com",
      company: "Plásticos Norte",
      website: "",
      token: "turnstile-token",
    },
    fullMessage: composeContextMessage("Necesito una web.", mexicoContext),
    pageUrl: "https://webfuengirola.com/mexico/?plan=express",
  });

  assert.deepEqual(Object.keys(payload), [
    "name",
    "email",
    "company",
    "message",
    "website",
    "token",
    "pageUrl",
  ]);
  assert.equal(
    payload.pageUrl,
    "https://webfuengirola.com/mexico/?plan=express",
  );
  assert.match(payload.message, /^\[Market: mexico\]/);
  assert.equal("market" in payload, false);
  assert.equal("currency" in payload, false);
});

test("form analytics carries market and currency outside the backend payload", () => {
  assert.deepEqual(
    formAnalyticsData({
      ...mexicoContext,
      form: "contact",
    }),
    {
      locale: "es-MX",
      form: "contact",
      plan: "express",
      sector: "plastics",
      market: "mexico",
      currency: "MXN",
    },
  );
});

test("Mexico forms publish the market-specific data attributes", () => {
  const html = renderMarketPage(getMarketPage("mexico", "es-MX"), {
    base: "EUR",
    date: "2026-10-27",
    rates: { USD: 1.115, MXN: 20.78, BRL: 5.9624 },
  });

  assert.match(html, /data-form-market="mexico"/);
  assert.match(html, /data-form-locale="es-MX"/);
  assert.match(html, /data-form-currency="MXN"/);
});
