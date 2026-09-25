import {
    Page,
    Locator,
    expect
} from '@playwright/test';

export class DashboardPage {

    readonly page: Page;

    readonly dashboardHeading: Locator;
    readonly userDropdown: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {

        this.page = page;

        this.dashboardHeading =
            page.getByRole('heading', {
                name: 'Dashboard'
            });

        this.userDropdown =
            page.locator(
                '.oxd-userdropdown-name'
            );

        this.logoutLink =
            page.getByRole('menuitem', {
                name: 'Logout'
            });
    }

    // ==================================================
    // Navigate to Dashboard
    // ==================================================

    async goto(): Promise<void> {

        await this.page.goto(
            '/web/index.php/dashboard/index'
        );
    }

    // ==================================================
    // Verify Dashboard
    // ==================================================

    async verifyDashboard(): Promise<void> {

        await expect(
            this.dashboardHeading
        ).toBeVisible();
    }

    // ==================================================
    // Logout
    // ==================================================

    async logout(): Promise<void> {

        await this.userDropdown.click();

        await this.logoutLink.click();
    }
}