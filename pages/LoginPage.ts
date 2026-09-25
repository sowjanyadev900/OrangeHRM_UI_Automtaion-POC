import {
    Page,
    Locator,
    expect
} from '@playwright/test';

export class LoginPage {

    readonly page: Page;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly requiredMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.usernameInput =
            page.getByPlaceholder('Username');

        this.passwordInput =
            page.getByPlaceholder('Password');

        this.loginButton =
            page.getByRole('button', {
                name: 'Login'
            });

        this.errorMessage =
            page.locator(
                '.oxd-alert-content-text'
            );

        this.requiredMessage =
            page.locator(
                '.oxd-input-group__message'
            );
    }

    async goto(): Promise<void> {

        await this.page.goto(
            '/web/index.php/auth/login'
        );
    }

    async login(
        username: string,
        password: string
    ): Promise<void> {

        await this.usernameInput.fill(username);

        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }

    async verifyLoginPage(): Promise<void> {

        await expect(
            this.loginButton
        ).toBeVisible();

        await expect(
            this.usernameInput
        ).toBeVisible();

        await expect(
            this.passwordInput
        ).toBeVisible();
    }

    async verifyInvalidLoginMessage(): Promise<void> {

        await expect(
            this.errorMessage
        ).toContainText(
            'Invalid credentials'
        );
    }

    async verifyRequiredMessage(): Promise<void> {

        await expect(
            this.requiredMessage.first()
        ).toContainText(
            'Required'
        );
    }
}