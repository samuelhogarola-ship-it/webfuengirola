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

  await expect(page.getByRole('heading', { name: /webs para cada fase de tu negocio/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /mejora, migración y optimización/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /chatbots y asistentes entrenados con tu negocio/i })).toBeVisible();
  await expect(page.locator('#categoria-herramientas').getByRole('heading', { name: /herramientas digitales a medida/i })).toBeVisible();
  await expect(page.locator('a[href="productos/lite-blog-wordpress/"]').first()).toBeVisible();
  await expect(page.locator('a[href="productos/mini-saas-personalizado/"]').first()).toBeVisible();
});
