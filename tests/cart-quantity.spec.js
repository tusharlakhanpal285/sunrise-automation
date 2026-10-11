const { test, expect } = require('@playwright/test');

function getNumber(text) {
  return Number(text.replace(/[^\d]/g, ''));
}

test.describe('Cart quantity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Add to Cart' }).first().click();
    await page.getByRole('button', { name: /^Cart, 1 item/ }).click();
  });

  test('plus button doubles the subtotal', async ({ page }) => {
    // Locators
    const plusButton = page.getByRole('button', { name: '+' });
    const subtotal = page.getByText('Subtotal₹');

    const oldSubtotal = getNumber(await subtotal.innerText());

    await plusButton.click();

    await expect.poll(async () => getNumber(await subtotal.innerText())).toBe(oldSubtotal * 2);
  });

  test('minus button brings the subtotal back', async ({ page }) => {
    // Locators
    const plusButton = page.getByRole('button', { name: '+' });
    const minusButton = page.getByRole('button', { name: '−' });
    const subtotal = page.getByText('Subtotal₹');

    const oldSubtotal = getNumber(await subtotal.innerText());

    await plusButton.click();
    await expect.poll(async () => getNumber(await subtotal.innerText())).toBe(oldSubtotal * 2);

    await minusButton.click();
    await expect.poll(async () => getNumber(await subtotal.innerText())).toBe(oldSubtotal);
  });

  test('minus at quantity 1 empties the cart', async ({ page }) => {
    // Locators
    const minusButton = page.getByRole('button', { name: '−' });
    const emptyMessage = page.getByText('Your cart is empty');

    await minusButton.click();

    await expect(emptyMessage).toBeVisible();
  });
});
