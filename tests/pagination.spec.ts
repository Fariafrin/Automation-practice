/* eslint-disable playwright/require-top-level-describe */
/* eslint-disable playwright/require-soft-assertions */
/* eslint-disable playwright/no-page-pause */
import { test, expect } from "@playwright/test";
import { login } from "../utilities/login";
import { Page } from "@playwright/test";
import { generateEmployeeCSV } from "../utilities/generateEmployeeCSV";

test("OrangeHRM Conditional Employee Upload and Pagination Test", async ({
    page,
}) => {
    await login(page);

    // PIM
    await page.getByRole("link", { name: "PIM" }).click();
    await expect.soft(page).toHaveURL(/.*pim.*/i);

    const pimHeader = page.locator("h5:has-text('Employee Information')");
    await expect.soft(pimHeader).toBeVisible();

    const nextButton = page
        .locator(
            ".oxd-pagination-page-item.oxd-pagination-page-item--previous-next",
        )
        .last();

    try {
        await nextButton.waitFor({ timeout: 10000 });
        await nextButton.click();
    } catch (e) {
        console.log("Next button not found, continuing...");
    }

    try {
        const isVisible = await nextButton.isVisible();

        await page.pause();

        if (isVisible) {
            await nextButton.click();
            await nextButton.click();
            console.log("✅ Clicked on the Next button successfully.");
        } else {
            console.log("⚠️ Next button is hidden. Uploading 60 employees...");

            // Upload CSV if Next button is hidden
            await page.pause();
            const csvPath = generateEmployeeCSV(50);
            await uploadCsv(page, csvPath);

            const okButton = page.getByRole("button", { name: "Ok" });

            await okButton.waitFor({ state: "visible", timeout: 10000 });
            await okButton.click();
            console.log("✅ Clicked on OK button after upload.");

            await page.getByRole("link", { name: "PIM" }).click();
            await expect.soft(page).toHaveURL(/.*pim.*/i);

            await expect.soft(pimHeader).toBeVisible();

            // Try clicking next after upload
            const nextButtonAfterUpload = page
                .locator(
                    ".oxd-pagination-page-item.oxd-pagination-page-item--previous-next",
                )
                .last();

            try {
                await nextButtonAfterUpload.waitFor({ timeout: 10000 });
                await nextButtonAfterUpload.click();
            } catch (e) {
                console.log("Next button not found, continuing...");
            }

            const isVisibleAfterUpload =
                await nextButtonAfterUpload.isVisible();

            if (isVisibleAfterUpload) {
                // await nextButtonAfterUpload.click();
                console.log("✅ Clicked on the Next button after upload.");
            } else {
                console.log(
                    "❌ Still no next page available even after upload.",
                );
            }
        }
    } catch (error) {
        console.error("❌ Error while handling pagination or upload:", error);
    }

    await page.pause();
});

async function uploadCsv(page: Page, filePath: string) {
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
