import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { brand, getPageGroup, legalRoutes, pageGroups } from "../data/commercial-pages-data.mjs";
import {
  generateCommercialPages,
  renderCommercialPage,
} from "../scripts/build-commercial-pages.mjs";

const localeCodes = ["es", "en", "de", "fi"];

function htmlFile(outputRoot, route) {
  return route === "/"
    ? path.join(outputRoot, "index.html")
    : route.endsWith(".html")
      ? path.join(outputRoot, route.slice(1))
    : path.join(outputRoot, route.slice(1), "index.html");
}

test("a commercial page renders the complete multilingual SEO contract", () => {
  const group = getPageGroup("clinics");
  const html = renderCommercialPage(group, "en");

  assert.match(html, /<html lang="en">/);
  assert.match(html, /<h1[^>]*>[^<]*Fuengirola[^<]*<\/h1>/);
  assert.match(html, new RegExp(`<link rel="canonical" href="${brand.site}/en/websites-for-clinics-fuengirola/"`));
  for (const locale of localeCodes) {
    assert.match(html, new RegExp(`hreflang="${locale}"`));
  }
  assert.match(html, /hreflang="x-default" href="https:\/\/webfuengirola\.com\/web-para-clinicas-fuengirola\/"/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /WF-Studio · Web Fuengirola/);
  assert.match(html, /"alternateName": "Web Fuengirola"/);
  assert.match(html, />200\s*€</);
  assert.match(html, />350\s*€</);
  assert.match(html, />600\s*€</);
  assert.match(html, /data-analytics-event="quote_click"/);
  assert.match(html, /\/en\/contact\//);
  assert.match(html, /\/en\/case-studies\/#fisioapp-panel-clinica/);
  assert.doesNotMatch(html, /href="\/casos\/fisioapp-panel-clinica\//);
  assert.match(html, /\?plan=lite&amp;sector=clinics/);
});

test("the generator writes every route and keeps language switches equivalent", () => {
  const outputRoot = fs.mkdtempSync(path.join(os.tmpdir(), "wf-commercial-"));
  generateCommercialPages(outputRoot);

  for (const group of pageGroups) {
    for (const locale of localeCodes) {
      const file = htmlFile(outputRoot, group.routes[locale]);
      assert.ok(fs.existsSync(file), `${group.key}:${locale}`);
      const html = fs.readFileSync(file, "utf8");
      for (const alternate of Object.values(group.routes)) {
        assert.match(html, new RegExp(`href="${brand.site}${alternate}"`));
      }
    }
  }
});

test("sector pages have distinct content while sharing tier prices", () => {
  const sectorGroups = pageGroups.filter(({ kind }) => kind === "sector");
  for (const locale of localeCodes) {
    const h1s = sectorGroups.map((group) => group.content[locale].h1);
    const intros = sectorGroups.map((group) => group.content[locale].intro);
    const problems = sectorGroups.map((group) => group.content[locale].problems.join("|"));
    const benefits = sectorGroups.map((group) => group.content[locale].benefits.join("|"));
    const tierUses = sectorGroups.map((group) => group.content[locale].tierUses.join("|"));
    const faqs = sectorGroups.map((group) => group.content[locale].faqs.flat().join("|"));
    assert.equal(new Set(h1s).size, sectorGroups.length);
    assert.equal(new Set(intros).size, sectorGroups.length);
    assert.equal(new Set(problems).size, sectorGroups.length);
    assert.equal(new Set(benefits).size, sectorGroups.length);
    assert.equal(new Set(tierUses).size, sectorGroups.length);
    assert.equal(new Set(faqs).size, sectorGroups.length);

    for (const group of sectorGroups) {
      const html = renderCommercialPage(group, locale);
      assert.deepEqual(
        [...html.matchAll(/data-tier-price="(\d+)"/g)].map((match) => Number(match[1])),
        [200, 350, 600],
      );
    }
  }
});

test("sector pages answer sector-specific decisions instead of keyword substitution", () => {
  assert.match(getPageGroup("clinics").content.en.faqs[0][0], /healthcare information/);
  assert.match(getPageGroup("restaurants").content.en.faqs[0][0], /direct booking/);
  assert.match(getPageGroup("gyms").content.de.problems.join(" "), /Kurse|Kursplan/);
  assert.match(getPageGroup("multilingual").content.fi.benefits.join(" "), /kiel|URL/i);
});

test("localized legal pages are generated with equivalent language links", () => {
  const outputRoot = fs.mkdtempSync(path.join(os.tmpdir(), "wf-legal-"));
  generateCommercialPages(outputRoot);
  for (const locale of ["en", "de", "fi"]) {
    const html = fs.readFileSync(htmlFile(outputRoot, legalRoutes[locale]), "utf8");
    assert.match(html, new RegExp(`<html lang="${locale}">`));
    assert.match(html, new RegExp(`<link rel="canonical" href="${brand.site}${legalRoutes[locale]}"`));
    assert.match(html, /hreflang="es"/);
    assert.match(html, /id="privacy"/);
    assert.match(html, /id="cookies"/);
  }
});

test("commercial navigation is localized, mobile-ready and complete", () => {
  const html = renderCommercialPage(getPageGroup("restaurants"), "en");
  assert.match(html, /href="\/en\/case-studies\/"/);
  assert.match(html, /href="\/en\/web-applications-fuengirola\/"/);
  assert.match(html, /href="\/en\/automation-ai-fuengirola\/"/);
  assert.match(html, /class="lang-switcher lang-switcher--mobile"/);
  assert.match(html, /data-analytics-event="language_switch"/);
  assert.match(html, /data-sector="restaurants"/);
  assert.match(html, /href="\/en\/legal\/#privacy/);
  assert.match(html, /data-cookie-preferences-link/);
});
