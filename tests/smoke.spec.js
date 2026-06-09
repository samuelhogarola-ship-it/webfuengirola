const { test, expect } = require('@playwright/test');

test('landing principal carga con hero y CTA principal', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Web Fuengirola/i);
  await expect(page.locator('.hero__title')).toBeVisible();
  await expect(page.getByRole('link', { name: /pedir presupuesto/i }).first()).toBeVisible();
});

test('landing muestra los botones principales del hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /pedir presupuesto/i }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /ver trabajos/i })).toBeVisible();
});

test('servicios presenta las cuatro categorías principales', async ({ page }) => {
  await page.goto('/servicios.html');

  await expect(page.getByRole('heading', { name: /trabajos reales para entender cómo se ve una web bien planteada/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /un trato directo para negocios que necesitan una web clara y útil/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /una forma rápida de entender qué servicio encaja mejor/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /webs para cada fase de tu negocio/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /mejora, migración y optimización/i })).toBeVisible();
  await expect(page.locator('#categoria-herramientas').getByRole('heading', { name: /herramientas digitales a medida/i })).toBeVisible();
  await expect(page.locator('#categoria-ia').getByRole('heading', { name: /no se trata de usar tecnología por usarla/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /ver proyectos/i }).first()).toBeVisible();
  await expect(page.locator('a[href="productos/lite-blog-wordpress/"]').first()).toBeVisible();
  await expect(page.locator('a[href="productos/mini-saas-personalizado/"]').first()).toBeVisible();
});
