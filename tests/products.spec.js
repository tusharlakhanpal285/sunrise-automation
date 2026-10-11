const { test, expect } = require('@playwright/test');

test('new arrivals section ', async ({ page }) => {
  // Locators
  const newArrivalsHeading = page.getByText('New Arrivals');
  const prices = page.getByText(/₹\d+/);

  // Open website
  await page.goto('/');

  // Verify section is there
  await expect(newArrivalsHeading).toBeVisible();

  // Verify at least one product with a price is listed
  await expect(prices).not.toHaveCount(0);
  await expect(prices.first()).toBeVisible();
});