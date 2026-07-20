import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = "https://webfuengirola.com";
const today = new Date().toISOString().slice(0, 10);
const sitemapFile = path.join(root, "sitemap.xml");
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

function xml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const previousLastmod = new Map();
if (fs.existsSync(sitemapFile)) {
  const previousSitemap = fs.readFileSync(sitemapFile, "utf8");
  for (const match of previousSitemap.matchAll(
    /<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>\s*<\/url>/g,
  )) {
    previousLastmod.set(match[1], match[2]);
  }
}

const entries = new Map();
for (const file of htmlFiles()) {
  const html = fs.readFileSync(file, "utf8");
  const robots =
    html.match(
      /<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i,
    )?.[1] ??
    html.match(
      /<meta\b[^>]*content=["']([^"']+)["'][^>]*name=["']robots["']/i,
    )?.[1] ??
    "";
  if (/\bnoindex\b/i.test(robots)) continue;

  const canonical =
    html.match(
      /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i,
    )?.[1] ??
    html.match(
      /<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i,
    )?.[1];
  if (!canonical?.startsWith(`${site}/`)) continue;

  const modified = html.match(
    /"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})"/,
  )?.[1];
  const lastmod =
    modified && modified <= today
      ? modified
      : (previousLastmod.get(canonical) ?? today);
  entries.set(canonical, { loc: canonical, lastmod });
}

const ordered = [...entries.values()].sort((a, b) => {
  if (a.loc === `${site}/`) return -1;
  if (b.loc === `${site}/`) return 1;
  return a.loc.localeCompare(b.loc, "es");
});

const output = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ordered
  .map(
    ({ loc, lastmod }) => `  <url>
    <loc>${xml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(sitemapFile, output);
console.log(`Generated sitemap with ${ordered.length} canonical URLs.`);
