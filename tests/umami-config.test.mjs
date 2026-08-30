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

test("usa el website ID público de webfuengirola como fallback de producción", () => {
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

    assert.deepEqual(JSON.parse(readFileSync(output, "utf8")), {
      scriptSrc: "https://analytics.187.124.55.36.sslip.io/script.js",
      hostUrl: "https://analytics.187.124.55.36.sslip.io",
      websiteId: "957c045f-c060-4429-91d7-d2a1d1962ad5",
    });
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
            UMAMI_CONFIG_OUTPUT: path.join(temporaryDirectory, "umami-config.json"),
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
