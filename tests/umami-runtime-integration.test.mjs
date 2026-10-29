import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const runtimeSource = fs.readFileSync(
  path.join(root, "umami-analytics-core.js"),
  "utf8",
);
const analyticsProfile = JSON.parse(
  fs.readFileSync(path.join(root, "analytics-profile.json"), "utf8"),
);

function createBrowser(pathname) {
  const scripts = [];
  const listeners = new Map();
  const document = {
    documentElement: { lang: "es" },
    visibilityState: "visible",
    head: {
      appendChild(script) {
        scripts.push(script);
      },
    },
    createElement() {
      return {
        dataset: {},
        addEventListener(name, callback) {
          this[`on${name}`] = callback;
        },
        remove() {},
      };
    },
    querySelector: () => scripts[0] || null,
    addEventListener(name, callback) {
      listeners.set(name, [...(listeners.get(name) || []), callback]);
    },
    removeEventListener(name, callback) {
      listeners.set(
        name,
        (listeners.get(name) || []).filter((item) => item !== callback),
      );
    },
  };
  const window = {
    document,
    location: {
      pathname,
      href: `https://www.webfuengirola.com${pathname}`,
      origin: "https://www.webfuengirola.com",
    },
    setInterval: () => 1,
    clearInterval() {},
  };
  vm.runInNewContext(runtimeSource, {
    window,
    document,
    URL,
    Date,
    console,
  });
  return {
    window,
    listeners,
    dispatch(name, event) {
      for (const callback of listeners.get(name) || []) callback(event);
    },
  };
}

function initialize(pathname) {
  const browser = createBrowser(pathname);
  const calls = [];
  browser.window.umami = { track: (...args) => calls.push(args) };
  browser.window.UmamiAnalyticsCore.init({
    websiteId: "11111111-2222-4333-8444-555555555555",
    scriptSrc: "https://stats.example.com/script.js",
    profile: analyticsProfile,
  });
  return { ...browser, calls };
}

test("the profile classifies representative content languages and business sections", () => {
  const cases = [
    ["/", "es", "home"],
    ["/en/blog/example/", "en", "blog"],
    ["/de/referenzen/projekt/", "de", "portfolio"],
    ["/fi/asiakastyot/projekti/", "fi", "portfolio"],
    ["/fi/blog/artikkeli/", "fi", "blog"],
    ["/fi/verkkosivut-klinikoille-fuengirola/", "fi", "services"],
    ["/web-solidaria/", "es", "solidarity"],
  ];

  for (const [pathname, contentLanguage, section] of cases) {
    const { window, calls } = initialize(pathname);
    window.WFAnalytics.trackEvent("language_switch", { targetLanguage: "en" });
    assert.equal(calls[0][1].contentLanguage, contentLanguage, pathname);
    assert.equal(calls[0][1].section, section, pathname);
  }
});

test("every current commercial, form, and engagement event is allowlisted", () => {
  const allowed = new Set(analyticsProfile.allowedEvents.map(({ key }) => key));
  for (const eventName of [
    "language_switch",
    "market_switch",
    "tier_select",
    "quote_click",
    "audit_click",
    "whatsapp_click",
    "blog_to_landing",
    "email_click",
    "phone_click",
    "form_start",
    "form_submit",
    "form_error",
    "audit_request",
    "engagement_15s",
    "engagement_30s",
    "engagement_60s",
    "engagement_120s",
  ]) {
    assert.equal(allowed.has(eventName), true, eventName);
  }
});

test("the compatibility alias sends context without form PII", () => {
  const { window, calls } = initialize("/en/contact/");
  assert.equal(window.WFAnalytics, window.UmamiAnalyticsCore);
  window.WFAnalytics.trackEvent("form_start", {
    market: "spain",
    form: "contact",
    name: "Private name",
    email: "private@example.com",
    phone: "+34 600 000 000",
    message: "Private message",
  });
  const payload = calls[0][1];
  assert.equal(payload.market, "spain");
  assert.equal(payload.form, "contact");
  for (const forbidden of ["name", "email", "phone", "message"]) {
    assert.equal(forbidden in payload, false, forbidden);
  }
});

test("Área cliente destinations remain outside click instrumentation", () => {
  const browser = initialize("/en/blog/example/");
  browser.window.UmamiAnalyticsCore.bindAutoEvents({
    inferEvent: () => ({ name: "quote_click", data: { market: "spain" } }),
  });
  const portal = {
    dataset: {},
    href: "https://portal.webfuengirola.com/acceso",
    closest: () => portal,
  };
  browser.dispatch("click", { target: portal });
  assert.equal(browser.calls.length, 0);
});
