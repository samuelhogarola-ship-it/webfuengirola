import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { portfolioProjects } from "../portfolio/projects-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const expectedGroups = {
  lite: [
    "Sport Massage Fuengirola",
    "Hotel sencillo · Bali Bhuana",
    "Dede Art",
  ],
  express: [
    "Personal Trainer Fuengirola",
    "Gimnasio Nuevo Estilo",
    "SuVilla Inmobiliaria",
  ],
  pro: ["Samuel Coach de Alemán", "Agama", "TodoPlásticos", "Superentrenador"],
  apps: [
    "Vokabel Lab",
    "CRM Inmobiliario",
    "CRM para clínicas",
    "Der Die Das",
    "ImKontext",
    "Farbentester",
  ],
};

test("portfolio projects are assigned to the four approved categories", () => {
  const actualGroups = Object.fromEntries(
    Object.keys(expectedGroups).map((group) => [
      group,
      portfolioProjects
        .filter((project) => project.portfolioGroup === group)
        .sort(
          (left, right) =>
            (left.portfolioOrder ?? 0) - (right.portfolioOrder ?? 0),
        )
        .map((project) => project.title),
    ]),
  );

  assert.deepEqual(actualGroups, expectedGroups);
  assert.equal(
    portfolioProjects.some(
      (project) => project.portfolioGroup === "specialized",
    ),
    false,
  );
});

test("the generated portfolio exposes four sections and uncropped thumbnails", () => {
  const html = fs.readFileSync(path.join(root, "casos/index.html"), "utf8");

  for (const heading of [
    "Lite",
    "Express",
    "Pro",
    "Web apps y funcionalidades",
  ]) {
    assert.match(html, new RegExp(`>${heading}<`));
  }
  assert.doesNotMatch(html, /Webs especializadas/i);
  assert.match(html, /portfolio-card__img--contain/);
  assert.doesNotMatch(html, /href="\/precios-diseno-web-fuengirola\/"/);
  assert.doesNotMatch(html, /href="\/seo-local-fuengirola\/"/);
  assert.doesNotMatch(html, /href="\/automatizacion-ia-fuengirola\/"/);
  assert.match(html, /href="\/servicios\/#precios"/);
  assert.match(html, /href="\/servicios\/#seo-local"/);
  assert.match(html, /href="\/servicios\/#automatizacion-ia"/);
});

test("prices, local SEO and automation are consolidated in Services", () => {
  const html = fs.readFileSync(path.join(root, "servicios/index.html"), "utf8");
  const nginx = fs.readFileSync(path.join(root, "nginx/default.conf"), "utf8");

  assert.match(html, /id="precios"/);
  assert.match(html, /id="seo-local"/);
  assert.match(html, /id="automatizacion-ia"/);
  assert.match(
    nginx,
    /location = \/precios-diseno-web-fuengirola\/[^]*return 301 \/servicios\/#precios;/,
  );
  assert.match(
    nginx,
    /location = \/seo-local-fuengirola\/[^]*return 301 \/servicios\/#seo-local;/,
  );
  assert.match(
    nginx,
    /location = \/automatizacion-ia-fuengirola\/[^]*return 301 \/servicios\/#automatizacion-ia;/,
  );
});
