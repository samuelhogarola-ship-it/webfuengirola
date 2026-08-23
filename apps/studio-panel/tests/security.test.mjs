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
  assert.doesNotMatch(source, /searchParams\.get\(["']secret["']\)/);
  assert.match(
    source,
    /idempotencyKey: `wf-pending-\$\{item\.id\}-\$\{item\.next_reminder_at\}`/,
  );
  assert.match(source, /cron_not_configured|Cron secret/);
});

test("marking a message as read is scoped to the authenticated client", async () => {
  const { readFile } = await import("node:fs/promises");
  const { fileURLToPath } = await import("node:url");
  const path = await import("node:path");
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const source = await readFile(
    path.join(__dirname, "../src/lib/actions/messages.ts"),
    "utf8",
  );

  assert.match(source, /const identity = await requireClientAccess\(\)/);
  assert.match(source, /\.eq\('client_id', identity\.client\.id\)/);
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
  assert.match(
    source,
    /userError\?\.message\.includes\('Auth session missing'\)/,
  );
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

test("client editing and direct portal access cannot cross projects", async () => {
  const { readFile } = await import("node:fs/promises");
  const { fileURLToPath } = await import("node:url");
  const path = await import("node:path");
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const [formSource, actionSource, dataSource] = await Promise.all([
    readFile(
      path.join(__dirname, "../src/components/admin/client-form.tsx"),
      "utf8",
    ),
    readFile(path.join(__dirname, "../src/lib/actions/admin.ts"), "utf8"),
    readFile(path.join(__dirname, "../src/lib/data/admin.ts"), "utf8"),
  ]);

  assert.match(formSource, /!editingClient && project === 'wf-studio'/);
  assert.match(actionSource, /project: z\.literal\('wf-studio'\)/);
  assert.match(actionSource, /\.eq\('project', payload\.project\)/);
  assert.match(dataSource, /\.eq\('id', editingId\)\.eq\('project', project\)/);
});

test("auth callback handles Supabase exchange errors returned as data", async () => {
  const { readFile } = await import("node:fs/promises");
  const { fileURLToPath } = await import("node:url");
  const path = await import("node:path");
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const source = await readFile(
    path.join(__dirname, "../src/app/auth/callback/route.ts"),
    "utf8",
  );

  assert.match(
    source,
    /const \{ error \} = await supabase\.auth\.exchangeCodeForSession\(code\)/,
  );
  assert.match(source, /if \(error\) throw error/);
});
