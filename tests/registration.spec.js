import { test, expect } from '@playwright/test';

test.describe('Positive Registration Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    });

    test('Positive registration test', async ({ page }) => {
        const user = {
            name: 'dasha',
            lastName: 'tolstaya',
            email: `aqa-${Date.now()}@test.com`,
            password: 'Test1234',
            reEnterPassword: 'Test1234',
        };

        await page.getByRole('button', { name: 'Sign up' }).click();

        await page.locator('#signupName').fill(user.name);
        await page.locator('#signupLastName').fill(user.lastName);
        await page.getByLabel('Email').fill(user.email);
        await page.getByLabel('Password', { exact: true }).fill(user.password);
        await page.getByLabel('Re-enter password').fill(user.reEnterPassword);

        await page.getByRole('button', { name: 'Register' }).click();

        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });
});


test.describe("Negative Registration Tests", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
        await page.getByRole('button', { name: 'Sign up' }).click();
    });

    test('Empty Name field', async ({ page }) => {

        await page.locator('#signupLastName').fill('Test');
        await page.getByLabel('Email').fill('test@example.com');
        await page.getByLabel('Password', { exact: true }).fill('Password123');
        await page.getByLabel('Re-enter password').fill('Password123');

        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    });

    test('Name field contains numbers', async ({ page }) => {
        await page.locator('#signupName').fill('Dasha1');
        await page.locator('#signupLastName').fill('Test');
        await page.getByLabel('Email').fill('invalidemail@com');
        await page.getByLabel('Password', { exact: true }).fill('Password123');
        await page.getByLabel('Re-enter password').fill('Password123');

        await expect(page.locator('#signupEmail + .invalid-feedback')).toHaveText('Email is incorrect');
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    });

    test('Empty Last Name field', async ({ page }) => {
        await page.locator('#signupName').fill('Dasha');
        await page.getByLabel('Email').fill('test@example.com');
        await page.getByLabel('Password', { exact: true }).fill('Password123');
        await page.getByLabel('Re-enter password').fill('Password123');

        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    });

    test('Empty Email field', async ({ page }) => {
        await page.locator('#signupName').fill('Dasha');
        await page.locator('#signupLastName').fill('Test');
        await page.getByLabel('Password', { exact: true }).fill('Password123');
        await page.getByLabel('Re-enter password').fill('Password123');

        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    });

    test('Invalid Email format', async ({ page }) => {
        await page.locator('#signupName').fill('Dasha');
        await page.locator('#signupLastName').fill('Test');
        await page.getByLabel('Email').fill('invalidemail@com');
        await page.getByLabel('Password', { exact: true }).fill('Password123');
        await page.getByLabel('Re-enter password').fill('Password123');

        await expect(page.locator('#signupEmail + .invalid-feedback')).toHaveText('Email is incorrect');
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    });

    test('Empty Password field', async ({ page }) => {
        await page.locator('#signupName').fill('Dasha');
        await page.locator('#signupLastName').fill('Test');
        await page.getByLabel('Email').fill('test@example.com');
        await page.getByLabel('Re-enter password').fill('Password123');

        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    });

    test('Empty Re-enter Password field', async ({ page }) => {
        await page.locator('#signupName').fill('Dasha');
        await page.locator('#signupLastName').fill('Test');
        await page.getByLabel('Email').fill('test@example.com');
        await page.getByLabel('Password', { exact: true }).fill('Password123');

        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    });

    test('Password less than 8 characters', async ({ page }) => {
        await page.locator('#signupName').fill('Dasha');
        await page.locator('#signupLastName').fill('Test');
        await page.getByLabel('Email').fill('test@example.com');
        await page.getByLabel('Password', { exact: true }).fill('Pass1');
        await page.getByLabel('Re-enter password').fill('Pass1');

        await expect(page.locator('#signupPassword + .invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    });

    test('Password without number', async ({ page }) => {
        await page.locator('#signupName').fill('Dasha');
        await page.locator('#signupLastName').fill('Test');
        await page.getByLabel('Email').fill('test@example.com');
        await page.getByLabel('Password', { exact: true }).fill('Qwerty');
        await page.getByLabel('Re-enter password').fill('Qwerty');

        await expect(page.locator('#signupPassword + .invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    });

    test('Password without uppercase letter', async ({ page }) => {
        await page.locator('#signupName').fill('Dasha');
        await page.locator('#signupLastName').fill('Test');
        await page.getByLabel('Email').fill('test@example.com');
        await page.getByLabel('Password', { exact: true }).fill('password123');
        await page.getByLabel('Re-enter password').fill('password123');

        await expect(page.locator('#signupPassword + .invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    });
});

