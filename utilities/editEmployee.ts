/* eslint-disable playwright/no-page-pause */
import { Page } from "@playwright/test";

export async function editEmployee(page: Page) {
    await page.getByPlaceholder("First Name").fill("TESTEDIT");
    await page.pause();
    await page.getByRole("button", { name: "Save" }).nth(0).click();

    await page.pause();
}
