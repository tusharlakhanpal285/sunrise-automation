const { test, expect } = require('@playwright/test');

test('add a product to cart and see it in the cart', async ({ page }) => {

  const addToCartButton = page.getByRole('button', { name: 'Add to Cart' }).first();
  const cartButton = page.getByRole('button', { name: /^Cart, 1 item/ });
  const cartTitle = page.getByText('Your Cart');
  const subtotal = page.getByText('Subtotal');

  await page.goto('/');

  // Add first product to cart
  await addToCartButton.click();

  // Cart button now shows 1 item
  await expect(cartButton).toBeVisible();

  // Open cart
  await cartButton.click();

  // Verify cart panel content
  await expect(cartTitle).toBeVisible();
  await expect(subtotal).toBeVisible();
});