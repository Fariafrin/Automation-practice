/* eslint-disable playwright/require-soft-assertions */
import { Page, expect } from "@playwright/test";

export async function uploadCSV(page: Page, filePath: string) {
    await page
        .locator("span.oxd-topbar-body-nav-tab-item")
        .filter({ hasText: "Configuration" })
        .click();

    await page
        .locator("a.oxd-topbar-body-nav-tab-link")
        .filter({ hasText: "Data Import" })
        .click();

    await expect(page).toHaveURL(/.*\/pimCsvImport*/i);
    const fileInput = page.locator("input[type='file']");
    await fileInput.setInputFiles(filePath);

    await page.getByRole("button", { name: "Upload" }).click();
    const modal = page.locator("role=document >> text=Import Details");
    await expect(modal).toBeVisible();
}
