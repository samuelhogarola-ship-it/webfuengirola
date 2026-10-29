import assert from "node:assert/strict";
import test from "node:test";
import { renderCommercialPage } from "../scripts/build-commercial-pages.mjs";
import { getPageGroup } from "../data/commercial-pages-data.mjs";

test("Spanish home preserves the original Northern Lights showcase after regeneration", () => {
  const html = renderCommercialPage(getPageGroup("home"), "es");
  assert.match(html, /hero-northern-lights-screen-branded\.png/);
  assert.match(html, /hero--cinematic/);
  assert.match(html, /href="\/casos\/"[^>]*>Portfolio/);
});

test("all Fuengirola languages preserve the reference homepage model", () => {
  const group = getPageGroup("home");
  for (const locale of ["es", "en", "de", "fi"]) {
    const html = renderCommercialPage(group, locale);
    assert.match(html, /hero--cinematic/, locale);
    assert.match(html, /hero-northern-lights-screen-branded\.png/, locale);
    assert.doesNotMatch(html, /commercial-page--home/, locale);
  }
});

test("each portfolio project has a linked cover that is visible without scroll animation", () => {
  for (const locale of ["es", "en", "de", "fi"]) {
    const group = getPageGroup("cases");
    const html = renderCommercialPage(group, locale);
    for (const slug of group.cases) {
      assert.match(html, new RegExp('<article[^>]*id="' + slug + '"'));
      assert.doesNotMatch(
        html,
        new RegExp('<article[^>]*id="' + slug + '"[^>]*data-reveal'),
      );
      const caseHref =
        locale === "es"
          ? `/casos/${slug}/`
          : html.match(
              new RegExp(
                `<article[^>]*id="${slug}"[\\s\\S]*?<a[^>]*href="([^"]+)"`,
              ),
            )?.[1];
      assert.ok(caseHref, `${locale}:${slug}`);
      if (locale !== "es") {
        assert.match(caseHref, /^https:\/\//, `${locale}:${slug}`);
      }
      assert.match(
        html,
        new RegExp(
          'href="' + caseHref.replaceAll("/", "\\/") + '"[^>]*>[\\s\\S]*?<img',
        ),
      );
    }
  }
});

test("portfolio uses the shared full-height hero treatment with a single H1", () => {
  for (const locale of ["es", "en", "de", "fi"]) {
    const html = renderCommercialPage(getPageGroup("cases"), locale);
    assert.match(
      html,
      /<section class="commercial-hero commercial-hero--portfolio"[^>]*>/,
    );
    assert.match(html, /<div class="container" data-page-enter>/);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  }
});

test("restoration keeps the complete original homepage shell while retaining current SEO", () => {
  const group = getPageGroup("home");
  const html = renderCommercialPage(group, "es");
  assert.match(html, /class="container header__inner"/);
  assert.doesNotMatch(html, /commercial-logo|commercial-header__inner/);
  assert.match(html, /class="whatsapp-fab"/);
  assert.match(html, /id="page-transition"/);
  assert.match(html, /https:\/\/portal\.webfuengirola\.com\/cliente/);
  assert.match(html, /rel="canonical" href="https:\/\/webfuengirola.com\/"/);
  assert.match(html, /hreflang="fi"/);
  assert.ok(html.includes(group.content.es.description));
  assert.match(html, /href="\/servicios\/#seo-local"/);
});

test("home social previews use complete JPEG metadata for broad crawler support", () => {
  const html = renderCommercialPage(getPageGroup("home"), "es");
  const image = "https://webfuengirola.com/img/og-cover.jpg";

  assert.match(html, new RegExp(`property="og:image" content="${image}"`));
  assert.match(
    html,
    new RegExp(`property="og:image:secure_url" content="${image}"`),
  );
  assert.match(html, /property="og:image:type" content="image\/jpeg"/);
  assert.match(html, /property="og:image:width" content="1200"/);
  assert.match(html, /property="og:image:height" content="630"/);
  assert.match(html, /property="og:image:alt" content="[^"]+"/);
  assert.match(html, new RegExp(`name="twitter:image" content="${image}"`));
  assert.match(html, /name="twitter:image:alt" content="[^"]+"/);
});
