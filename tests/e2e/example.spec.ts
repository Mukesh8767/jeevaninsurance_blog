import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/JivanSecure/);
});

test('navigation works', async ({ page }) => {
    await page.goto('/');
    await page.click('text=About Satish Mishra');
    await expect(page.locator('#about')).toBeVisible();
});
