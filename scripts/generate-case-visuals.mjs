import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const tmpDir = path.join(rootDir, "tmp", "case-visuals");
const imgDir = path.join(rootDir, "img");

const width = 1600;
const height = 900;

fs.mkdirSync(tmpDir, { recursive: true });

const sharedCss = `
  @font-face {
    font-family: "Inter";
    src: local("Inter");
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    width: ${width}px;
    height: ${height}px;
    display: grid;
    place-items: center;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    color: #070707;
    background:
      radial-gradient(circle at 18% 14%, rgba(255,255,255,.9), transparent 28%),
      linear-gradient(135deg, #f4f1ea 0%, #e9edf0 45%, #eef4ee 100%);
    overflow: hidden;
  }
  .stage {
    position: relative;
    width: 1440px;
    height: 760px;
    border-radius: 42px;
    background: rgba(255,255,255,.68);
    border: 1px solid rgba(7,7,7,.08);
    box-shadow: 0 46px 120px rgba(9,9,9,.14);
    overflow: hidden;
  }
  .grain {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(120deg, rgba(255,255,255,.22), rgba(255,255,255,0));
    pointer-events: none;
  }
  .brand {
    position: absolute;
    left: 54px;
    top: 44px;
    display: flex;
    align-items: center;
    gap: 16px;
    color: #151515;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: .04em;
    text-transform: uppercase;
  }
  .logo {
    width: 58px;
    height: 58px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #111;
    color: white;
    font-size: 21px;
    font-weight: 900;
  }
  .label {
    display: inline-flex;
    align-items: center;
    width: max-content;
    gap: 8px;
    padding: 11px 16px;
    border-radius: 999px;
    background: rgba(7,7,7,.08);
    color: rgba(7,7,7,.72);
    font-size: 17px;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
  .card {
    border-radius: 30px;
    background: rgba(255,255,255,.9);
    border: 1px solid rgba(7,7,7,.08);
    box-shadow: 0 26px 70px rgba(9,9,9,.12);
  }
  .screen {
    border-radius: 28px;
    background: #0f1115;
    border: 16px solid #121212;
    box-shadow: 0 34px 90px rgba(0,0,0,.22);
    overflow: hidden;
  }
  .browserbar {
    height: 44px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 18px;
    background: #ecebe7;
    border-bottom: 1px solid rgba(0,0,0,.08);
  }
  .dot { width: 10px; height: 10px; border-radius: 999px; background: #b8b8b8; }
  .url {
    margin-left: 12px;
    height: 20px;
    width: 300px;
    border-radius: 999px;
    background: rgba(255,255,255,.82);
  }
  h1, h2, p { margin: 0; }
`;

