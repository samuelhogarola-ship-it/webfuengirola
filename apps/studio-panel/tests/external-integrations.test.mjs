import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");

async function readSource(filePath) {
  return readFile(path.join(appRoot, filePath), "utf8");
}

test("external platform pages render a connection fallback instead of crashing", async () => {
  const pages = [
    "src/app/paneladmin/(protected)/samuel-coach/page.tsx",
    "src/app/paneladmin/(protected)/samuel-coach/alumnos/page.tsx",
    "src/app/paneladmin/(protected)/samuel-coach/ejercicios/page.tsx",
    "src/app/paneladmin/(protected)/samuel-coach/progreso/page.tsx",
    "src/app/paneladmin/(protected)/vokabel-world/page.tsx",
    "src/app/paneladmin/(protected)/vokabel-world/usuarios/page.tsx",
    "src/app/paneladmin/(protected)/vokabel-world/vokabel-lab/page.tsx",
    "src/app/paneladmin/(protected)/vokabel-world/imkontext/page.tsx",
    "src/app/paneladmin/(protected)/vokabel-world/derdiedas/page.tsx",
    "src/app/paneladmin/(protected)/superentrenador/pt/page.tsx",
    "src/app/paneladmin/(protected)/superentrenador/usuarios/page.tsx",
  ];

  for (const page of pages) {
    const source = await readSource(page);
    assert.match(
      source,
      /loadIntegrationData/u,
      `${page} should use the runtime-tested integration fallback`,
    );
    assert.match(
      source,
      /ConnectionIssueCard/u,
      `${page} should render a connection issue card`,
    );
  }
});

test("Der Die Das percentage display uses the runtime-safe percentage helper", async () => {
  const source = await readSource(
    "src/app/paneladmin/(protected)/vokabel-world/derdiedas/page.tsx",
  );
  assert.match(
    source,
    /safePercentage\(data\?\.byArticle\[art\] \?\? 0, data\?\.total \?\? 0\)/u,
  );
});

test("TodoPlastico clamps stale pages without recursively reloading all KPIs", async () => {
  const source = await readSource("src/lib/data/todoplastico.ts");
  assert.doesNotMatch(source, /return getTodoPlasticoData\(/u);
  assert.match(source, /getPaginationRange/u);
  assert.match(source, /selectedCountResult/u);
});

test("premium failure state reuses the shared connection card", async () => {
  const source = await readSource(
    "src/app/paneladmin/(protected)/samuel-coach/premium/page.tsx",
  );
  assert.match(source, /ConnectionIssueCard/u);
  assert.doesNotMatch(source, /border-amber-200 bg-amber-50/u);
});

test("panel README links remain portable across checkouts", async () => {
  const source = await readSource("README.md");
  assert.match(source, /ADMIN_PANEL_AUDIT\.md`?\]\(ADMIN_PANEL_AUDIT\.md\)/u);
  assert.doesNotMatch(source, /\/Users\/sam\//u);
});
