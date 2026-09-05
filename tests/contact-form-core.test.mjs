import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const {
  composeMessage,
  eventForForm,
  isEmail,
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

test("an audit requires URL, sector, location, consent and anti-spam token", () => {
  for (const field of ["auditUrl", "sector", "location", "consent", "token"]) {
    const data = { ...validAudit, [field]: field === "consent" ? false : "" };
    assert.equal(validate(data, "audit", "en").ok, false, field);
  }
  assert.deepEqual(validate(validAudit, "audit", "en"), { ok: true });
});

test("composes audit details into the compatible message payload", () => {
  assert.equal(
    composeMessage(validAudit, "audit"),
    "[Website audit] URL: https://example.com | Sector: Restaurante | Location: Fuengirola | Problem: La web no recibe reservas directas.",
  );
  assert.equal(composeMessage({ message: "Necesito una web" }, "contact"), "Necesito una web");
});

test("uses stable analytics event names", () => {
  assert.equal(eventForForm("audit", "start"), "form_start");
  assert.equal(eventForForm("audit", "success"), "audit_request");
  assert.equal(eventForForm("contact", "success"), "form_submit");
});
