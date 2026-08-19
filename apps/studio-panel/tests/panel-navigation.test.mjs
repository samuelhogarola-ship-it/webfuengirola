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

test("WF dashboard exposes a visible TodoPlastico shortcut", async () => {
  const source = await readSource(
    "src/app/paneladmin/(protected)/dashboard/page.tsx",
  );

  assert.match(source, /TodoPl[aá]stico/);
  assert.match(source, /\/paneladmin\/todoplastico/);
});

test("admin shell and launcher expose every platform panel", async () => {
  const shell = await readSource("src/components/layout/app-shell.tsx");
  const launcher = await readSource(
    "src/app/paneladmin/(protected)/inicio/page.tsx",
  );

  for (const route of [
    "/paneladmin/dashboard",
    "/paneladmin/vivir-en-fuengirola",
    "/paneladmin/conoce-fuengirola",
    "/paneladmin/samuel-coach",
    "/paneladmin/vokabel-world",
    "/paneladmin/vokabel-world/usuarios",
    "/paneladmin/superentrenador/pt",
    "/paneladmin/todoplastico",
  ]) {
    assert.match(shell, new RegExp(route.replaceAll("/", "\\/")));
    assert.match(launcher, new RegExp(route.replaceAll("/", "\\/")));
  }
});

test("Superentrenador PT panel includes native trainer moderation", async () => {
  const source = await readSource(
    "src/app/paneladmin/(protected)/superentrenador/pt/page.tsx",
  );

  assert.match(source, /approveTrainerAction/);
  assert.match(source, /rejectTrainerAction/);
  assert.match(source, /trainer_profiles|trainersData\.trainers/);
});

test("Vivir and Conoce subscription pages include direct subscription management", async () => {
  for (const file of [
    "src/app/paneladmin/(protected)/vivir-en-fuengirola/suscripciones/page.tsx",
    "src/app/paneladmin/(protected)/conoce-fuengirola/suscripciones/page.tsx",
  ]) {
    const source = await readSource(file);
    assert.match(source, /PackForm/);
    assert.match(source, /togglePackPaidAction/);
    assert.match(source, /togglePackStatusAction/);
  }
});
