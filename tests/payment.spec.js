const { test, expect } = require('@playwright/test');

function getNumber(text) {
  return Number(text.replace(/[^\d]/g, ''));
}

test.describe('Payment options in cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Add to Cart' }).first().click();
    await page.getByRole('button', { name: /^Cart, 1 item/ }).click();
  });

  test('30% advance plus balance equals total', async ({ page }) => {
    // Locators
    const advanceOption = page.getByRole('button', { name: /^30% Advance/ });
    const totalAmount = page.locator('div').filter({ hasText: /^Total₹\d+$/ }).first();
    const payingNow = page.locator('div').filter({ hasText: /^Paying Now₹\d+$/ }).first();

    await advanceOption.click();

    const total = getNumber(await totalAmount.innerText());
    const advanceText = await advanceOption.innerText();
    const amounts = advanceText.match(/Pay ₹(\d+) now\.\s*Balance ₹(\d+) on pickup/);
    expect(amounts, `Unexpected text: ${advanceText}`).not.toBeNull();

    const advanceAmount = Number(amounts[1]);
    const balanceAmount = Number(amounts[2]);

    expect(advanceAmount + balanceAmount).toBe(total);
    expect(advanceAmount).toBeGreaterThan(0);
    expect(advanceAmount).toBeLessThan(total);
    expect(getNumber(await payingNow.innerText())).toBe(advanceAmount);
    await expect(page.getByRole('button', { name: `Pay ₹${advanceAmount} Advance` })).toBeVisible();
  });

  test('full payment shows the full total', async ({ page }) => {
    // Locators
    const fullOption = page.getByRole('button', { name: /^Full Payment/ });
    const totalAmount = page.locator('div').filter({ hasText: /^Total₹\d+$/ }).first();
    const payingNow = page.locator('div').filter({ hasText: /^Paying Now/ });

    await fullOption.click();

    const total = getNumber(await totalAmount.innerText());

    await expect(page.getByRole('button', { name: `Pay ₹${total} Full Amount` })).toBeVisible();
    await expect(payingNow).toHaveCount(0);
  });
});