const { test, expect } = require("@playwright/test");

const marketPages = [
  {
    route: "/mexico/",
    locale: "es-MX",
    canonical: "https://webfuengirola.com/mexico/",
    heading: /Sitios web para empresas en México/,
  },
  {
    route: "/mexico/en/",
    locale: "en-MX",
    canonical: "https://webfuengirola.com/mexico/en/",
    heading: /Websites for companies in Mexico/,
  },
];

test.beforeEach(async ({ page }) => {
  await page.route(
    "https://admin.webfuengirola.com/api/contact/config",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ turnstileEnabled: false }),
      });
    },
  );
});

for (const marketPage of marketPages) {
  test(`${marketPage.route} loads with complete regional metadata`, async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    const response = await page.goto(marketPage.route);

    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toHaveText(marketPage.heading);
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      marketPage.locale,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      marketPage.canonical,
    );
    await expect(page.locator('link[hreflang="es-MX"]')).toHaveAttribute(
      "href",
      "https://webfuengirola.com/mexico/",
    );
    await expect(page.locator('link[hreflang="en-MX"]')).toHaveAttribute(
      "href",
      "https://webfuengirola.com/mexico/en/",
    );
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute(
      "href",
      "https://webfuengirola.com/mexico/",
    );
    expect(errors).toEqual([]);
  });
}

test("Mexico language and market selectors lead to the intended identities", async ({
  page,
}) => {
  await page.goto("/mexico/");
  await page.locator(".language-menu summary").click();
  const english = page.locator('.language-menu a[hreflang="en-MX"]');
  await expect(english).toHaveAttribute("href", "/mexico/en/");
  await english.click();
  await expect(page).toHaveURL(/\/mexico\/en\/$/);

  await page.locator(".market-menu summary").click();
  const spain = page.locator(
    '.market-menu a[data-analytics-target-market="spain"]',
  );
  await expect(spain).toHaveAttribute("href", "/");
  await spain.click();
  await expect(page).toHaveURL(/\/$/);
});

test("Mexico shows MXN pricing, the reference date, and market form attributes", async ({
  page,
}) => {
  await page.goto("/mexico/");

  for (const price of ["$4,400 MXN", "$7,700 MXN", "$13,100 MXN"]) {
    await expect(page.getByText(price, { exact: true })).toBeVisible();
  }
  await expect(page.getByText(/2026-10-27/)).toBeVisible();

  const form = page.locator("form[data-contact-form]");
  await expect(form).toHaveAttribute("data-form-market", "mexico");
  await expect(form).toHaveAttribute("data-form-locale", "es-MX");
  await expect(form).toHaveAttribute("data-form-currency", "MXN");
});

for (const width of [390, 1440]) {
  test(`Mexico layout has no horizontal overflow at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/mexico/");

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

    const visibleControls = [".market-menu summary", ".language-menu summary"];
    if (width === 390) visibleControls.push(".hamburger");

    for (const selector of visibleControls) {
      const box = await page.locator(selector).boundingBox();
      expect(box, selector).not.toBeNull();
      expect(box.height, selector).toBeGreaterThanOrEqual(44);
      expect(box.x + box.width, selector).toBeLessThanOrEqual(width);
    }
  });
}
