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
