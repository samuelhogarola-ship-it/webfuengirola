const { test, expect } = require("@playwright/test");
const guides = require("../data/blog-guides-20261006.json");

for (const width of [1440, 390]) {
  test(`las guías son legibles y navegables a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const guide of guides) {
      await page.goto(`/blog/${guide.slug}/`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        guide.title,
      );
      const image = page.locator(".blog-featured-media__image");
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((node) => node.complete && node.naturalWidth > 0),
        )
        .toBeTruthy();
      await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(
        0,
      );
      const question = page.locator(".blog-faq__item").first();
      await question.locator("summary").click();
      await expect(question.locator("p")).toBeVisible();
      const source = page
        .locator(
          'main a[href^="https://developers.google.com/"], main a[href^="https://support.google.com/"]',
        )
        .first();
      await source.scrollIntoViewIfNeeded();
      await source.click({ trial: true });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
      await expect(
        page.getByRole("link", { name: "Diseñado por WF Studio", exact: true }),
      ).toHaveAttribute("href", "https://webfuengirola.com/");
    }
    await page.goto("/blog/");
    await expect(page.locator(".blog-card")).toHaveCount(24);
    await page.locator(`a[href="./${guides[0].slug}/"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`${guides[0].slug}/$`));
  });
}
