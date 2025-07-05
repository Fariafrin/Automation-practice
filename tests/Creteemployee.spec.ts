import { test, expect } from "@playwright/test";
import { login } from "../utilities/login";

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

    // await page.getByClass("oxd-input oxd-input--active Name").fill("RiN");

    await page.getByRole("button", { name: "Save" }).click();

    await page.pause();
});
