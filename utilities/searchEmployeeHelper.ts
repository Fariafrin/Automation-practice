import { Page, expect } from "@playwright/test";
import * as fs from "fs";
import { EmployeePage } from "../page_objects/pim";
import { fillInput } from "./wrappers/fill";
import { clickElement } from "./wrappers/click";

export async function searchEmployee(page: Page) {
    const employeePage = new EmployeePage(page);

    // Click on PIM link
    await clickElement(employeePage.getPIMLink());
    await expect.soft(page).toHaveURL(/.*pim.*/i);

    // Validate PIM header is visible
    await expect.soft(employeePage.getPIMHeader()).toBeVisible();

    // Read employeeId from JSON file
    const empData = JSON.parse(
        fs.readFileSync("data/employeeData.json", "utf-8"),
    );
    const employeeId = empData.employeeId;

    // Fill Employee ID Search Field using page object locator
    await fillInput(employeePage.getEmployeeIdSearchgInput(), employeeId);

    // Click Search button twice as per your original implementation
    await clickElement(employeePage.getSearchButton());
    await clickElement(employeePage.getSearchButton());

    // Click Pencil icon to edit employee details
    await clickElement(employeePage.getPencilIcon());

    await expect.soft(page).toHaveURL(/.*PersonalDetails.*/i);

    // Validate Personal Details header is visible
    await expect.soft(employeePage.getPersonalDetailsHeader()).toBeVisible();
}
