import test from "node:test";
import assert from "node:assert/strict";

import {
  buildCanonicalAppUrl,
  getProtectedArea,
  resolveRequestOrigin,
  sanitizeInternalRedirect,
} from "../src/lib/security/redirects.mjs";

test("sanitizeInternalRedirect keeps valid internal client routes", () => {
  assert.equal(
    sanitizeInternalRedirect("/cliente/dashboard?tab=recibidos", {
      fallback: "/cliente/dashboard",
    }),
    "/cliente/dashboard?tab=recibidos",
  );
});

test("sanitizeInternalRedirect rejects external redirects", () => {
  assert.equal(
    sanitizeInternalRedirect("https://evil.example/phish", {
      fallback: "/cliente/dashboard",
    }),
    "/cliente/dashboard",
  );
});

test("buildCanonicalAppUrl always uses configured origin", () => {
  assert.equal(
    buildCanonicalAppUrl(
      "https://admin.webfuengirola.com",
      "/auth/callback?next=%2Fcliente%2Fdashboard",
    ).toString(),
    "https://admin.webfuengirola.com/auth/callback?next=%2Fcliente%2Fdashboard",
  );
});

test("resolveRequestOrigin prefers forwarded host over fallback origin", () => {
  assert.equal(
    resolveRequestOrigin({
      forwardedHost: "portal.webfuengirola.com",
      forwardedProto: "https",
      requestOrigin: "http://localhost:3000",
      fallbackOrigin: "https://admin.webfuengirola.com",
    }),
    "https://portal.webfuengirola.com",
  );
});

test("resolveRequestOrigin falls back to configured origin when proxy headers are missing", () => {
  assert.equal(
    resolveRequestOrigin({
      forwardedHost: null,
      forwardedProto: null,
      requestOrigin: "http://localhost:3000",
      fallbackOrigin: "https://portal.webfuengirola.com",
    }),
    "https://portal.webfuengirola.com",
  );
});

test("getProtectedArea marks admin routes as protected", () => {
  assert.equal(
    getProtectedArea("/paneladmin/vivir-en-fuengirola/clientes"),
    "admin",
  );
});

test("getProtectedArea marks client routes as protected except public entrypoints", () => {
  assert.equal(getProtectedArea("/cliente/servicios"), "client");
  assert.equal(getProtectedArea("/cliente/registro"), null);
});

test("pending reminders cron requires an explicit secret in production", async () => {
  const { readFile } = await import("node:fs/promises");
  const { fileURLToPath } = await import("node:url");
  const path = await import("node:path");
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const source = await readFile(
    path.join(__dirname, "../src/app/api/pending-reminders/route.ts"),
    "utf8",
  );

  assert.doesNotMatch(source, /if \(!configuredSecret\) return true/);
  assert.match(source, /cron_not_configured|Cron secret/);
});

test("Samuel Coach premium codes are managed server-side inside the admin shell", async () => {
  const { readFile } = await import("node:fs/promises");
  const { fileURLToPath } = await import("node:url");
  const path = await import("node:path");
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const source = await readFile(
    path.join(
      __dirname,
      "../src/app/paneladmin/(protected)/samuel-coach/premium/page.tsx",
    ),
    "utf8",
  );

  assert.doesNotMatch(source, /'use client'/);
  assert.doesNotMatch(source, /@supabase\/supabase-js/);
  assert.doesNotMatch(source, /hocdlmxzghwymamientc/);
  assert.match(source, /AdminShell/);
  assert.match(source, /generatePremiumCodeAction/);
});

test("client access resolves the wf-studio client by auth user id", async () => {
  const { readFile } = await import("node:fs/promises");
  const { fileURLToPath } = await import("node:url");
  const path = await import("node:path");
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const source = await readFile(
    path.join(__dirname, "../src/lib/auth.ts"),
    "utf8",
  );

  assert.match(source, /\.eq\('project', CLIENT_PROJECT\)/);
  assert.match(source, /\.eq\('auth_user_id', identity\.userId\)/);
  assert.doesNotMatch(source, /\.ilike\('email', normalizedEmail\)/);
});

test("direct client creation stores the auth user relationship", async () => {
  const { readFile } = await import("node:fs/promises");
  const { fileURLToPath } = await import("node:url");
  const path = await import("node:path");
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const source = await readFile(
    path.join(__dirname, "../src/lib/actions/admin.ts"),
    "utf8",
  );

  assert.match(source, /auth_user_id:\s*authUser\.user\.id/);
  assert.match(source, /select\('email, auth_user_id'\)/);
  assert.match(source, /updateUserById\(currentClient\.auth_user_id/);
  assert.doesNotMatch(source, /ilike\('email', currentClient\.email\)/);
});
