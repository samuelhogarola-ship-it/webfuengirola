const { test, expect } = require('@playwright/test');

let projects = [];
let productCategories = [];

test.beforeAll(async () => {
  ({ portfolioProjects: projects, productCategories } = await import('../portfolio/projects-data.mjs'));
});

test('portfolio listing enlaza cada tarjeta a su ficha propia', async ({ page }) => {
  await page.goto('/portfolio.html');

  for (const project of projects) {
    const href = `portfolio/${project.slug}/`;
    await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
  }
});

test.describe('portfolio detail pages', () => {
  for (const projectSlug of [
    'vokabellab',
    'samuel-coach-aleman',
    'personal-trainer-fuengirola',
    'im-kontext-vokabellab',
    'der-die-das-vokabellab',
    'sport-massage-fuengirola',
    'agama',
    'fisioapp-panel-clinica',
  ]) {
    test(`${projectSlug} carga con SEO y contenido base`, async ({ page }) => {
      const project = projects.find((item) => item.slug === projectSlug);
      const errors = [];

      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      await page.goto(`/portfolio/${projectSlug}/`);

      await expect(page).toHaveTitle(project.seoTitle);
      await expect(page.locator('h1')).toHaveText(project.title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', project.seoDescription);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://webfuengirola.com/portfolio/${project.slug}/`);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', project.seoTitle);
      await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', project.seoDescription);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', project.ogImage);
      await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', project.seoTitle);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
      await expect(page.locator('.project-breadcrumb')).toContainText('Portfolio');
      await expect(page.locator('.project-detail__image')).toHaveAttribute('alt', project.imageAlt);
      await expect(page.locator('.project-subhero__actions .btn--primary')).toHaveAttribute('href', project.url);
      await expect(page.locator('.project-subhero__actions .btn--primary')).toContainText(project.urlLabel);
      const productCategory = productCategories.find((item) => item.slug === project.productCategorySlug);
      if (productCategory) {
        await expect(page.locator('.project-detail__facts')).toContainText(productCategory.label);
      }

      expect(errors).toEqual([]);
    });
  }
});

test('servicios enlaza a todas las páginas filtradas por categoría de producto', async ({ page }) => {
  await page.goto('/servicios.html');

  for (const category of productCategories) {
    await expect(page.locator(`a[href="productos/${category.slug}/"]`).first()).toBeVisible();
  }
});

test.describe('product category pages', () => {
  for (const categorySlug of [
    'lite-blog-wordpress',
    'express-300-blog-wordpress',
    'web-personalizada',
    'express-migracion-optimizacion-formularios',
    'personalizada-webapp',
    'mini-saas-personalizado',
  ]) {
    test(`${categorySlug} carga y muestra solo sus proyectos`, async ({ page }) => {
      const category = productCategories.find((item) => item.slug === categorySlug);
      const filteredProjects = projects.filter((item) => item.productCategorySlug === categorySlug);
      expect(filteredProjects.length).toBeGreaterThan(0);

      await page.goto(`/productos/${categorySlug}/`);

      await expect(page).toHaveTitle(category.seoTitle);
      await expect(page.locator('h1')).toHaveText(category.heroTitle);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', category.seoDescription);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://webfuengirola.com/productos/${category.slug}/`);
      await expect(page.locator('.portfolio-card')).toHaveCount(filteredProjects.length);
      await expect(page.locator('.project-detail__cta').first()).toContainText(category.label);

      const visibleTitles = await page.locator('.portfolio-card__title-link').allTextContents();
      expect(visibleTitles).toEqual(filteredProjects.map((item) => item.title));
    });
  }
});

test('sitemap incluye portfolio.html, categorías de producto y todas las fichas nuevas', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();

  expect(xml).toContain('https://webfuengirola.com/portfolio.html');
  for (const category of productCategories) {
    expect(xml).toContain(`https://webfuengirola.com/productos/${category.slug}/`);
  }

  for (const project of projects) {
    expect(xml).toContain(`https://webfuengirola.com/portfolio/${project.slug}/`);
  }
});

test('ficha de proyecto mantiene CTA visible en móvil', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/portfolio/fisioapp-panel-clinica/');

  await expect(page.locator('.project-subhero__actions')).toBeVisible();
  await expect(page.getByRole('link', { name: /quiero algo as[ií]/i })).toBeVisible();
  await expect(page.locator('.project-detail__cta')).toBeVisible();
});

test('la imagen principal de FisioApp enlaza a la demo comercial', async ({ page }) => {
  await page.goto('/portfolio/fisioapp-panel-clinica/');

  await expect(page.locator('.project-detail__image-card')).toHaveAttribute('href', 'https://webfuengirola.com/portfolio/demo.html');
  await expect(page.locator('.project-detail__image-card')).toHaveAttribute('aria-label', /probar demo/i);
});
