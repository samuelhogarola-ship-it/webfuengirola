import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const {
  baseLocale,
  composeMessage,
  eventForForm,
  isEmail,
  localeMessages,
  messages,
  validate,
} = require("../contact-form-core.js");

const validAudit = {
  name: "Samuel",
  email: "samuel@example.com",
  auditUrl: "https://example.com",
  sector: "Restaurante",
  location: "Fuengirola",
  message: "La web no recibe reservas directas.",
  consent: true,
  token: "turnstile-token",
};

test("validates email without accepting incomplete addresses", () => {
  assert.equal(isEmail("samuel@example.com"), true);
  assert.equal(isEmail("samuel@"), false);
  assert.equal(isEmail("@example.com"), false);
});

test("provides localized validation messages", () => {
  assert.match(messages.es.email, /email válido/i);
  assert.match(messages.en.email, /valid email/i);
  assert.match(messages.de.email, /gültige E-Mail/i);
  assert.match(messages.fi.email, /kelvollinen sähköpostiosoite/i);
});

test("regional locales inherit the correct base-language messages", () => {
  assert.equal(baseLocale("es-MX"), "es");
  assert.equal(baseLocale("en-MX"), "en");
  assert.equal(baseLocale("pt-BR"), "pt");
  assert.equal(localeMessages("es-MX"), messages.es);
  assert.equal(localeMessages("en-MX"), messages.en);
  assert.equal(localeMessages("pt-BR"), messages.pt);
});

test("unsupported locales use the documented Spanish fallback", () => {
  assert.equal(baseLocale("zh-CN"), "es");
  assert.equal(baseLocale(""), "es");
  assert.equal(localeMessages("zh-CN"), messages.es);
  assert.doesNotThrow(() => localeMessages(undefined));
});

test("an audit requires URL, sector, location, consent and anti-spam token", () => {
  for (const field of ["auditUrl", "sector", "location", "consent", "token"]) {
    const data = { ...validAudit, [field]: field === "consent" ? false : "" };
    assert.equal(validate(data, "audit", "en").ok, false, field);
  }
  assert.deepEqual(validate(validAudit, "audit", "en"), { ok: true });
});

test("allows an audit without a token when the server disables Turnstile", () => {
  const auditWithoutToken = { ...validAudit, token: "" };
  assert.deepEqual(
    validate(auditWithoutToken, "audit", "es", { requireToken: false }),
    { ok: true },
  );
});

test("composes audit details into the compatible message payload", () => {
  assert.equal(
    composeMessage(validAudit, "audit"),
    "[Website audit] URL: https://example.com | Sector: Restaurante | Location: Fuengirola | Problem: La web no recibe reservas directas.",
  );
  assert.equal(
    composeMessage({ message: "Necesito una web" }, "contact"),
    "Necesito una web",
  );
});

test("uses stable analytics event names", () => {
  assert.equal(eventForForm("audit", "start"), "form_start");
  assert.equal(eventForForm("audit", "success"), "audit_request");
  assert.equal(eventForForm("contact", "success"), "form_submit");
});
