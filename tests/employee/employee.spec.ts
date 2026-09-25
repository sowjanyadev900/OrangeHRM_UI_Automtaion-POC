import { test } from '../../fixtures/testFixtures';
import employeeData from '../../test-data/employeeData.json';

test.describe('Employee Management', () => {

    // ==================================================
    // COMMON SETUP
    // ==================================================

    test.beforeEach(async ({
        dashboardPage,
        employeePage
    }) => {

        // Authentication is already available
        // through storageState.

        // Navigate to Dashboard
        await dashboardPage.goto();

        // Verify authenticated Dashboard
        await dashboardPage.verifyDashboard();

        // Open PIM
        await employeePage.openPIM();

        // Open Add Employee
        await employeePage.clickAddEmployee();
    });


    // ==================================================
    // POSITIVE SCENARIOS
    // ==================================================

    test.describe('Positive Scenarios', () => {

        test(
            'TC007 - Add employee with valid details',
            async ({ employeePage }) => {

                await employeePage.addEmployee(
                    employeeData.validEmployee.firstName,
                    employeeData.validEmployee.middleName,
                    employeeData.validEmployee.lastName
                );

                await employeePage.verifyEmployeeSaved();
            }
        );

    });


    // ==================================================
    // NEGATIVE SCENARIOS
    // ==================================================

    test.describe('Negative Scenarios', () => {

        test(
            'TC008 - Add employee without first name',
            async ({ employeePage }) => {

                await employeePage.addEmployee(
                    employeeData.employeeWithoutFirstName.firstName,
                    employeeData.employeeWithoutFirstName.middleName,
                    employeeData.employeeWithoutFirstName.lastName
                );

                await employeePage.verifyRequiredValidation();
            }
        );


        test(
            'TC009 - Add employee without last name',
            async ({ employeePage }) => {

                await employeePage.addEmployee(
                    employeeData.employeeWithoutLastName.firstName,
                    employeeData.employeeWithoutLastName.middleName,
                    employeeData.employeeWithoutLastName.lastName
                );

                await employeePage.verifyRequiredValidation();
            }
        );


        test(
            'TC010 - Add employee without any details',
            async ({ employeePage }) => {

                await employeePage.addEmployee(
                    employeeData.emptyEmployee.firstName,
                    employeeData.emptyEmployee.middleName,
                    employeeData.emptyEmployee.lastName
                );

                await employeePage.verifyRequiredValidation();
            }
        );

    });

});