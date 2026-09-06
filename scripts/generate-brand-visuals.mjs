import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { chromium } from "@playwright/test";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tmpDir = path.join(rootDir, "tmp", "brand-visuals");
const cwebp = fs.existsSync("/opt/homebrew/bin/cwebp") ? "/opt/homebrew/bin/cwebp" : "cwebp";
const visuals = [
  ["blog/og-blog-home.html", "img/blog-home-og.webp"],
  ["blog/og-web-2026.html", "img/blog-web-2026-og.webp"],
  ["blog/og-ia-servicios.html", "img/blog-ia-servicios-og.webp"],
];

fs.mkdirSync(tmpDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

for (const [source, output] of visuals) {
  const sourcePath = path.join(rootDir, source);
  const pngPath = path.join(tmpDir, `${path.basename(source, ".html")}.png`);
  const outputPath = path.join(rootDir, output);

  await page.goto(pathToFileURL(sourcePath).href, { waitUntil: "load" });
  await page.screenshot({ path: pngPath, type: "png", fullPage: false });
  execFileSync(cwebp, ["-quiet", "-q", "86", pngPath, "-o", outputPath]);
  console.log(`Generated ${output}`);
}

await browser.close();
