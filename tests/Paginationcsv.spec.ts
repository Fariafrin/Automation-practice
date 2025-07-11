/* eslint-disable playwright/require-soft-assertions */
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

    // Click on "Configuration" menu
    await page
        .locator("span.oxd-topbar-body-nav-tab-item")
        .filter({ hasText: "Configuration" })
        .click();

    // Click on "Data Import" from dropdown
    await page
        .locator("a.oxd-topbar-body-nav-tab-link")
        .filter({ hasText: "Data Import" })
        .click();

    // Verify the navigation
    await expect(page).toHaveURL(/.*\/pimCsvImport*/i);

    // Upload CSV file
    const filePath = "data/employee_data.csv";

    const fileInput = page.locator("input[type='file']");
    await fileInput.setInputFiles(filePath);

    // Optional: Click Upload button if it's not auto-triggered
    await page.getByRole("button", { name: "Upload" }).click();

    // // Optional: Verify success message or upload status
    // const successMessage = page.locator("div.oxd-toast-content");
    // await expect(successMessage).toContainText("Successfully Uploaded");

    await page.pause();
});
