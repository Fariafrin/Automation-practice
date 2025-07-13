import { Page, expect } from "@playwright/test";
import * as fs from "fs";

export async function searchEmployee(page: Page) {
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

    await page.locator(".oxd-icon.bi-pencil-fill").click();

    await expect.soft(page).toHaveURL(/.*PersonalDetails.*/i);

    const pdHeader = page.locator("h6:has-text('Personal Details')");
    await expect.soft(pdHeader).toBeVisible();
}
