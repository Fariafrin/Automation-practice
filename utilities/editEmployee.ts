/* eslint-disable playwright/no-page-pause */
import { Page } from "@playwright/test";
import { clickElement } from "../utilities/wrappers/click";
import { fillInput } from "../utilities/wrappers/fill";
import { EmployeePage } from "../page_objects/pim";
export async function editEmployee(page: Page) {
    const employeePage = new EmployeePage(page);

    await fillInput(employeePage.getFirstNameEditInput(), "TestEdit");
    await clickElement(employeePage.getSaveEditButton());

    await page.pause();
}
