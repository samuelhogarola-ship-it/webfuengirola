const { test, expect } = require('@playwright/test');

test('el blog carga y enlaza al artículo principal', async ({ page }) => {
  await page.goto('/blog/');
  await expect(page).toHaveTitle(/blog de diseño web en fuengirola/i);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://webfuengirola.com/img/blog-home-og.png');
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', 'https://webfuengirola.com/img/blog-home-og.png');
  await expect(page.getByRole('heading', { name: /ideas claras para que tu negocio venda mejor online/i })).toBeVisible();
  await expect(page.locator('a[href="./por-que-crear-una-web-en-2026/"]').first()).toBeVisible();
});

test('el post principal tiene SEO completo y enlaces internos clave', async ({ page }) => {
  await page.goto('/blog/por-que-crear-una-web-en-2026/');

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://webfuengirola.com/blog/por-que-crear-una-web-en-2026/');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /crear una web en 2026/i);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /max-snippet:-1/);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://webfuengirola.com/img/blog-web-2026-og.png');
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', 'https://webfuengirola.com/img/blog-web-2026-og.png');
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', 'https://webfuengirola.com/site.webmanifest');
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', 'https://webfuengirola.com/favicon.webp');
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  await expect(page.getByRole('link', { name: /empezar con web lite/i })).toHaveAttribute('href', '../../productos/lite-blog-wordpress/');
  await expect(page.getByRole('link', { name: /ver web express/i })).toHaveAttribute('href', '../../productos/express-300-blog-wordpress/');
  await expect(page.locator('.footer__bottom')).toContainText(/Diseñado por WF Studio/i);
});
