
import { test, expect } from '@playwright/test';

test('Login with standard user on saucedemo.com', async ({ browser }) => {
  // 1. Create a new context with SSL errors ignored
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
  });

  // 2. Create a new page from the secure context
  const page = await context.newPage();

  // 3. Navigate to the login page
  await page.goto('https://www.saucedemo.com', { timeout: 60000 });

  // 4. Fill in login credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');

  // 5. Click the login button
  await page.click('#login-button');

  // 6. Verify successful login
  const inventoryList = page.locator('.inventory_list');
  await expect(inventoryList).toBeVisible({ timeout: 10000 });
});
