import {
    test,
    expect
} from '../../fixtures/testFixtures';

import loginData from '../../test-data/loginData.json';

test.describe(
    'OrangeHRM - Login Test Suite',
    () => {

        test.beforeEach(
            async ({ loginPage }) => {

                await loginPage.goto();

                await loginPage.verifyLoginPage();
            }
        );

        // ==========================================
        // POSITIVE TEST CASES
        // ==========================================

        test(
            'TC001 - Login with valid credentials',
            async ({
                loginPage,
                dashboardPage
            }) => {

                await loginPage.login(
                    loginData.validUser.username,
                    loginData.validUser.password
                );

                await dashboardPage.verifyDashboard();
            }
        );

        // ==========================================
        // NEGATIVE TEST CASES
        // ==========================================

        test(
            'TC002 - Login with invalid credentials',
            async ({
                loginPage
            }) => {

                await loginPage.login(
                    loginData.invalidUser.username,
                    loginData.invalidUser.password
                );

                await loginPage
                    .verifyInvalidLoginMessage();
            }
        );

        test(
            'TC003 - Valid username with invalid password',
            async ({
                loginPage
            }) => {

                await loginPage.login(
                    loginData.invalidPassword.username,
                    loginData.invalidPassword.password
                );

                await loginPage
                    .verifyInvalidLoginMessage();
            }
        );

        test(
            'TC004 - Login with empty username',
            async ({
                loginPage
            }) => {

                await loginPage.login(
                    loginData.emptyUsername.username,
                    loginData.emptyUsername.password
                );

                await loginPage
                    .verifyRequiredMessage();
            }
        );

        test(
            'TC005 - Login with empty password',
            async ({
                loginPage
            }) => {

                await loginPage.login(
                    loginData.emptyPassword.username,
                    loginData.emptyPassword.password
                );

                await loginPage
                    .verifyRequiredMessage();
            }
        );

        test(
            'TC006 - Login with empty username and password',
            async ({
                loginPage
            }) => {

                await loginPage.login(
                    '',
                    ''
                );

                await loginPage
                    .verifyRequiredMessage();
            }
        );
    }
);