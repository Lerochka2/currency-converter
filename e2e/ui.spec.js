const { test, expect } = require('@playwright/test');

test('Главная страница конвертера открывается', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Конвертер|Currency/i);
});
