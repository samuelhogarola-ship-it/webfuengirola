const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const ignoredRoots = new Set([
  ".git",
  ".husky",
  ".tools",
  "apps",
  "madamebleuewatches-preview",
  "madamebleuewatches-preview-src",
  "node_modules",
  "portfolio",
  "testing",
]);

function htmlFiles(dir = root) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (dir === root && ignoredRoots.has(entry.name)) return [];
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(file);
    return entry.name.endsWith(".html") ? [file] : [];
  });
}

test("el sitemap coincide con todas las páginas canónicas indexables", () => {
  const expected = new Set();
  for (const file of htmlFiles()) {
    const html = fs.readFileSync(file, "utf8");
    if (
      /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(
        html,
      )
    )
      continue;
    const canonical = html.match(
      /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i,
    )?.[1];
    if (canonical?.startsWith("https://webfuengirola.com/"))
      expected.add(canonical);
  }

  const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  const actual = new Set(
    [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
  );
  expect(actual).toEqual(expected);
});

test("el blog no publica fechas futuras y usa imágenes WebP ligeras", () => {
  const today = new Date().toISOString().slice(0, 10);
  const campaign = fs.readFileSync(
    path.join(root, "scripts/build-blog-campaign.mjs"),
    "utf8",
  );
  const campaignImages = [
    ...new Set(
      [...campaign.matchAll(/image: "([^"]+\.webp)"/g)].map((match) =>
        path.basename(match[1]),
      ),
    ),
  ];

  for (const file of htmlFiles().filter((file) =>
    file.includes(`${path.sep}blog${path.sep}`),
  )) {
    const html = fs.readFileSync(file, "utf8");
    for (const match of html.matchAll(
      /"datePublished"\s*:\s*"(\d{4}-\d{2}-\d{2})"/g,
    )) {
      expect(
        match[1] <= today,
        `${path.relative(root, file)} usa una fecha futura`,
      ).toBe(true);
    }
    if (/property="og:image" content="[^"]+\.webp"/.test(html)) {
      expect(
        html,
        `${path.relative(root, file)} debe declarar image/webp`,
      ).toContain('property="og:image:type" content="image/webp"');
    }
  }

  expect(campaignImages.length).toBeGreaterThanOrEqual(14);
  for (const image of campaignImages) {
    const file = path.join(root, "img", image);
    expect(fs.existsSync(file), `${image} debe existir`).toBe(true);
    expect(
      fs.statSync(file).size,
      `${image} debe pesar menos de 100 KB`,
    ).toBeLessThan(100 * 1024);
  }
});

test("los casos de producto enlazan a fichas publicadas", async ({ page }) => {
  await page.goto("/productos/personalizada-webapp/");
  await expect(
    page.locator('a[href="../../casos/im-kontext-vokabellab/"]'),
  ).toHaveCount(0);
  await expect(
    page.locator('a[href="../../casos/der-die-das-vokabellab/"]'),
  ).toHaveCount(0);
  expect(
    await page.locator('a[href="../../casos/vokabellab/"]').count(),
  ).toBeGreaterThanOrEqual(6);
});

test("nginx fuerza dominio canónico, compresión y caché", () => {
  const nginx = fs.readFileSync(path.join(root, "nginx/default.conf"), "utf8");
  expect(nginx).toContain("$host = www.webfuengirola.com");
  expect(nginx).toContain("return 301 https://webfuengirola.com$request_uri");
  expect(nginx).toContain("gzip on;");
  expect(nginx).toContain("expires 1y;");
  expect(nginx).toContain("expires 7d;");
});
