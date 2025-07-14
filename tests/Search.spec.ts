/* eslint-disable playwright/require-top-level-describe */
/* eslint-disable playwright/no-page-pause */
import { test, expect } from "@playwright/test";
import { login } from "../utilities/login";
import { createemployee } from "../utilities/createemployee";
import * as fs from "fs";

test.describe("OrangeHRM Tests", () => {
    //This runs before each test in this describe block
    test.beforeEach(async ({ page }) => {
        await login(page); // Login step
        await createemployee(page); // Employee creation
    });

    test("OrangeHRM Login Test", async ({ page }) => {
        // Navigate to the Login Page
        // await login(page);

        // await createemployee(page);

        await page.getByRole("link", { name: "PIM" }).click();
        await expect.soft(page).toHaveURL(/.*pim.*/i);

        const pimHeader = page.locator("h5:has-text('Employee Information')");
        await expect.soft(pimHeader).toBeVisible();

        // Read employeeId from JSON file
        const empData = JSON.parse(
            fs.readFileSync("data/employeeData.json", "utf-8"),
        );
        const employeeId = empData.employeeId;

        // Fill Employee ID Search Field
        await page.getByRole("textbox").nth(2).fill(employeeId);

        await page.getByRole("button", { name: "Search" }).click();
        await page.getByRole("button", { name: "Search" }).click();

        await page.pause();
        // console.log("*************************************************");
    });
});
