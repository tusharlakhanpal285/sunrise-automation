const { test, expect } = require('@playwright/test');

test('homepage loads', async ({ page }) => {
  const shopNowButton = page.getByRole('button', { name: 'Shop Now' });

  await page.goto('/');

  await expect(page).toHaveTitle(/Sunrise Stationery/);
  await expect(shopNowButton).toBeVisible();
});

test('cart opens and closes', async ({ page }) => {
  const cartButton = page.getByRole('button', { name: 'Cart', exact: true });
  const closeCartButton = page.getByRole('button', { name: '×' });

  // Open website
  await page.goto('/');

  // Open cart
  await cartButton.click();
  await expect(closeCartButton).toBeVisible();

  // Close cart
  await closeCartButton.click();
  await expect(closeCartButton).not.toBeInViewport();
});