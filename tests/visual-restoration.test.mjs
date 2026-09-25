import assert from 'node:assert/strict';
import test from 'node:test';
import { renderCommercialPage } from '../scripts/build-commercial-pages.mjs';
import { getPageGroup } from '../data/commercial-pages-data.mjs';

test('Spanish home preserves the original Northern Lights showcase after regeneration', () => {
  const html = renderCommercialPage(getPageGroup('home'), 'es');
  assert.match(html, /hero-northern-lights-screen-branded\.png/);
  assert.match(html, /hero--cinematic/);
  assert.match(html, /href="\/casos\/"[^>]*>Portfolio/);
});

test('each portfolio project has a linked cover and scroll entrance in every language', () => {
  for (const locale of ['es', 'en', 'de', 'fi']) {
    const group = getPageGroup('cases');
    const html = renderCommercialPage(group, locale);
    for (const slug of group.cases) {
      assert.match(html, new RegExp('<article[^>]*id="' + slug + '"[^>]*data-reveal'));
      assert.match(html, new RegExp('href="/casos/' + slug + '/"[^>]*>[\\s\\S]*?<img'));
    }
  }
});


test('restoration keeps the complete original homepage shell while retaining current SEO', () => {
  const group = getPageGroup('home');
  const html = renderCommercialPage(group, 'es');
  assert.match(html, /class="container header__inner"/);
  assert.doesNotMatch(html, /commercial-logo|commercial-header__inner/);
  assert.match(html, /class="whatsapp-fab"/);
  assert.match(html, /id="page-transition"/);
  assert.match(html, /navClientAccess/);
  assert.match(html, /rel="canonical" href="https:\/\/webfuengirola.com\/"/);
  assert.match(html, /hreflang="fi"/);
  assert.ok(html.includes(group.content.es.description));
  assert.match(html, /href="\/seo-local-fuengirola\/"/);
});
