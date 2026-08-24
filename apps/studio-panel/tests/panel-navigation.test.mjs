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

test("admin shell marks only the most specific matching navigation route active", async () => {
  const shell = await readSource("src/components/layout/app-shell.tsx");

  assert.match(
    shell,
    /const activeHref = getActiveNavHref\(currentPath, navGroups\)/,
  );
  assert.equal((shell.match(/activeHref === item\.href/g) ?? []).length, 2);
  assert.equal(
    (shell.match(/currentPath\.startsWith\(item\.href \+ '\/'\)/g) ?? [])
      .length,
    1,
  );
});

test("dashboard connected-panel copy uses locale keys", async () => {
  const [dashboard, translations] = await Promise.all([
    readSource("src/app/paneladmin/(protected)/dashboard/page.tsx"),
    readSource("src/lib/i18n.ts"),
  ]);

  for (const key of [
    "dashboard.panels.title",
    "dashboard.panels.description",
    "dashboard.panels.marketplace",
    "dashboard.panels.todoPlastico.description",
    "dashboard.panels.enter",
  ]) {
    assert.match(
      dashboard,
      new RegExp(`t\\(locale, '${key.replaceAll(".", "\\.")}'\\)`),
    );
    assert.match(translations, new RegExp(`'${key.replaceAll(".", "\\.")}'`));
  }
});

test("subscription revenue preserves cents in both platform panels", async () => {
  for (const file of [
    "src/app/paneladmin/(protected)/vivir-en-fuengirola/suscripciones/page.tsx",
    "src/app/paneladmin/(protected)/conoce-fuengirola/suscripciones/page.tsx",
  ]) {
    const source = await readSource(file);
    assert.match(source, /toFixed\(2\)/);
    assert.doesNotMatch(source, /monthlyRevenue\.toFixed\(0\)/);
  }
});

test("approved unpublished trainers receive a localized status", async () => {
  const source = await readSource(
    "src/app/paneladmin/(protected)/superentrenador/pt/page.tsx",
  );

  assert.match(
    source,
    /if \(status === 'approved'\) return 'Aprobado sin publicar'/,
  );
  assert.match(
    source,
    /if \(status === 'approved'\) return 'bg-sky-50 text-sky-700'/,
  );
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
