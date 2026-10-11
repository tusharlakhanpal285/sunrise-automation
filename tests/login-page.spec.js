const { test, expect } = require('@playwright/test');

test.describe('Login page', () => {
  test.beforeEach(async ({ page, isMobile }) => {
    // Locators
    const menuButton = page.getByRole('button', { name: 'Toggle menu' });
    const loginLink = page.getByRole('navigation').getByRole('link', { name: 'Login' });

    await page.goto('/');

    if (isMobile) {
      await menuButton.click();
    }

    await loginLink.click();
  });

  test('login form is shown', async ({ page }) => {
    // Locators
    const emailField = page.getByRole('textbox', { name: 'Email' });
    const loginButton = page.getByRole('button', { name: 'Login' });

    await expect(emailField).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  test('empty submit is blocked by the email field', async ({ page }) => {
    // Locators
    const emailField = page.getByRole('textbox', { name: 'Email' });
    const loginButton = page.getByRole('button', { name: 'Login' });

    await loginButton.click();

    const isEmpty = await emailField.evaluate((field) => field.validity.valueMissing);
    expect(isEmpty).toBe(true);
    await expect(emailField).toBeVisible();
  });
});