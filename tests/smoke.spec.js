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

  await expect(page.getByRole('heading', { name: /webs, automatización e ia para negocios que quieren crecer/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /una selección real de lo que ya hemos desarrollado/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /cuatro líneas claras para resolver lo importante/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /un proceso corto, claro y sin ruido/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /opciones claras para empezar con el nivel que encaja contigo/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /desarrollo personalmente cada proyecto/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /cuéntame qué necesitas/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /ver portfolio completo/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /^webs$/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /tiendas online/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /ia y automatización/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /aplicaciones/i })).toBeVisible();
});
