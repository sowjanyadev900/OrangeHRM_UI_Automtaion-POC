import { test as setup } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ENV } from '../config/env';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Open login page
    await loginPage.goto();

    // Login
    await loginPage.login(
        ENV.username,
        ENV.password
    );

    // Verify successful login
    await dashboardPage.verifyDashboard();

    // Save authentication state
    await page.context().storageState({
        path: authFile
    });
});