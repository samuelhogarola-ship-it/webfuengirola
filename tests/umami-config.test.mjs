import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const renderer = path.join(repositoryRoot, "scripts", "render-umami-config.sh");
const template = path.join(
  repositoryRoot,
  "config",
  "umami-config.template.json",
);

test("renderiza la configuración pública de Umami desde el entorno", () => {
  const temporaryDirectory = mkdtempSync(
    path.join(os.tmpdir(), "webfuengirola-umami-"),
  );
  const output = path.join(temporaryDirectory, "umami-config.json");

  try {
    execFileSync("/bin/sh", [renderer], {
      cwd: repositoryRoot,
      env: {
        ...process.env,
        UMAMI_CONFIG_TEMPLATE: template,
        UMAMI_CONFIG_OUTPUT: output,
        UMAMI_SCRIPT_URL: "https://analytics.187.124.55.36.sslip.io/script.js",
        UMAMI_HOST_URL: "https://analytics.187.124.55.36.sslip.io",
        UMAMI_WEBSITE_ID: "webfuengirola-production-id",
      },
      stdio: "pipe",
    });

    assert.deepEqual(JSON.parse(readFileSync(output, "utf8")), {
      scriptSrc: "https://analytics.187.124.55.36.sslip.io/script.js",
      hostUrl: "https://analytics.187.124.55.36.sslip.io",
      websiteId: "webfuengirola-production-id",
    });
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});

test("sin website ID explícito renderiza una configuración pública inerte", () => {
  const temporaryDirectory = mkdtempSync(
    path.join(os.tmpdir(), "webfuengirola-umami-"),
  );
  const output = path.join(temporaryDirectory, "umami-config.json");

  try {
    execFileSync("/bin/sh", [renderer], {
      cwd: repositoryRoot,
      env: {
        UMAMI_CONFIG_TEMPLATE: template,
        UMAMI_CONFIG_OUTPUT: output,
      },
      stdio: "pipe",
    });

    const rendered = JSON.parse(readFileSync(output, "utf8"));

    assert.deepEqual(rendered, {
      scriptSrc: "https://analytics.187.124.55.36.sslip.io/script.js",
      hostUrl: "https://analytics.187.124.55.36.sslip.io",
      websiteId: "",
    });
    assert.ok(
      !/957c045f-c060-4429-91d7-d2a1d1962ad5/.test(
        readFileSync(output, "utf8"),
      ),
    );
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});

test("rechaza un host de Umami distinto al VPS personal", () => {
  const temporaryDirectory = mkdtempSync(
    path.join(os.tmpdir(), "webfuengirola-umami-"),
  );

  try {
    assert.throws(
      () =>
        execFileSync("/bin/sh", [renderer], {
          cwd: repositoryRoot,
          env: {
            UMAMI_CONFIG_TEMPLATE: template,
            UMAMI_CONFIG_OUTPUT: path.join(
              temporaryDirectory,
              "umami-config.json",
            ),
            UMAMI_HOST_URL: "https://analytics.2.24.10.239.sslip.io",
          },
          stdio: "pipe",
        }),
      /Command failed/,
    );
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});

test("documenta el contrato portable y el inventario de webs sin IDs reales", () => {
  const runbook = readFileSync(
    path.join(repositoryRoot, "docs", "umami-integration-runbook.md"),
    "utf8",
  );

  for (const requiredText of [
    "Contrato portable",
    "Web publica estatica",
    "WF Studio / Next",
    "Checklist de verificacion",
    "Web Fuengirola",
    "TodoPlastico",
    "Horses of Gili",
    "Leigan",
    "Admin multi-web y vista cliente",
    "client_analytics_site_key",
    "/cliente/estadisticas",
    "Metrica minima util",
    "type=path",
    "totaltime",
    "type=country",
    "region",
    "pagesPerVisit",
  ]) {
    assert.match(runbook, new RegExp(requiredText));
  }

  assert.doesNotMatch(runbook, /957c045f-c060-4429-91d7-d2a1d1962ad5/);
});

test("documenta Web Fuengirola como modelo canonico de Umami extrapolable", () => {
  const guide = readFileSync(
    path.join(
      repositoryRoot,
      "docs",
      "deliveries",
      "2026-10-13-umami-canonical-model.md",
    ),
    "utf8",
  );

  for (const required of [
    "umami-analytics-core.js",
    "config/umami-config.template.json",
    "scripts/render-umami-config.sh",
    "UMAMI_PERSONAL_URL",
    "UMAMI_AGAMA_URL",
    "UMAMI_WEBSITE_ID_*",
    "STAT_REPORT_UMAMI_*",
    "PanelAnalyticsSection",
    "fetchAllUmamiPanelData",
    "crear y guardar el website ID",
    "visita de prueba",
    "Samuel Coach",
    "TodoPlástico",
  ]) {
    assert.match(guide, new RegExp(required.replaceAll("*", "\\*")));
  }

  assert.doesNotMatch(guide, /UMAMI_(?:PERSONAL|AGAMA)_PASSWORD=\S+/);
});
