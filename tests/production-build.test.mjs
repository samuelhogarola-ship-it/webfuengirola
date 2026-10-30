import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("the production blog build does not require a Playwright browser", () => {
  const isolatedProject = fs.mkdtempSync(
    path.join(os.tmpdir(), "wf-production-blog-build-"),
  );
  const emptyBrowserCache = fs.mkdtempSync(
    path.join(os.tmpdir(), "wf-empty-playwright-cache-"),
  );

  try {
    fs.copyFileSync(
      path.join(root, "package.json"),
      path.join(isolatedProject, "package.json"),
    );
    for (const directory of ["blog", "data", "scripts"]) {
      fs.cpSync(
        path.join(root, directory),
        path.join(isolatedProject, directory),
        {
          recursive: true,
        },
      );
    }

    const result = spawnSync("npm", ["run", "build:blog"], {
      cwd: isolatedProject,
      encoding: "utf8",
      env: {
        ...process.env,
        PLAYWRIGHT_BROWSERS_PATH: emptyBrowserCache,
      },
    });

    assert.equal(
      result.status,
      0,
      `build:blog must use the committed cover assets instead of launching Playwright:\n${result.stdout}\n${result.stderr}`,
    );
  } finally {
    fs.rmSync(isolatedProject, { recursive: true, force: true });
    fs.rmSync(emptyBrowserCache, { recursive: true, force: true });
  }
});
