import { Page, expect } from "@playwright/test";
import * as fs from "fs";
import { clickElement } from "../utilities/wrappers/click";
import { fillInput } from "../utilities/wrappers/fill";
import { faker } from "@faker-js/faker";
import { EmployeePage } from "../page_objects/pim";

export async function createemployee(page: Page) {
    const employeePage = new EmployeePage(page);

    await clickElement(employeePage.getPIMLink());
    await expect.soft(page).toHaveURL(/.*pim.*/i);

    await expect.soft(employeePage.getPIMHeader()).toBeVisible();

    await clickElement(employeePage.getAddButton());
    await expect.soft(page).toHaveURL(/.*pim.*/i);

    await expect.soft(employeePage.getAddEmployeeHeader()).toBeVisible();

    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();

    await fillInput(employeePage.getFirstNameInput(), firstName);
    await fillInput(employeePage.getMiddleNameInput(), middleName);
    await fillInput(employeePage.getLastNameInput(), lastName);

    function generateUTCId(): string {
        // Get current UTC time in seconds since epoch
        const secondsSinceEpoch = Math.floor(Date.now() / 1000);
        // Convert to string and ensure it's max 10 digits
        return secondsSinceEpoch.toString();
    }

    const uniqueEmpID = generateUTCId();
    // await page.pause();
    // console.log("***************************");
    // console.log("Generated Employee ID:", uniqueEmpID);
    // console.log("***************************");
    await fillInput(employeePage.getEmployeeIdInput(), uniqueEmpID);

    // Save employee ID to JSON file
    const empData = { employeeId: uniqueEmpID };
    // console.log("***************************");
    console.log("Employee Data:", empData);
    // console.log("***************************");
    fs.writeFileSync(
        "data/employeeData.json",
        JSON.stringify(empData, null, 2),
    );

    await clickElement(employeePage.getSaveButton());
    await expect.soft(page).toHaveURL(/.*PersonalDetails.*/i);

    await expect.soft(employeePage.getPersonalDetailsHeader()).toBeVisible();
}
