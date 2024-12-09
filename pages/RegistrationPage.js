
export class RegistrationPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToBaseURL() {
        await this.page.goto('/');
    }

    async clickSignUpButton() {
        await this.page.getByRole('button', { name: 'Sign up' }).click();
    }

    async fillRegistrationForm() {
        const user = {
            name: 'dasha',
            lastName: 'tolstaya',
            email: `aqa-${Date.now()}@test.com`,
            password: 'Test1234',
            reEnterPassword: 'Test1234',
        };

        await this.page.locator('#signupName').fill(user.name);
        await this.page.locator('#signupLastName').fill(user.lastName);
        await this.page.getByLabel('Email').fill(user.email);
        await this.page.getByLabel('Password', { exact: true }).fill(user.password);
        await this.page.getByLabel('Re-enter password').fill(user.reEnterPassword);
    }

    async clickRegisterButton() {
        await this.page.getByRole('button', { name: 'Register' }).click();
    }
}
