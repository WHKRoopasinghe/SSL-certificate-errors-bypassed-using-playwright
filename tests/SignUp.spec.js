
// Import Playwright testing library/
// 
import { test, expect } from '@playwright/test';

// Define the test scenario with a clear title
test('User Registration - automationexercise.com', async ({ page }) => {
  // Step 1: Navigate to the automationexercise homepage
  await page.goto('https://automationexercise.com');

  // Step 2: Click on the "Signup / Login" button from the navbar
  await page.click('a[href="/login"]');

  // Step 3: Fill in the "New User Signup!" form
  //await page.fill('input[data-qa="signup-name"]', 'John Doe'); // Name
  //await page.fill('input[data-qa="signup-email"]', 'johndoe123@email.com'); // Email

  // Unique email
const randomNumber = Math.floor(Math.random() * 10000);
const email = `testuser${randomNumber}@example.com`;
await page.fill('input[data-qa="signup-name"]', 'John Doe');
await page.fill('input[data-qa="signup-email"]', email);

  // Step 4: Click the "Signup" button
  //await page.click('button[data-qa="signup-button"]');

  // Click signup and wait for navigation
await Promise.all([
  page.waitForNavigation(),
  page.click('button[data-qa="signup-button"]')
]);

// Debug page title
console.log('Page title after signup:', await page.title());

// Wait for gender radio to confirm we're on next form
await page.waitForSelector('#id_gender1');

  // Step 5: On the next page, fill out additional registration details
await page.waitForSelector('#id_gender1'); // Wait until gender radio appears
await page.check('#id_gender1');
await page.fill('#password', 'TestPass123');
await page.selectOption('#days', '10');
await page.selectOption('#months', '5');
await page.selectOption('#years', '1995');

// Address info
await page.fill('#first_name', 'John');
await page.fill('#last_name', 'Doe');
await page.fill('#address1', '123 Main Street');
await page.selectOption('#country', 'United States');
await page.fill('#state', 'New York');
await page.fill('#city', 'New York');
await page.fill('#zipcode', '10001');
await page.fill('#mobile_number', '1234567890');

// Click "Create Account"
await page.click('button[data-qa="create-account"]');

// Wait and verify confirmation
await page.waitForSelector('h2[data-qa="account-created"]');
await expect(page.locator('h2[data-qa="account-created"]')).toHaveText('Account Created!');


  // Step 7: Verify success message after registration
  //await expect(page.locator('h2[data-qa="account-created"]')).toHaveText('ACCOUNT CREATED!');

  // Step 8: Click "Continue" to go to the homepage
  await page.click('a[data-qa="continue-button"]');

  // Final assertion: Check that user is logged in by confirming the presence of "Logged in as" text
  await expect(page.locator('a:has-text("Logged in as John Doe")')).toBeVisible();
});
