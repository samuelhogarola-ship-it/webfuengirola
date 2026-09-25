const { test, expect } = require('@playwright/test');

for (const width of [390, 1024, 1280, 1440]) {
  test(`header and dropdown remain usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const reject = page.getByRole('button', { name: 'Rechazar', exact: true });
    if (await reject.isVisible()) await reject.click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const summary = page.locator('.language-menu summary');
    await expect(summary).toBeVisible();
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.language-menu__options')).toBeVisible();
    await expect(page.locator('.language-menu a')).toHaveCount(4);
    await page.keyboard.press('Escape');
    await expect(page.locator('.language-menu')).not.toHaveAttribute('open', '');
    if (width < 1200) {
      await page.locator('#hamburger').click();
      await expect(page.locator('#nav')).toBeVisible();
      await summary.focus();
      await page.keyboard.press('Escape');
      await expect(page.locator('#nav')).toBeHidden();
      await page.locator('#hamburger').click();
      await page.locator('#nav').getByRole('link', { name: 'Web Solidaria', exact: true }).click();
      await expect(page).toHaveURL(/\/web-solidaria\/$/);
    } else {
      await expect(page.locator('#hamburger')).toBeHidden();
      const items = await page.locator('.header__inner > *:visible').evaluateAll(nodes => nodes.map(n => { const r=n.getBoundingClientRect(); return {left:r.left,right:r.right,top:r.top,bottom:r.bottom}; }));
      for(let i=1;i<items.length;i++) expect(items[i].left).toBeGreaterThanOrEqual(items[i-1].right);
      const lines = await page.locator('#nav .nav__link').evaluateAll(nodes => nodes.map(n=>Math.round(n.getBoundingClientRect().top + n.getBoundingClientRect().height / 2)));
      expect(new Set(lines).size).toBe(1);
      await page.screenshot({ path: `output/navigation-${width}.png` });
    }
  });
}

test('language dropdown works without scripts and leads to the matching locale', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://localhost:3466/');
  await page.locator('.language-menu summary').click();
  await page.locator('.language-menu').getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await context.close();
});

test('real Vokabel Lab cover and honest Horses of Gili project are visible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/casos/');
  const image = page.locator('#vokabellab img');
  await image.scrollIntoViewIfNeeded();
  await expect(image).toHaveAttribute('src', '/img/vokabellab-real.webp');
  await expect.poll(()=>image.evaluate(img=>img.complete && img.naturalWidth===1440)).toBe(true);
  await page.goto('/web-solidaria/');
  const project = page.locator('#horses-of-gili');
  await project.scrollIntoViewIfNeeded();
  await expect(project).toContainText('En desarrollo');
  await expect(project).toContainText('Horses of Gili');
  await expect(project.getByRole('link')).toHaveAttribute('href','https://www.horsesofgili.com/wordpress/index.php');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await project.screenshot({path:'output/horses-solidaria-mobile.png'});
});
