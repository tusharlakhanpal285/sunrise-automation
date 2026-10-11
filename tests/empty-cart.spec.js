const { test, expect } = require('@playwright/test');

test('empty cart shows empty message', async ({ page }) => {
  // Locators
  const cartButton = page.getByRole('button', { name: 'Cart', exact: true });
  const emptyMessage = page.getByText('Your cart is empty');
  const closeButton = page.getByRole('button', { name: '×' });

  await page.goto('/');
  await cartButton.click();

  await expect(emptyMessage).toBeVisible();

  await closeButton.click();
  await expect(emptyMessage).not.toBeInViewport();
});
