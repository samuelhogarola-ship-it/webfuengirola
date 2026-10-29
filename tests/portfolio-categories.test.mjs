import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { portfolioProjects } from "../portfolio/projects-data.mjs";
import { cases } from "../data/cases-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const expectedGroups = {
  lite: [
    "Sport Massage Fuengirola",
    "Bali Bhuana",
    "Dede Art",
    "Horses of Gili",
  ],
  express: ["Personal Trainer Fuengirola", "Gimnasio Nuevo Estilo"],
  pro: [
    "Samuel Coach de Alemán",
    "Agama",
    "SuVilla Inmobiliaria",
    "TodoPlásticos",
    "Superentrenador",
  ],
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
  assert.equal((html.match(/<details class="portfolio-category"/g) ?? []).length, 4);
  assert.equal((html.match(/<summary class="portfolio-category__header"/g) ?? []).length, 4);
  assert.equal((html.match(/<details class="portfolio-category"[^>]* open>/g) ?? []).length, 4);
  assert.doesNotMatch(html, /href="\/precios-diseno-web-fuengirola\/"/);
  assert.doesNotMatch(html, /href="\/seo-local-fuengirola\/"/);
  assert.doesNotMatch(html, /href="\/automatizacion-ia-fuengirola\/"/);
  assert.match(html, /href="\/servicios\/#precios"/);
  assert.match(html, /href="\/servicios\/#seo-local"/);
  assert.match(html, /href="\/servicios\/#automatizacion-ia"/);
});

test("real portfolio projects use real screenshots instead of placeholder SVG covers", () => {
  const expectedScreenshots = {
    "sport-massage-fuengirola": "img/sport-massage-landing.png",
    "personal-trainer-fuengirola": "img/hero-personal-trainer-real-screen.png",
    agama: "img/agama-tienda-online.png",
    suvilla: "img/suvilla-real.webp",
    superentrenador: "img/superentrenador-real.png",
    "horses-of-gili": "img/horses-of-gili-real.webp",
  };

  for (const [slug, image] of Object.entries(expectedScreenshots)) {
    const project = portfolioProjects.find((item) => item.slug === slug);
    assert.ok(project, slug);
    assert.equal(project.image, image, slug);
    assert.doesNotMatch(project.image, /portfolio-.*\.svg$/);
  }
});

test("all portfolio languages use the same grouped and collapsible project catalogue", () => {
  for (const route of [
    "casos/index.html",
    "en/case-studies/index.html",
    "de/referenzen/index.html",
    "fi/asiakastyot/index.html",
  ]) {
    const html = fs.readFileSync(path.join(root, route), "utf8");
    assert.equal((html.match(/<details class="portfolio-category"/g) ?? []).length, 4, route);
    assert.match(html, /Horses of Gili/, route);
    assert.match(html, /SuVilla Inmobiliaria/, route);
    assert.match(html, /superentrenador-real\.png/, route);
  }
});

test("localized portfolios keep their copy and internal journeys in the active language", () => {
  const localizedRoutes = [
    {
      file: "en/case-studies/index.html",
      caseHref: "https://www.sportmassagefuengirola.com",
      liveCta: "Visit live website →",
      contact: "/en/contact/?project=dede-art",
      localizedDescription: "A local landing page that explains services",
      forbiddenDescription: "Landing local enfocada en explicar servicios",
      aria: "View project: Sport Massage Fuengirola",
    },
    {
      file: "de/referenzen/index.html",
      caseHref: "https://www.sportmassagefuengirola.com",
      liveCta: "Live-Website besuchen →",
      contact: "/de/kontakt/?project=dede-art",
      localizedDescription: "Eine lokale Landingpage, die Leistungen erklärt",
      forbiddenDescription: "Landing local enfocada en explicar servicios",
      aria: "Projekt ansehen: Sport Massage Fuengirola",
    },
    {
      file: "fi/asiakastyot/index.html",
      caseHref: "https://www.sportmassagefuengirola.com",
      liveCta: "Avaa julkaistu sivusto →",
      contact: "/fi/yhteystiedot/?project=dede-art",
      localizedDescription: "Paikallinen laskeutumissivu, joka esittelee palvelut",
      forbiddenDescription: "Landing local enfocada en explicar servicios",
      aria: "Katso projekti: Sport Massage Fuengirola",
    },
  ];

  for (const expectation of localizedRoutes) {
    const html = fs.readFileSync(path.join(root, expectation.file), "utf8");
    assert.match(html, new RegExp(expectation.localizedDescription), expectation.file);
    assert.doesNotMatch(html, new RegExp(expectation.forbiddenDescription), expectation.file);
    assert.match(html, new RegExp(`href="${expectation.caseHref}"[^>]*target="_blank"`), expectation.file);
    assert.match(html, new RegExp(expectation.liveCta), expectation.file);
    assert.match(html, new RegExp(`href="${expectation.contact.replace("?", "\\?")}"`), expectation.file);
    assert.match(html, new RegExp(`aria-label="${expectation.aria}"`), expectation.file);
  }
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

test("Bali Bhuana is presented as a Lite design concept, never as a client", () => {
  const project = portfolioProjects.find(
    ({ slug }) => slug === "hotel-bali-bhuana",
  );
  const html = fs.readFileSync(path.join(root, "casos/index.html"), "utf8");

  assert.ok(project);
  assert.equal(project.portfolioGroup, "lite");
  assert.equal(project.client, "Demo de portfolio");
  assert.equal(project.title, "Bali Bhuana");
  assert.match(project.description, /demo|concepto/i);
  assert.match(html, /Bali Bhuana/);
  assert.match(html, /demo|concepto/i);
  assert.doesNotMatch(html, /Ver proyecto: Hotel sencillo · Bali Bhuana/);
});

test("every portfolio card declares an honest type with a matching call to action", () => {
  const expectedLabels = {
    case: "Ver caso →",
    demo: "Ver demo →",
    concept: "Consultar concepto →",
    product: "Visitar web →",
    crm: "Ver CRM →",
  };

  for (const project of portfolioProjects) {
    assert.ok(expectedLabels[project.projectType], project.slug);
  }

  const html = fs.readFileSync(path.join(root, "casos/index.html"), "utf8");
  for (const project of portfolioProjects) {
    const label = expectedLabels[project.projectType];
    assert.match(html, new RegExp(label), `${project.slug}: ${label}`);
  }

  const fisioApp = portfolioProjects.find(
    ({ slug }) => slug === "fisioapp-panel-clinica",
  );
  assert.equal(fisioApp.projectType, "crm");
  assert.match(fisioApp.heroLabel, /CRM funcional/i);
  assert.doesNotMatch(
    [
      fisioApp.client,
      fisioApp.longDescription,
      fisioApp.result,
      fisioApp.seoTitle,
      fisioApp.seoDescription,
      fisioApp.heroLabel,
    ].join(" "),
    /demo/i,
  );

  const fisioCase = cases.find(({ slug }) => slug === "fisioapp-panel-clinica");
  assert.ok(fisioCase);
  assert.doesNotMatch(
    [
      fisioCase.client,
      fisioCase.headline,
      fisioCase.summary,
      fisioCase.result,
      fisioCase.ogAlt,
      fisioCase.metaTitle,
      fisioCase.metaDescription,
    ].join(" "),
    /demo/i,
  );
});
