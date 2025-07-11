/* eslint-disable playwright/require-soft-assertions */
/* eslint-disable playwright/no-page-pause */
import { test, expect } from "@playwright/test";
import { login } from "../utilities/login";
import { Page } from "@playwright/test";

test("OrangeHRM Conditional Employee Upload and Pagination Test", async ({
    page,
}) => {
    await login(page);

    // Step 1: Go to PIM
    await page.getByRole("link", { name: "PIM" }).click();
    await expect.soft(page).toHaveURL(/.*pim.*/i);

    const pimHeader = page.locator("h5:has-text('Employee Information')");
    await expect.soft(pimHeader).toBeVisible();

    // Step 2: Try clicking the next pagination button
    const nextButton = page
        .locator(
            ".oxd-pagination-page-item.oxd-pagination-page-item--previous-next",
        )
        .last();

    try {
        const isVisible = await nextButton.isVisible();

        if (isVisible) {
            await nextButton.click();
            console.log("✅ Clicked on the Next button successfully.");
        } else {
            console.log("⚠️ Next button is hidden. Uploading 60 employees...");

            // Step 3: Upload CSV if Next button is hidden
            await uploadCsv(page);

            await page.pause();
            await page.getByText("Ok").click();

            //await expect(page).toHaveURL(/.*\/pimCsvImport*/i);
            // const dataHeader = page.locator("p:has-text("Data Import")");
            // await expect.soft(dataHeader).toBeVisible();

            await page.getByRole("link", { name: "PIM" }).click();
            await expect.soft(page).toHaveURL(/.*pim.*/i);

            await expect.soft(pimHeader).toBeVisible();

            await nextButton.waitFor({ timeout: 10000 }); // waits up to 5 seconds

            // Step 4: Try clicking next again after upload
            const nextButtonAfterUpload = page
                .locator(
                    ".oxd-pagination-page-item.oxd-pagination-page-item--previous-next",
                )
                .last();

            const isVisibleAfterUpload =
                await nextButtonAfterUpload.isVisible();

            if (isVisibleAfterUpload) {
                await nextButtonAfterUpload.click();
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

// Helper function to upload CSV
async function uploadCsv(page: Page) {
    // Go to Data Import
    await page
        .locator("span.oxd-topbar-body-nav-tab-item")
        .filter({ hasText: "Configuration" })
        .click();

    await page
        .locator("a.oxd-topbar-body-nav-tab-link")
        .filter({ hasText: "Data Import" })
        .click();

    await expect(page).toHaveURL(/.*\/pimCsvImport*/i);

    // Upload CSV file
    const filePath = "data/employee_data.csv";
    const fileInput = page.locator("input[type='file']");
    await fileInput.setInputFiles(filePath);

    // Click Upload
    await page.getByRole("button", { name: "Upload" }).click();

    // Optionally check success message
    const successToast = page.locator(".oxd-toast-content");
    await expect(successToast).toContainText("Successfully Uploaded");
}
