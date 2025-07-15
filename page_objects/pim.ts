import { Page, Locator } from "@playwright/test";
import { basePage } from "./BasePage";

export class EmployeePage extends basePage {
    private page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
    }

    getPIMLink(): Locator {
        return this.page.getByRole("link", { name: "PIM" });
    }

    getPIMHeader(): Locator {
        return this.page.locator("h5:has-text('Employee Information')");
    }

    getAddButton(): Locator {
        return this.page.getByRole("button", { name: " Add" });
    }

    getAddEmployeeHeader(): Locator {
        return this.page.locator("h6:has-text('Add Employee')");
    }

    getFirstNameInput(): Locator {
        return this.page.getByPlaceholder("First Name");
    }

    getMiddleNameInput(): Locator {
        return this.page.getByPlaceholder("Middle Name");
    }

    getLastNameInput(): Locator {
        return this.page.getByPlaceholder("Last Name");
    }

    getEmployeeIdInput(): Locator {
        return this.page.getByRole("textbox").nth(4);
    }

    getSaveButton(): Locator {
        return this.page.getByRole("button", { name: "Save" });
    }

    getPersonalDetailsHeader(): Locator {
        return this.page.locator("h6:has-text('Personal Details')");
    }

    //searchstart
    getEmployeeIdSearchgInput(): Locator {
        return this.page.getByRole("textbox").nth(2);
    }

    getSearchButton(): Locator {
        return this.page.getByRole("button", { name: "Search" });
    }

    getPencilIcon(): Locator {
        return this.page.locator(".oxd-icon.bi-pencil-fill");
    }

    //editemployee
    getFirstNameEditInput(): Locator {
        return this.page.getByPlaceholder("First Name");
    }

    getSaveEditButton(): Locator {
        return this.page.getByRole("button", { name: "Save" }).nth(0);
    }

    // getPersonalDetailsHeader(): Locator {
    //     return this.page.locator("h6:has-text('Personal Details')");
    // }
}
