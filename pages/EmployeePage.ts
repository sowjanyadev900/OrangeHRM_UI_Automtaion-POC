import {
    Page,
    Locator,
    expect
} from '@playwright/test';

export class EmployeePage {

    readonly page: Page;

    readonly pimMenu: Locator;
    readonly addEmployeeButton: Locator;

    readonly firstNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly lastNameInput: Locator;

    readonly saveButton: Locator;

    readonly requiredMessage: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.pimMenu =
            page.getByRole('link', {
                name: 'PIM'
            });

        this.addEmployeeButton =
            page.getByRole('link', {
                name: 'Add Employee'
            });

        this.firstNameInput =
            page.getByPlaceholder('First Name');

        this.middleNameInput =
            page.getByPlaceholder('Middle Name');

        this.lastNameInput =
            page.getByPlaceholder('Last Name');

        this.saveButton =
            page.getByRole('button', {
                name: 'Save'
            });

        this.requiredMessage =
            page.locator(
                '.oxd-input-group__message'
            );

        this.successMessage =
            page.getByText(
                'Successfully Saved'
            );
    }

    async openPIM(): Promise<void> {

        await this.pimMenu.click();

        await expect(
            this.page.getByRole('heading', {
                name: 'PIM'
            })
        ).toBeVisible();
    }

    async clickAddEmployee(): Promise<void> {

        await this.addEmployeeButton.click();

        await expect(
            this.page.getByRole('heading', {
                name: 'Add Employee'
            })
        ).toBeVisible();
    }

    async addEmployee(
        firstName: string,
        middleName: string,
        lastName: string
    ): Promise<void> {

        await this.firstNameInput.fill(firstName);

        await this.middleNameInput.fill(middleName);

        await this.lastNameInput.fill(lastName);

        await this.saveButton.click();
    }

    async verifyRequiredValidation(): Promise<void> {

        await expect(
            this.requiredMessage.first()
        ).toContainText('Required');
    }

    async verifyEmployeeSaved(): Promise<void> {

        await expect(
            this.successMessage
        ).toBeVisible();
    }
}