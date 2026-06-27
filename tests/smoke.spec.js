const { test, expect } = require("@playwright/test");

test("landing principal carga con hero y CTA principal", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Web Fuengirola/i);
  await expect(page.locator("h1")).toBeVisible();
  await expect(
    page.getByRole("link", { name: /pedir presupuesto/i }).first(),
  ).toBeVisible();
});

test("landing muestra los botones principales del hero", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: /pedir presupuesto/i }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /ver servicios/i }),
  ).toBeVisible();
});

test("servicios presenta las cuatro categorías principales", async ({
  page,
}) => {
  await page.goto("/servicios/");

  await expect(page).toHaveTitle(/servicios de diseño web en fuengirola/i);
  await expect(
    page.getByRole("heading", { name: /lo que hacemos/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /diseño web/i }).first(),
  ).toBeVisible();
  await expect(
    page
      .locator(
        'a[href="../servicios/diseno-web/"], a[href="/servicios/diseno-web/"]',
      )
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator(
        'a[href="../servicios/seo-local/"], a[href="/servicios/seo-local/"]',
      )
      .first(),
  ).toBeVisible();
});
