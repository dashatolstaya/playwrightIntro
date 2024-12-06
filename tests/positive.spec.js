import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe('POM Positive Registration Tests', () => {
    let registrationPage;

    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        await registrationPage.navigateToBaseURL();
    });

    test('Positive registration test', async ({ page }) => {
        await registrationPage.clickSignUpButton();
        await registrationPage.fillRegistrationForm();
        await registrationPage.clickRegisterButton();

        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });
});