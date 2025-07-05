/* eslint-disable playwright/no-page-pause */
import { test, expect } from "@playwright/test";
import { login } from "../utilities/login";
import * as fs from "fs";

test("OrangeHRM Add Employee Test", async ({ page }) => {
    await login(page);

    await page.getByRole("link", { name: "PIM" }).click();
    await expect.soft(page).toHaveURL(/.*pim.*/i);

    const pimHeader = page.locator("h5:has-text('Employee Information')");
    await expect.soft(pimHeader).toBeVisible();

    await page.getByRole("button", { name: " Add" }).click();
    await expect.soft(page).toHaveURL(/.*pim.*/i);

    const addempHeader = page.locator("h6:has-text('Add Employee')");
    await expect.soft(addempHeader).toBeVisible();

    await page.getByPlaceholder("First Name").fill("Lisa");
    await page.getByPlaceholder("Middle Name").fill("AF");
    await page.getByPlaceholder("Last Name").fill("RiN");

    // Capture employee ID
    //await page.getByRole("textbox").nth(4).fill("9102");

    // Function to generate a 10-digit unique ID
    function generate10DigitID(): string {
        const min = 1000000000; // Smallest 10-digit number
        const max = 9999999999; // Largest 10-digit number
        return Math.floor(Math.random() * (max - min + 1) + min).toString();
    }

    // Fill employee ID field
    const uniqueEmpID = generate10DigitID();

    await page.getByRole("textbox").nth(4).fill(uniqueEmpID);

    // Save employee ID to JSON file
    const empData = { employeeId: uniqueEmpID };
    fs.writeFileSync(
        "data/employeeData.json",
        JSON.stringify(empData, null, 2),
    );

    await page.getByRole("button", { name: "Save" }).click();

    await expect.soft(page).toHaveURL(/.*PersonalDetails.*/i);

    const pdHeader = page.locator("h6:has-text('Personal Details')");
    await expect.soft(pdHeader).toBeVisible();

    // await page.pause();
});
