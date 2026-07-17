const { test, expect } = require("@playwright/test");

test("el blog carga y enlaza al artículo principal", async ({ page }) => {
  await page.goto("/blog/");
  await expect(page).toHaveTitle(/blog de diseño web en fuengirola/i);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://webfuengirola.com/img/blog-home-og.png",
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    "https://webfuengirola.com/img/blog-home-og.png",
  );
  await expect(
    page.getByRole("heading", {
      name: /ideas claras para que tu negocio venda mejor online/i,
    }),
  ).toBeVisible();
  await expect(page.locator(".blog-card__image").first()).toBeVisible();
  await expect(
    page.locator('a[href="./por-que-crear-una-web-en-2026/"]').first(),
  ).toBeVisible();
  await expect(page.locator('a[href="../en/blog/"]')).toHaveAttribute(
    "hreflang",
    "en",
  );
  await expect(page.locator('a[href="../de/blog/"]')).toHaveAttribute(
    "hreflang",
    "de",
  );
  await expect(page.locator('a[href="../fi/blog/"]')).toHaveAttribute(
    "hreflang",
    "fi",
  );
});

test("el post principal tiene SEO completo y enlaces internos clave", async ({
  page,
}) => {
  await page.goto("/blog/por-que-crear-una-web-en-2026/");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://webfuengirola.com/blog/por-que-crear-una-web-en-2026/",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /crear una web en 2026/i,
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /max-snippet:-1/,
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "article",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://webfuengirola.com/img/blog-web-2026-og.png",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    "https://webfuengirola.com/img/blog-web-2026-og.png",
  );
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
    "href",
    "https://webfuengirola.com/site.webmanifest",
  );
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    "href",
    "https://webfuengirola.com/favicon.webp",
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    1,
  );
  await expect(page.locator(".blog-featured-media__image")).toBeVisible();
  await expect(
    page.getByRole("link", { name: /empezar con web lite/i }),
  ).toHaveAttribute("href", "../../productos/lite-blog-wordpress/");
  await expect(
    page.getByRole("link", { name: /ver web express/i }),
  ).toHaveAttribute("href", "../../productos/express-300-blog-wordpress/");
  await expect(page.locator(".footer__bottom")).toContainText(
    /Web Fuengirola\. Todos los derechos reservados\./i,
  );
});

test("el blog existe en los idiomas disponibles y declara hreflang", async ({
  page,
}) => {
  for (const lang of ["en", "de", "fi"]) {
    await page.goto(`/${lang}/blog/`);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://webfuengirola.com/${lang}/blog/`,
    );
    await expect(page.locator('link[hreflang="es"]')).toHaveAttribute(
      "href",
      "https://webfuengirola.com/blog/",
    );
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
      "href",
      "https://webfuengirola.com/en/blog/",
    );
    await expect(page.locator('link[hreflang="de"]')).toHaveAttribute(
      "href",
      "https://webfuengirola.com/de/blog/",
    );
    await expect(page.locator('link[hreflang="fi"]')).toHaveAttribute(
      "href",
      "https://webfuengirola.com/fi/blog/",
    );
    await expect(page.locator(".blog-card")).toHaveCount(21);
  }

  await page.goto("/en/blog/diseno-web-para-negocio-local-en-fuengirola/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://webfuengirola.com/en/blog/diseno-web-para-negocio-local-en-fuengirola/",
  );
  await expect(
    page.getByRole("heading", { name: /web design for local businesses/i }),
  ).toBeVisible();
  await expect
    .poll(async () =>
      page
        .locator('script[type="application/ld+json"]')
        .first()
        .evaluate((node) => node.textContent),
    )
    .toContain("BlogPosting");
});
