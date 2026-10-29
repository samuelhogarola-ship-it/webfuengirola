import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { chromium } from "@playwright/test";

const root = process.cwd();
const cwebp = fs.existsSync("/opt/homebrew/bin/cwebp")
  ? "/opt/homebrew/bin/cwebp"
  : "cwebp";
const covers = [
  {
    file: "blog-seo-plazos.webp",
    label: "SEO LOCAL",
    title: "Resultados que se construyen con el tiempo",
    accent: "#6f7f91",
    soft: "#d9e1e8",
    glyph: "↗",
  },
  {
    file: "blog-web-redes-sociales.webp",
    label: "WEB + REDES",
    title: "Tu casa digital y tus canales de alcance",
    accent: "#836f7d",
    soft: "#e6dbe2",
    glyph: "◎",
  },
  {
    file: "blog-seo-ciudades-ia.webp",
    label: "SEO · PUBLICIDAD · IA",
    title: "Fuengirola y Málaga, señales bien conectadas",
    accent: "#657b74",
    soft: "#d7e4df",
    glyph: "⌁",
  },
  {
    file: "blog-precio-web-local.webp",
    label: "PRECIO WEB",
    title: "El alcance explica el precio",
    accent: "#8a735e",
    soft: "#e8ded3",
    glyph: "€",
  },
  {
    file: "blog-google-maps-local.webp",
    label: "GOOGLE MAPS",
    title: "Señales locales para que te encuentren",
    accent: "#667487",
    soft: "#dbe1e9",
    glyph: "⌖",
  },
  {
    file: "blog-entrenador-personal.webp",
    label: "ENTRENAMIENTO PERSONAL",
    title: "Del servicio a la primera consulta",
    accent: "#7b6f66",
    soft: "#e4ded9",
    glyph: "＋",
  },
  {
    file: "blog-medir-contactos.webp",
    label: "ANALÍTICA ÚTIL",
    title: "De la visita al contacto real",
    accent: "#5f7780",
    soft: "#d5e2e5",
    glyph: "✓",
  },
  {
    file: "blog-contenido-local.webp",
    label: "CONTENIDO LOCAL",
    title: "Información propia, sin páginas duplicadas",
    accent: "#756f87",
    soft: "#e0ddea",
    glyph: "≠",
  },
];

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function markup(cover) {
  return `<!doctype html><html><head><style>
    *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;overflow:hidden;background:#f7f7f5;color:#30353b;font-family:Inter,Arial,sans-serif}
    main{position:relative;width:100%;height:100%;padding:74px 78px;display:flex;flex-direction:column;justify-content:space-between;background:linear-gradient(135deg,#fff 0 56%,${cover.soft} 56% 100%)}
    main:before{content:"";position:absolute;width:390px;height:390px;border:2px solid ${cover.accent};border-radius:50%;right:80px;top:120px;opacity:.38}
    main:after{content:"";position:absolute;width:220px;height:220px;background:${cover.accent};border-radius:42px;right:165px;top:205px;transform:rotate(12deg);opacity:.13}
    .brand{display:flex;align-items:center;gap:14px;font-size:20px;font-weight:700;letter-spacing:.02em}.mark{width:42px;height:42px;border-radius:12px;background:#30353b;color:#fff;display:grid;place-items:center;font-size:15px}
    .copy{position:relative;z-index:2;max-width:720px}.label{color:${cover.accent};font-size:18px;font-weight:800;letter-spacing:.16em;margin-bottom:24px}.title{font-size:54px;line-height:1.03;letter-spacing:-.045em;font-weight:800;margin:0}.glyph{position:absolute;z-index:2;right:208px;top:220px;width:132px;height:132px;border-radius:50%;display:grid;place-items:center;background:#fff;color:${cover.accent};font-size:72px;font-weight:700;box-shadow:0 24px 60px rgba(40,48,56,.16)}
    .footer{font-size:18px;color:#626a73}.line{display:inline-block;width:58px;height:3px;background:${cover.accent};vertical-align:middle;margin-right:14px}
  </style></head><body><main><div class="brand"><span class="mark">WF</span>WF-Studio · Web Fuengirola</div><div class="copy"><div class="label">${escapeHtml(cover.label)}</div><h1 class="title">${escapeHtml(cover.title)}</h1></div><div class="glyph">${cover.glyph}</div><div class="footer"><span class="line"></span>Guía práctica para negocio local</div></main></body></html>`;
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "wf-blog-covers-"));
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});

try {
  for (const cover of covers) {
    const png = path.join(tmp, cover.file.replace(/\.webp$/, ".png"));
    await page.setContent(markup(cover), { waitUntil: "load" });
    await page.screenshot({ path: png, type: "png" });
    execFileSync(cwebp, [
      "-quiet",
      "-q",
      "86",
      png,
      "-o",
      path.join(root, "img", cover.file),
    ]);
  }
} finally {
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
}

console.log(`Generated ${covers.length} personalized blog covers.`);
