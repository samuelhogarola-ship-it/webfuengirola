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
