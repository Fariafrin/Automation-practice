import { expect, Page } from "@playwright/test";
import { clickElement } from "./wrappers/click";
import { fillInput } from "./wrappers/fill";
import { EmployeePage } from "../page_objects/pim";
import * as fs from "fs";
// export async function deleteEmployee(page: Page) {
//     const employeePage = new EmployeePage(page);

//     const pimHeader = page.locator("h5:has-text('Employee Information')");
//     // Read employeeId from JSON file
//     const empData = JSON.parse(
//         fs.readFileSync("data/employeeData.json", "utf-8"),
//     );
//     const employeeId = empData.employeeId;

//     const PIMLink = page.getByRole("link", { name: "PIM" });
//     await clickElement(PIMLink);
//     await expect.soft(page).toHaveURL(/.*pim.*/i);

//     // const pimHeader = page.locator("h5:has-text('Employee Information')");
//     await expect.soft(pimHeader).toBeVisible();

//     //await page.pause();
//     const employeeIdSearchInput = page.getByRole("textbox").nth(2);
//     await fillInput(employeeIdSearchInput, employeeId);

//     const searchButton = page.getByRole("button", { name: "Search" });
//     await clickElement(searchButton);
//     await clickElement(searchButton);

//     const trashIcon = page.locator(".oxd-icon.bi-trash");
//     await expect.soft(trashIcon).toBeVisible();
//     await clickElement(trashIcon);

//     //await page.pause();
// }

export async function deleteEmployee(page: Page) {
    const employeePage = new EmployeePage(page);

    // Read employeeId from JSON file
    const empData = JSON.parse(
        fs.readFileSync("data/employeeData.json", "utf-8"),
    );
    const employeeId = empData.employeeId;

    await clickElement(employeePage.getPIMLink());
    await expect.soft(page).toHaveURL(/.*pim.*/i);

    await expect.soft(employeePage.getPIMHeader()).toBeVisible();

    await fillInput(employeePage.getEmployeeIdSearchInput(), employeeId);

    await clickElement(employeePage.getSearchButton());
    await clickElement(employeePage.getSearchButton());

    await expect.soft(employeePage.getTrashIcon()).toBeVisible();
    await clickElement(employeePage.getTrashIcon());
}
