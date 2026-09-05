import assert from "node:assert/strict";
import test from "node:test";

import {
  commercialRoutes,
  getAlternateRoutes,
  locales,
  pageGroups,
  tiers,
} from "../data/commercial-pages-data.mjs";

const localeCodes = ["es", "en", "de", "fi"];

test("the commercial catalog exposes four equally complete locales", () => {
  assert.deepEqual(Object.keys(locales), localeCodes);
  assert.ok(pageGroups.length >= 13);

  for (const group of pageGroups) {
    assert.deepEqual(Object.keys(group.routes), localeCodes, group.key);
    assert.deepEqual(Object.keys(group.content), localeCodes, group.key);
    assert.deepEqual(Object.keys(getAlternateRoutes(group.key)), localeCodes);

    for (const locale of localeCodes) {
      const content = group.content[locale];
      assert.ok(content.title.includes("Fuengirola"), `${group.key}:${locale}:title`);
      assert.ok(content.description.includes("Fuengirola"), `${group.key}:${locale}:description`);
      assert.ok(content.h1.includes("Fuengirola"), `${group.key}:${locale}:h1`);
      assert.ok(content.intro.length >= 80, `${group.key}:${locale}:intro`);
      assert.equal(content.problems.length, 3, `${group.key}:${locale}:problems`);
      assert.equal(content.benefits.length, 3, `${group.key}:${locale}:benefits`);
      assert.equal(content.faqs.length, 3, `${group.key}:${locale}:faqs`);
      assert.equal(content.tierUses.length, 3, `${group.key}:${locale}:tierUses`);
    }
  }
});

test("commercial routes are unique and stay inside their locale", () => {
  const paths = commercialRoutes.map(({ path }) => path);
  assert.equal(new Set(paths).size, paths.length);

  for (const route of commercialRoutes) {
    if (route.locale === "es") {
      assert.doesNotMatch(route.path, /^\/(en|de|fi)(\/|$)/);
    } else {
      assert.match(route.path, new RegExp(`^/${route.locale}(?:/|$)`));
    }
  }
});

test("all sectors share the approved tiers and prices", () => {
  assert.deepEqual(
    tiers.map(({ key, price }) => [key, price]),
    [
      ["lite", 200],
      ["express", 350],
      ["professional", 600],
    ],
  );

  for (const tier of tiers) {
    assert.deepEqual(Object.keys(tier.name), localeCodes);
    assert.deepEqual(Object.keys(tier.features), localeCodes);
    for (const locale of localeCodes) {
      assert.equal(tier.features[locale].length, 4);
    }
  }
});