const visuals = [
  {
    file: "sport-massage-fuengirola",
    html: `
      <div class="stage">
        <div class="brand"><div class="logo">WF</div><span>Web Fuengirola</span></div>
        <div class="card" style="position:absolute;left:96px;top:162px;width:650px;height:470px;padding:34px">
          <div class="label">Google Maps</div>
          <div style="position:absolute;left:34px;right:34px;top:96px;bottom:34px;border-radius:24px;overflow:hidden;background:#dfe6dc">
            <div style="position:absolute;inset:0;background:
              linear-gradient(30deg, transparent 48%, rgba(255,255,255,.72) 49%, rgba(255,255,255,.72) 52%, transparent 53%),
              linear-gradient(96deg, transparent 44%, rgba(255,255,255,.62) 45%, rgba(255,255,255,.62) 48%, transparent 49%),
              linear-gradient(150deg, transparent 52%, rgba(255,255,255,.7) 53%, rgba(255,255,255,.7) 56%, transparent 57%),
              linear-gradient(#b8d5c9 0 0);"></div>
            <div style="position:absolute;left:356px;top:116px;width:52px;height:52px;border-radius:50% 50% 50% 4px;transform:rotate(-45deg);background:#111;box-shadow:0 18px 34px rgba(0,0,0,.2)"></div>
            <div style="position:absolute;left:371px;top:131px;width:22px;height:22px;border-radius:50%;background:white"></div>
            <div style="position:absolute;left:44px;bottom:38px;width:300px;padding:22px;border-radius:24px;background:white;box-shadow:0 16px 40px rgba(0,0,0,.12)">
              <strong style="display:block;font-size:30px;line-height:1.05">Sport Massage Fuengirola</strong>
              <span style="display:block;margin-top:12px;color:#5f6b73;font-size:18px">Masaje profesional especializado</span>
              <div style="display:flex;gap:6px;margin-top:16px;color:#111;font-weight:800;font-size:20px">★★★★★ <span style="color:#63717a;font-size:16px;font-weight:700">Reserva directa</span></div>
            </div>
          </div>
        </div>
        <div class="screen" style="position:absolute;right:112px;top:142px;width:548px;height:398px;background:#112033">
          <div class="browserbar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="url"></span></div>
          <div style="padding:62px 54px;color:white;background:linear-gradient(135deg,#102033,#1d3445);height:100%">
            <p style="font-size:18px;letter-spacing:.18em;text-transform:uppercase;color:#cbb987">Sport Massage Fuengirola</p>
            <h1 style="margin-top:22px;font-size:58px;line-height:.96;font-weight:900">Masaje profesional especializado</h1>
            <div style="margin-top:32px;width:210px;height:48px;border-radius:999px;background:#9ec5ca"></div>
          </div>
        </div>
        <div class="grain"></div>
      </div>
    `,
  },
  {
    file: "personal-trainer",
    html: `
      <div class="stage">
        <div class="brand"><div class="logo">WF</div><span>Diseño web</span></div>
        <div class="screen" style="position:absolute;left:214px;top:128px;width:920px;height:530px;background:#111">
          <div class="browserbar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="url"></span></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;height:486px;background:#0e0f0f;color:white">
            <div style="padding:64px 58px">
              <p style="font-size:18px;letter-spacing:.18em;text-transform:uppercase;color:#c7ff55;font-weight:800">Personal Trainer Fuengirola</p>
              <h1 style="margin-top:24px;font-size:66px;line-height:.92;font-weight:950">Entrena con un plan claro</h1>
              <p style="margin-top:24px;font-size:22px;color:#c8c8c8;line-height:1.35">Contacto directo, horarios y prueba social visibles en móvil.</p>
              <div style="margin-top:30px;width:196px;height:52px;border-radius:999px;background:#c7ff55"></div>
            </div>
            <div style="position:relative;background:linear-gradient(145deg,#2b2b2b,#111)">
              <div style="position:absolute;left:86px;top:60px;width:260px;height:300px;border-radius:130px 130px 28px 28px;background:linear-gradient(#d6d6d2,#9da19a)"></div>
              <div style="position:absolute;left:122px;top:104px;width:142px;height:142px;border-radius:50%;background:#111"></div>
              <div style="position:absolute;left:72px;bottom:96px;width:314px;height:68px;border-radius:999px;background:white;color:#111;display:grid;place-items:center;font-weight:900;font-size:21px">Reserva valoración</div>
            </div>
          </div>
        </div>
        <div style="position:absolute;left:294px;top:678px;width:760px;height:28px;border-radius:50%;background:rgba(0,0,0,.16);filter:blur(18px)"></div>
        <div style="position:absolute;left:482px;top:660px;width:380px;height:54px;background:#171717;border-radius:0 0 26px 26px"></div>
        <div style="position:absolute;left:410px;top:714px;width:520px;height:26px;border-radius:999px;background:#2b2b2b"></div>
        <div class="grain"></div>
      </div>
    `,
  },
  {
    file: "agama",
    html: `
      <div class="stage">
        <div class="brand"><div class="logo">WF</div><span>App a medida</span></div>
        <div class="screen" style="position:absolute;left:90px;top:150px;width:850px;height:500px;background:#f5f7f6">
          <div class="browserbar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="url"></span></div>
          <div style="display:grid;grid-template-columns:190px 1fr;height:456px;background:#f7faf8">
            <aside style="background:#111;color:white;padding:34px 24px">
              <h2 style="font-size:34px;font-weight:950">AGAMA</h2>
              <div style="margin-top:42px;display:grid;gap:16px">
                <span style="height:18px;border-radius:999px;background:#d9ff55"></span>
                <span style="height:18px;border-radius:999px;background:#444"></span>
                <span style="height:18px;border-radius:999px;background:#444"></span>
              </div>
            </aside>
            <main style="padding:34px">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <h1 style="font-size:38px;font-weight:950">Panel clientes</h1>
                <div style="width:148px;height:42px;border-radius:999px;background:#111"></div>
              </div>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:26px">
                <div class="card" style="height:118px;padding:18px"><b style="font-size:34px">24</b><p style="margin-top:8px;color:#667">Servicios</p></div>
                <div class="card" style="height:118px;padding:18px"><b style="font-size:34px">8</b><p style="margin-top:8px;color:#667">Bonos activos</p></div>
                <div class="card" style="height:118px;padding:18px"><b style="font-size:34px">3</b><p style="margin-top:8px;color:#667">Pendientes</p></div>
              </div>
              <div class="card" style="margin-top:20px;height:184px;padding:20px">
                <div style="height:24px;width:74%;border-radius:999px;background:#d7ddde"></div>
                <div style="height:24px;width:88%;border-radius:999px;background:#e6eaeb;margin-top:18px"></div>
                <div style="height:24px;width:66%;border-radius:999px;background:#e6eaeb;margin-top:18px"></div>
              </div>
            </main>
          </div>
        </div>
        <div style="position:absolute;right:130px;top:122px;width:342px;height:640px;border-radius:54px;background:#111;padding:18px;box-shadow:0 34px 90px rgba(0,0,0,.28)">
          <div style="height:100%;border-radius:40px;background:linear-gradient(180deg,#fbfbf8,#edf6f2);padding:34px">
            <div class="label" style="font-size:13px">Venta adicional</div>
            <h2 style="margin-top:26px;font-size:42px;line-height:1;font-weight:950">Colour Viewer</h2>
            <div style="margin-top:28px;height:240px;border-radius:34px;background:
              radial-gradient(circle at 38% 38%, #f5b300 0 18%, transparent 19%),
              radial-gradient(circle at 64% 42%, #1d8bd1 0 17%, transparent 18%),
              radial-gradient(circle at 50% 68%, #e43b52 0 20%, transparent 21%),
              #fff;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)"></div>
            <div style="display:grid;gap:12px;margin-top:28px">
              <span style="height:28px;border-radius:999px;background:#d7ddde"></span>
              <span style="height:28px;width:72%;border-radius:999px;background:#e6eaeb"></span>
              <span style="height:52px;border-radius:999px;background:#111"></span>
            </div>
          </div>
        </div>
        <div class="grain"></div>
      </div>
    `,
  },
  {
    file: "vokabellab",
    html: `
      <div class="stage">
        <div class="brand"><div class="logo">WF</div><span>Vokabel Lab</span></div>
        <div class="screen" style="position:absolute;left:108px;top:150px;width:800px;height:500px;background:#101216">
          <div class="browserbar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="url"></span></div>
          <div style="height:456px;padding:46px;background:linear-gradient(145deg,#15181f,#24282f);color:white">
            <div class="label" style="background:rgba(217,255,85,.16);color:#d9ff55">Modo juego</div>
            <h1 style="margin-top:24px;font-size:60px;line-height:.95;font-weight:950">Der, die oder das?</h1>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:38px">
              <div class="card" style="height:132px;background:#fff;padding:20px"><b style="font-size:38px">der</b><p style="margin-top:14px;color:#667">Artikel</p></div>
              <div class="card" style="height:132px;background:#d9ff55;padding:20px"><b style="font-size:38px">die</b><p style="margin-top:14px;color:#415000">Correct</p></div>
              <div class="card" style="height:132px;background:#fff;padding:20px"><b style="font-size:38px">das</b><p style="margin-top:14px;color:#667">Artikel</p></div>
            </div>
            <div style="margin-top:32px;height:18px;border-radius:999px;background:#343942"><span style="display:block;width:68%;height:100%;border-radius:999px;background:#d9ff55"></span></div>
          </div>
        </div>
        <div style="position:absolute;right:176px;top:118px;width:310px;height:620px;border-radius:54px;background:#111;padding:18px;box-shadow:0 36px 90px rgba(0,0,0,.3)">
          <div style="height:100%;border-radius:40px;background:#f8f9f3;padding:30px">
            <div style="height:32px;width:112px;border-radius:999px;background:#111;margin:0 auto 34px"></div>
            <p style="font-size:16px;letter-spacing:.14em;text-transform:uppercase;color:#677;font-weight:900">Ronda 8</p>
            <h2 style="margin-top:18px;font-size:44px;line-height:1;font-weight:950">die Zeitung</h2>
            <div style="margin-top:34px;display:grid;gap:14px">
              <div style="height:64px;border-radius:22px;background:#111;color:white;display:grid;place-items:center;font-weight:900;font-size:24px">Correcto</div>
              <div style="height:64px;border-radius:22px;background:#edf0ec"></div>
              <div style="height:64px;border-radius:22px;background:#edf0ec"></div>
            </div>
            <div style="position:absolute;left:44px;right:44px;bottom:50px;height:18px;border-radius:999px;background:#e4e7e1"><span style="display:block;width:72%;height:100%;border-radius:999px;background:#d9ff55"></span></div>
          </div>
        </div>
        <div class="grain"></div>
      </div>
    `,
  },
];

function pageHtml(body) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${sharedCss}</style></head><body>${body}</body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height },
  deviceScaleFactor: 1,
});

for (const visual of visuals) {
  await page.setContent(pageHtml(visual.html), { waitUntil: "load" });
  const pngPath = path.join(tmpDir, `${visual.file}.png`);
  const webpPath = path.join(imgDir, `${visual.file}.webp`);
  await page.screenshot({ path: pngPath, type: "png", fullPage: false });
  execFileSync("/opt/homebrew/bin/cwebp", [
    "-quiet",
    "-q",
    "82",
    pngPath,
    "-o",
    webpPath,
  ]);
  console.log(`Generated img/${visual.file}.webp`);
}

await browser.close();
