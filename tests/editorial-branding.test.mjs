import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { getPageGroup, pageGroups } from "../data/commercial-pages-data.mjs";
import { renderCommercialPage } from "../scripts/build-commercial-pages.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function filesBelow(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(file) : [file];
  });
}

test("German and Finnish commercial headlines use natural native constructions", () => {
  const expected = {
    home: {
      de: "WF-Studio: Webdesign in Fuengirola, das Besucher zu Anfragen führt",
      fi: "WF-Studio: verkkosivut Fuengirolassa, jotka muuttavat kävijät yhteydenotoiksi",
    },
    design: {
      de: "Webdesign in Fuengirola, das über Google und Mobilgeräte neue Kunden gewinnt",
      fi: "Verkkosivujen suunnittelu Fuengirolassa Google- ja mobiiliasiakkaita varten",
    },
    clinics: {
      de: "Websites für Praxen in Fuengirola, die Vertrauen schaffen und Terminanfragen gewinnen",
      fi: "Verkkosivut Fuengirolan klinikoille – luottamusta ja ajanvarauksia",
    },
    restaurants: {
      de: "Websites für Restaurants in Fuengirola für mehr Direktreservierungen",
      fi: "Verkkosivut Fuengirolan ravintoloille suoria pöytävarauksia varten",
    },
    multilingual: {
      de: "Mehrsprachige Websites in Fuengirola für internationale Gäste und Einwohner",
      fi: "Monikieliset verkkosivut Fuengirolassa kansainvälisille asiakkaille",
    },
  };

  for (const [groupKey, locales] of Object.entries(expected)) {
    for (const [locale, headline] of Object.entries(locales)) {
      assert.equal(getPageGroup(groupKey).content[locale].h1, headline);
    }
  }
});

test("generic FAQs speak to the business instead of assigning its goal to the customer", () => {
  assert.equal(
    getPageGroup("home").content.es.faqs[0][0],
    "¿Qué puede aportar una web clara a un negocio de Fuengirola?",
  );
  assert.equal(
    getPageGroup("home").content.en.faqs[0][0],
    "What can a clear website do for a business in Fuengirola?",
  );

  for (const group of pageGroups) {
    for (const locale of ["es", "en", "de", "fi"]) {
      const questions = group.content[locale].faqs.map(([question]) => question).join("\n");
      assert.doesNotMatch(questions, /ayuda wf-studio:|Wie hilft WF-Studio:|Miten wf-studio:/i);
    }
  }
});

test("commercial pages never expose internal demonstration notes", () => {
  const forbidden = /demostración sectorial|sector demonstration|Branchendemonstration|toimialakohtaisella demolla/i;
  for (const group of pageGroups) {
    for (const locale of ["es", "en", "de", "fi"]) {
      assert.doesNotMatch(renderCommercialPage(group, locale), forbidden, `${group.key}:${locale}`);
    }
  }
});

test("commercial metadata stays readable inside common search snippet limits", () => {
  for (const group of pageGroups) {
    for (const locale of ["es", "en", "de", "fi"]) {
      const { title, description } = group.content[locale];
      assert.ok(title.length <= 70, `${group.key}:${locale} title has ${title.length} characters`);
      assert.ok(description.length <= 160, `${group.key}:${locale} description has ${description.length} characters`);
    }
  }
});

test("pages without package cards keep metadata focused on their actual purpose", () => {
  for (const groupKey of ["audit", "contact", "cases", "apps", "automation"]) {
    for (const locale of ["es", "en", "de", "fi"]) {
      assert.doesNotMatch(
        getPageGroup(groupKey).content[locale].description,
        /Lite|Express|Professional|Profesional/,
        `${groupKey}:${locale}`,
      );
    }
  }
});

test("Spanish generated sentences start cleanly and avoid fragile agreement", () => {
  for (const group of pageGroups) {
    const content = group.content.es;
    for (const sentence of [content.intro, ...content.problems, ...content.benefits, ...content.tierUses]) {
      assert.match(sentence, /^\p{Lu}/u, `${group.key}: ${sentence}`);
      assert.doesNotMatch(sentence, /automatizaciones .* presentada|empresas .* presentada/i, group.key);
    }
  }
});

test("legal rendering has no fill-in placeholders", () => {
  const core = fs.readFileSync(path.join(root, "legal-core.js"), "utf8");
  const page = fs.readFileSync(path.join(root, "legal-page.js"), "utf8");
  assert.doesNotMatch(core + page, /\[RELLENAR:/);
});

test("public HTML and deterministic image templates use the WF-Studio brand", () => {
  const publicFiles = filesBelow(root).filter(
    (file) =>
      /\.(?:html|mjs)$/.test(file) &&
      !file.includes(`${path.sep}node_modules${path.sep}`) &&
      !file.includes(`${path.sep}.worktrees${path.sep}`) &&
      !file.includes(`${path.sep}tests${path.sep}`) &&
      !file.includes(`${path.sep}apps${path.sep}studio-panel${path.sep}`),
  );
  const legacyPattern = /(?<!WF-Studio · )Web Fuengirola\. Todos los derechos reservados|aria-label="Web Fuengirola"|alt="Web Fuengirola"/;
  for (const file of publicFiles) {
    const source = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(source, legacyPattern, path.relative(root, file));
    assert.doesNotMatch(source, /WF-Studio · WF-Studio/, path.relative(root, file));
  }

  const caseVisuals = fs.readFileSync(path.join(root, "scripts/generate-case-visuals.mjs"), "utf8");
  assert.doesNotMatch(caseVisuals, /<span>(?:Web Fuengirola|Diseño web|App a medida)<\/span>/);
  assert.match(caseVisuals, /<span>WF-Studio<\/span>/);

  for (const source of ["og-blog-home.html", "og-web-2026.html", "og-ia-servicios.html"]) {
    const blogVisual = fs.readFileSync(path.join(root, "blog", source), "utf8");
    assert.match(blogVisual, />WF-STUDIO</, source);
    assert.doesNotMatch(blogVisual, />WEB FUENGIROLA</, source);
  }

  const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  assert.equal(packageJson.scripts["build:brand-visuals"], "node scripts/generate-brand-visuals.mjs");
});

test("incomplete Spanish legal identity is not indexed", () => {
  for (const relativePath of ["legal.html", "en/legal/index.html", "de/rechtliches/index.html", "fi/lakitiedot/index.html"]) {
    const legalPage = fs.readFileSync(path.join(root, relativePath), "utf8");
    assert.match(legalPage, /<meta name="robots" content="noindex, follow"/, relativePath);
  }
});
