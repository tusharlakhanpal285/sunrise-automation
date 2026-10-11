const { test, expect } = require('@playwright/test');

test.describe('Product search', () => {
  test('search narrows down the product list', async ({ page }) => {
    // Test data
    const productName = 'Cellotape';

    // Locators
    const searchBox = page.getByRole('textbox', { name: 'Search products...' });
    const addToCartButtons = page.getByRole('button', { name: 'Add to Cart' });
    const productHeading = page.getByRole('heading', { name: productName });

    await page.goto('/');
    await expect(addToCartButtons.first()).toBeVisible();
    const totalProducts = await addToCartButtons.count();

    await searchBox.fill(productName);

    await expect(productHeading).toBeVisible();
    await expect.poll(() => addToCartButtons.count()).toBeLessThan(totalProducts);
  });

  test('search with no match shows no products', async ({ page }) => {
    // Locators
    const searchBox = page.getByRole('textbox', { name: 'Search products...' });
    const addToCartButtons = page.getByRole('button', { name: 'Add to Cart' });

    await page.goto('/');
    await searchBox.fill('zzzzxxxx');

    await expect(addToCartButtons).toHaveCount(0);
  });
});