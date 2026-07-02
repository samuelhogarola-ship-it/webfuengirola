const { test, expect } = require("@playwright/test");

let projects = [];
let productCategories = [];
let successCases = [];

test.beforeAll(async () => {
  ({ portfolioProjects: projects, productCategories } =
    await import("../portfolio/projects-data.mjs"));
  ({ cases: successCases } = await import("../data/cases-data.mjs"));
});

test("casos listing enlaza cada tarjeta a su ficha propia", async ({
  page,
}) => {
  await page.goto("/casos/");

  for (const project of successCases) {
    const href = `../casos/${project.slug}/`;
    await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
  }
});

test.describe("case detail pages", () => {
  for (const projectSlug of successCases.map((item) => item.slug)) {
    test(`${projectSlug} carga con SEO y contenido base`, async ({ page }) => {
      const project = successCases.find((item) => item.slug === projectSlug);
      const errors = [];

      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });

      await page.goto(`/casos/${projectSlug}/`);

      await expect(page).toHaveTitle(project.metaTitle);
      await expect(page.locator("h1")).toHaveText(project.headline);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        project.metaDescription,
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://webfuengirola.com/casos/${project.slug}/`,
      );
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        "content",
        project.metaTitle,
      );
      await expect(
        page.locator('meta[property="og:description"]'),
      ).toHaveAttribute("content", project.metaDescription);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        "content",
        project.ogImage,
      );
      await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
        "content",
        project.metaTitle,
      );
      await expect(
        page.locator('meta[name="twitter:description"]'),
      ).toHaveAttribute("content", project.metaDescription);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /index, follow/,
      );
      await expect(
        page.locator('nav[aria-label="Ruta de navegación"]'),
      ).toContainText("Casos de éxito");
      await expect(page.locator(".project-detail__panel")).toContainText(
        project.result,
      );
      await expect(page.locator("img").first()).toHaveAttribute(
        "alt",
        project.ogAlt,
      );
      await expect(
        page.getByRole("link", { name: /ver servicio/i }),
      ).toHaveAttribute("href", `../../servicios/${project.service}/`);
      await expect(
        page.getByRole("link", { name: /reto similar/i }),
      ).toHaveAttribute(
        "href",
        new RegExp("^https://wa\\.me/34622923988\\?text="),
      );
      await expect(page.locator(".tag").first()).toContainText(project.sector);
      await expect(page.locator(".tag").nth(1)).toContainText(
        project.serviceLabel,
      );

      expect(errors).toEqual([]);
    });
  }
});

test("casos muestra enlaces a fichas individuales y CTA final", async ({
  page,
}) => {
  await page.goto("/casos/");

  await expect(
    page.getByRole("heading", {
      name: /negocios reales, resultados concretos/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /hablar con nosotros/i }),
  ).toBeVisible();
});

test.describe("product category pages", () => {
  for (const categorySlug of [
    "lite-blog-wordpress",
    "express-300-blog-wordpress",
    "web-personalizada",
    "express-migracion-optimizacion-formularios",
    "personalizada-webapp",
    "mini-saas-personalizado",
  ]) {
    test(`${categorySlug} carga y muestra solo sus proyectos`, async ({
      page,
    }) => {
      const category = productCategories.find(
        (item) => item.slug === categorySlug,
      );
      const filteredProjects = projects.filter(
        (item) => item.productCategorySlug === categorySlug,
      );
      expect(filteredProjects.length).toBeGreaterThan(0);

      await page.goto(`/productos/${categorySlug}/`);

      await expect(page).toHaveTitle(category.seoTitle);
      await expect(page.locator("h1")).toHaveText(category.heroTitle);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        category.seoDescription,
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://webfuengirola.com/productos/${category.slug}/`,
      );
      await expect(page.locator(".portfolio-card")).toHaveCount(
        filteredProjects.length,
      );
      await expect(
        page.locator(".portfolio-card__title-link").first(),
      ).toHaveAttribute(
        "href",
        new RegExp(`\\.\\./\\.\\./casos/${filteredProjects[0].slug}/`),
      );
      await expect(page.locator(".project-detail__cta").first()).toContainText(
        category.label,
      );

      const visibleTitles = await page
        .locator(".portfolio-card__title-link")
        .allTextContents();
      expect(visibleTitles).toEqual(filteredProjects.map((item) => item.title));
    });
  }
});

test("sitemap incluye casos, categorías de producto y excluye páginas no indexables", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();

  expect(xml).toContain("https://webfuengirola.com/casos/");
  for (const category of productCategories) {
    expect(xml).toContain(
      `https://webfuengirola.com/productos/${category.slug}/`,
    );
  }

  for (const project of successCases) {
    expect(xml).toContain(`https://webfuengirola.com/casos/${project.slug}/`);
  }

  expect(xml).toContain("https://webfuengirola.com/blog/");
  expect(xml).toContain(
    "https://webfuengirola.com/blog/por-que-crear-una-web-en-2026/",
  );
  expect(xml).toContain(
    "https://webfuengirola.com/blog/sabias-que-cada-vez-mas-gente-usa-ia-para-encontrar-un-servicio/",
  );

  expect(xml).toContain("https://webfuengirola.com/servicios/automatizacion/");
  expect(xml).toContain(
    "https://webfuengirola.com/servicios/aplicaciones-web/",
  );
  expect(xml).toContain("https://webfuengirola.com/recursos/herramientas/");
  expect(xml).toContain("https://webfuengirola.com/recursos/guias/");
  expect(xml).toContain("https://webfuengirola.com/recursos/checklists/");

  expect(xml).not.toContain(
    "https://webfuengirola.com/portfolio/sport-massage-fuengirola/",
  );
});

test("ficha de proyecto mantiene CTA visible en móvil", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/casos/fisioapp-panel-clinica/");

  await expect(page.locator(".project-detail__panel")).toBeVisible();
  await expect(page.getByRole("link", { name: /reto similar/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /ver servicio/i })).toBeVisible();
});

test("la ficha de FisioApp expone imagen indexable y CTA de servicio", async ({
  page,
}) => {
  await page.goto("/casos/fisioapp-panel-clinica/");

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://webfuengirola.com/img/clinica-demo-v2.webp",
  );
  await expect(
    page.locator(
      'main img[alt="FisioApp Panel Clínica — caso de éxito Web Fuengirola Studio"]',
    ),
  ).toHaveAttribute(
    "alt",
    "FisioApp Panel Clínica — caso de éxito Web Fuengirola Studio",
  );
  await expect(
    page.getByRole("link", { name: /ver servicio/i }),
  ).toHaveAttribute("href", "../../servicios/aplicaciones-web/");
});
