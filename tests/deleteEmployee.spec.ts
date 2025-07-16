/* eslint-disable playwright/require-top-level-describe */
/* eslint-disable playwright/no-page-pause */
import { test, expect } from "@playwright/test";
import { login } from "../utilities/loginHelper";
import { createemployee } from "../utilities/createemployeeHelper";
import { searchEmployee } from "../utilities/searchEmployeeHelper";
import { editEmployee } from "../utilities/editEmployeeHelper";

import * as fs from "fs";

test.describe("OrangeHRM Tests", () => {
    //This runs before each test in this describe block
    test.beforeEach(async ({ page }) => {
        await login(page);
        await createemployee(page);
        await searchEmployee(page);
        await editEmployee(page);
    });

    test("OrangeHRM Delete Employee Test", async ({ page }) => {
        const pimHeader = page.locator("h5:has-text('Employee Information')");
        // Read employeeId from JSON file
        const empData = JSON.parse(
            fs.readFileSync("data/employeeData.json", "utf-8"),
        );
        const employeeId = empData.employeeId;

        await page.getByRole("link", { name: "PIM" }).click();
        await expect.soft(page).toHaveURL(/.*pim.*/i);

        // const pimHeader = page.locator("h5:has-text('Employee Information')");
        await expect.soft(pimHeader).toBeVisible();

        await page.pause();
        await page.getByRole("textbox").nth(2).fill(employeeId);

        await page.getByRole("button", { name: "Search" }).click();
        await page.getByRole("button", { name: "Search" }).click();

        await page.locator(".oxd-icon.bi-trash").click();

        console.log("*********************SUCCESS****************************");
    });
});
