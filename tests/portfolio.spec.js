const { test, expect } = require('@playwright/test');

let projects = [];

test.beforeAll(async () => {
  ({ portfolioProjects: projects } = await import('../portfolio/projects-data.mjs'));
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

      expect(errors).toEqual([]);
    });
  }
});

test('sitemap incluye portfolio.html y todas las fichas nuevas', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();

  expect(xml).toContain('https://webfuengirola.com/portfolio.html');

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
