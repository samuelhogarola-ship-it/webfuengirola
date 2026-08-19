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
      /try\s*\{/u,
      `${page} should catch integration failures`,
    );
    assert.match(
      source,
      /ConnectionIssueCard/u,
      `${page} should render a connection issue card`,
    );
  }
});

test("Der Die Das percentage display guards against empty vocabularies", async () => {
  const source = await readSource(
    "src/app/paneladmin/(protected)/vokabel-world/derdiedas/page.tsx",
  );
  assert.match(source, /data\?\.total/u);
  assert.doesNotMatch(source, /data\.byArticle\[art\] \/ data\.total/u);
});
