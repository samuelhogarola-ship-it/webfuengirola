const { test, expect } = require("@playwright/test");

const pages = [
  {
    route: "/",
    market: "spain",
    locale: "es-ES",
    currency: "EUR",
    heading: "La web que tu negocio se merece.",
  },
  {
    route: "/en/",
    market: "spain",
    locale: "en-GB",
    currency: "EUR",
    heading: "The website your business deserves.",
  },
  {
    route: "/de/",
    market: "spain",
    locale: "de-DE",
    currency: "EUR",
    heading: "Die Website, die Ihr Unternehmen verdient.",
  },
  {
    route: "/fi/",
    market: "spain",
    locale: "fi-FI",
    currency: "EUR",
    heading: "Verkkosivusto, jonka yrityksesi ansaitsee.",
  },
  {
    route: "/mexico/",
    market: "mexico",
    locale: "es-MX",
    currency: "MXN",
    heading: "Sitios web para empresas en México",
  },
  {
    route: "/mexico/en/",
    market: "mexico",
    locale: "en-MX",
    currency: "MXN",
    heading: "Websites for companies in Mexico",
  },
  {
    route: "/usa/",
    market: "usa",
    locale: "en-US",
    currency: "USD",
    heading: "Websites for US businesses",
  },
  {
    route: "/usa/es/",
    market: "usa",
    locale: "es-US",
    currency: "USD",
    heading: "Webs para empresas en Estados Unidos",
  },
  {
    route: "/brasil/",
    market: "brasil",
    locale: "pt-BR",
    currency: "BRL",
    heading: "Sites para empresas no Brasil",
  },
];

const marketRoutes = {
  spain: ["/", "/en/", "/de/", "/fi/"],
  mexico: ["/mexico/", "/mexico/en/"],
  usa: ["/usa/", "/usa/es/"],
  brasil: ["/brasil/"],
};

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

test("all nine homepages load with the reference shell and isolated SEO", async ({
  page,
}) => {
  for (const entry of pages) {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    const response = await page.goto(entry.route);
    expect(response?.ok(), entry.route).toBe(true);
    await expect(page.locator("h1"), entry.route).toHaveText(entry.heading);
    await expect(page.locator("html")).toHaveAttribute("lang", entry.locale);
    await expect(page.locator("body")).toHaveAttribute(
      "data-market",
      entry.market,
    );
    await expect(page.locator("body")).toHaveAttribute(
      "data-currency",
      entry.currency,
    );
    await expect(page.locator(".hero--cinematic")).toBeVisible();
    await expect(page.locator(".stack-cards-track")).toHaveCount(1);
    await expect(page.locator(".case-showcase")).toHaveCount(1);

    const canonical = new URL(entry.route, "https://webfuengirola.com").href;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      canonical,
    );
    const alternates = await page
      .locator('link[rel="alternate"]')
      .evaluateAll((links) => links.map((link) => new URL(link.href).pathname));
    expect([...new Set(alternates)].sort(), entry.route).toEqual(
      [...marketRoutes[entry.market]].sort(),
    );
    expect(errors, entry.route).toEqual([]);
  }
});

test("language and market selectors preserve compatible languages", async ({
  page,
}) => {
  const expectedMarkets = {
    "/": {
      spain: "/",
      mexico: "/mexico/",
      usa: "/usa/es/",
      brasil: "/brasil/",
    },
    "/en/": {
      spain: "/en/",
      mexico: "/mexico/en/",
      usa: "/usa/",
      brasil: "/brasil/",
    },
    "/de/": {
      spain: "/de/",
      mexico: "/mexico/",
      usa: "/usa/",
      brasil: "/brasil/",
    },
    "/fi/": {
      spain: "/fi/",
      mexico: "/mexico/",
      usa: "/usa/",
      brasil: "/brasil/",
    },
    "/mexico/": {
      spain: "/",
      mexico: "/mexico/",
      usa: "/usa/es/",
      brasil: "/brasil/",
    },
    "/mexico/en/": {
      spain: "/en/",
      mexico: "/mexico/en/",
      usa: "/usa/",
      brasil: "/brasil/",
    },
    "/usa/": {
      spain: "/en/",
      mexico: "/mexico/en/",
      usa: "/usa/",
      brasil: "/brasil/",
    },
    "/usa/es/": {
      spain: "/",
      mexico: "/mexico/",
      usa: "/usa/es/",
      brasil: "/brasil/",
    },
    "/brasil/": {
      spain: "/",
      mexico: "/mexico/",
      usa: "/usa/",
      brasil: "/brasil/",
    },
  };

  for (const entry of pages) {
    await page.goto(entry.route);
    for (const [market, href] of Object.entries(expectedMarkets[entry.route])) {
      await expect(
        page.locator(
          `.market-menu a[data-analytics-target-market="${market}"]`,
        ),
        `${entry.route} → ${market}`,
      ).toHaveAttribute("href", href);
    }
    await expect(page.locator(".language-menu a")).toHaveCount(
      marketRoutes[entry.market].length,
    );
  }
});

test("regional prices and contact forms carry market context", async ({
  page,
}) => {
  const cases = [
    [
      "/mexico/",
      "mexico",
      "es-MX",
      "MXN",
      ["$4,400 MXN", "$7,700 MXN", "$13,100 MXN"],
    ],
    ["/usa/", "usa", "en-US", "USD", ["$235 USD", "$410 USD", "$705 USD"]],
    [
      "/brasil/",
      "brasil",
      "pt-BR",
      "BRL",
      ["R$ 1.260 BRL", "R$ 2.200 BRL", "R$ 3.760 BRL"],
    ],
  ];

  for (const [route, market, locale, currency, prices] of cases) {
    await page.goto(route);
    for (const price of prices)
      await expect(page.getByText(price, { exact: true })).toBeVisible();
    await expect(page.getByText(/2026-10-27/)).toBeVisible();
    const form = page.locator("form[data-contact-form]");
    await expect(form).toHaveAttribute("data-form-market", market);
    await expect(form).toHaveAttribute("data-form-locale", locale);
    await expect(form).toHaveAttribute("data-form-currency", currency);
    await expect(form).toHaveAttribute("data-source-route", route);
  }
});

for (const width of [390, 1440]) {
  test(`all market homepages fit and keep both selectors usable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const entry of pages) {
      await page.goto(entry.route);
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth, entry.route).toBeLessThanOrEqual(
        dimensions.clientWidth,
      );

      for (const selector of [
        ".market-menu summary",
        ".language-menu summary",
      ]) {
        const box = await page.locator(selector).boundingBox();
        expect(box, `${entry.route} ${selector}`).not.toBeNull();
        expect(box.height, `${entry.route} ${selector}`).toBeGreaterThanOrEqual(
          44,
        );
        expect(
          box.x + box.width,
          `${entry.route} ${selector}`,
        ).toBeLessThanOrEqual(width);
      }
    }
  });
}
