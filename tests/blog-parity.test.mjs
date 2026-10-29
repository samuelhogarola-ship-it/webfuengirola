import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexes = {
  es: path.join(root, "blog", "index.html"),
  en: path.join(root, "en", "blog", "index.html"),
  de: path.join(root, "de", "blog", "index.html"),
  fi: path.join(root, "fi", "blog", "index.html"),
};

function readIndex(locale) {
  return fs.readFileSync(indexes[locale], "utf8");
}

function cards(locale) {
  return [
    ...readIndex(locale).matchAll(
      /<article class="blog-card"[\s\S]*?<\/article>/g,
    ),
  ].map(([html]) => ({
    slug: html.match(/href="\.\/([^/]+)\//)?.[1],
    image: html.match(/<img\b[\s\S]*?src="[^"]*\/([^/"?]+)"/)?.[1],
    tag: html.match(/<span class="tag tag--blue">([^<]+)<\/span>/)?.[1],
    date: html.match(/<div class="blog-card__meta"><span>([^<]+)<\/span>/)?.[1],
  }));
}

test("all blog locales publish the same complete article set", () => {
  const spanishSlugs = cards("es")
    .map(({ slug }) => slug)
    .sort();

  assert.equal(spanishSlugs.length, 24);
  for (const locale of ["en", "de", "fi"]) {
    assert.deepEqual(
      cards(locale)
        .map(({ slug }) => slug)
        .sort(),
      spanishSlugs,
      locale,
    );
  }
});

test("every article has its own cover and translations reuse that cover", () => {
  const spanishCards = cards("es");
  const spanishImages = spanishCards.map(({ image }) => image);

  assert.equal(new Set(spanishImages).size, spanishCards.length);
  assert.ok(!spanishImages.includes("blog-home-og.webp"));
  for (const image of spanishImages) {
    assert.ok(fs.existsSync(path.join(root, "img", image)), image);
  }

  const expectedBySlug = new Map(
    spanishCards.map(({ slug, image }) => [slug, image]),
  );
  for (const locale of ["en", "de", "fi"]) {
    for (const { slug, image } of cards(locale)) {
      assert.equal(image, expectedBySlug.get(slug), `${locale}:${slug}`);
    }
  }
});

test("localized blog metadata uses each language instead of Spanish", () => {
  const expected = {
    en: {
      date: "6 October 2026",
      tags: [
        "Contact tracking",
        "Useful local content",
        "Websites for trainers",
      ],
    },
    de: {
      date: "6. Oktober 2026",
      tags: [
        "Kontaktmessung",
        "Nützliche lokale Inhalte",
        "Websites für Trainer",
      ],
    },
    fi: {
      date: "6. lokakuuta 2026",
      tags: [
        "Yhteydenottojen seuranta",
        "Hyödyllinen paikallinen sisältö",
        "Verkkosivut valmentajille",
      ],
    },
  };
  const spanishMetadata =
    /\b\d{1,2} de [a-záéíóú]+ de \d{4}\b|Medición de contactos|Contenido local útil|Web para entrenadores/i;

  for (const locale of ["en", "de", "fi"]) {
    const localizedCards = cards(locale);
    assert.equal(localizedCards[0].date, expected[locale].date, locale);
    assert.deepEqual(
      localizedCards.slice(0, 3).map(({ tag }) => tag),
      expected[locale].tags,
      locale,
    );
    assert.doesNotMatch(readIndex(locale), spanishMetadata, locale);

    const article = fs.readFileSync(
      path.join(root, locale, "blog", localizedCards[0].slug, "index.html"),
      "utf8",
    );
    assert.match(
      article,
      new RegExp(`<span>${expected[locale].date}<\\/span>`),
    );
    assert.doesNotMatch(
      article,
      spanishMetadata,
      `${locale}:${localizedCards[0].slug}`,
    );
  }
});

test("every blog index uses the shared search-first layout without editorial filler", () => {
  const forbidden =
    /plan editorial|editorial plan|redaktionsplan|julkaisusuunnitelma|una tanda publicada artículo a artículo/i;

  for (const locale of Object.keys(indexes)) {
    const html = readIndex(locale);
    assert.match(
      html,
      /<section class="subpage-hero blog-hero blog-hero--index">/,
    );
    assert.match(html, /<form class="blog-search"[^>]*data-blog-search>/);
    assert.match(html, /<input[^>]*type="search"[^>]*data-blog-search-input/);
    assert.match(html, /<p[^>]*data-blog-search-empty[^>]*hidden/);
    assert.doesNotMatch(html, forbidden, locale);
  }
});

test("localized articles do not reuse generic body paragraphs or FAQ questions", () => {
  const forbiddenBoilerplate =
    /full guide|vollständigen Ratgeber|Täysi opas|observable signal|beobachtbares Signal|havaittava signaali|current website, contact path|aktuellen Website, dem Kontaktweg|nykyiseen verkkosivuun, yhteydenottopolkuun/i;

  for (const locale of ["en", "de", "fi"]) {
    const paragraphs = [];
    const questions = [];
    const phraseOwners = new Map();
    for (const { slug } of cards(locale)) {
      const html = fs.readFileSync(
        path.join(root, locale, "blog", slug, "index.html"),
        "utf8",
      );
      const body = html.match(
        /<div class="blog-post-content"[^>]*>([\s\S]*?)<\/div>\s*<aside/,
      )?.[1];
      assert.ok(body, `${locale}:${slug}`);
      assert.doesNotMatch(body, forbiddenBoilerplate, `${locale}:${slug}`);
      assert.ok(
        [...body.matchAll(/<h2>([^<]+)<\/h2>/g)].length >= 3,
        `${locale}:${slug}: needs topic-specific section headings`,
      );
      paragraphs.push(
        ...[...body.matchAll(/<p>([^<]{60,})<\/p>/g)].map((match) =>
          match[1].trim(),
        ),
      );
      questions.push(
        ...[...body.matchAll(/<h3>([^<]+)<\/h3>/g)].map((match) =>
          match[1].trim(),
        ),
      );
      const words = body
        .replace(/<[^>]+>/g, " ")
        .toLocaleLowerCase(locale)
        .replace(/[^\p{L}\p{N}]+/gu, " ")
        .trim()
        .split(/\s+/);
      for (let index = 0; index <= words.length - 8; index += 1) {
        const phrase = words.slice(index, index + 8).join(" ");
        if (!phraseOwners.has(phrase)) phraseOwners.set(phrase, new Set());
        phraseOwners.get(phrase).add(slug);
      }
    }

    assert.equal(new Set(paragraphs).size, paragraphs.length, locale);
    assert.equal(new Set(questions).size, questions.length, locale);
    const repeatedShell = [...phraseOwners.entries()].find(
      ([, owners]) => owners.size > 2,
    );
    assert.equal(
      repeatedShell,
      undefined,
      `${locale}: repeated eight-word shell: ${repeatedShell?.[0]}`,
    );
  }
});

test("localized editorial copy is explicit slug data, not an interpolated shell", () => {
  const generator = fs.readFileSync(
    path.join(root, "scripts", "build-blog-i18n.mjs"),
    "utf8",
  );
  assert.doesNotMatch(generator, /const articleUi\s*=/);
  assert.match(generator, /localizedArticleContent/);

  const source = fs.readFileSync(
    path.join(root, "data", "blog-localized-content.mjs"),
    "utf8",
  );
  for (const { slug } of cards("es")) {
    assert.match(source, new RegExp(`^[ ]{2}["']?${slug}["']?:`, "m"), slug);
  }
});

test("localized blog pages load the shared interaction script", () => {
  for (const locale of ["en", "de", "fi"]) {
    const index = readIndex(locale);
    assert.match(index, /<script src="\.\.\/\.\.\/script\.js"><\/script>/);
    assert.match(index, /<script src="\.\.\/\.\.\/blog-search\.js"><\/script>/);

    for (const { slug } of cards(locale)) {
      const article = fs.readFileSync(
        path.join(root, locale, "blog", slug, "index.html"),
        "utf8",
      );
      assert.match(
        article,
        /<script src="\.\.\/\.\.\/\.\.\/script\.js"><\/script>/,
        `${locale}:${slug}`,
      );
    }
  }
});
