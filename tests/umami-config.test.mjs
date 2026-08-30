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
