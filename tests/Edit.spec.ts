/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable playwright/require-top-level-describe */
/* eslint-disable playwright/no-page-pause */
import { test } from "@playwright/test";
import { login } from "../utilities/login";
import { createemployee } from "../utilities/createemployee";
import { searchEmployee } from "../utilities/searchEmployee";

test("OrangeHRM Login Test", async ({ page }) => {
    // Navigate to the Login Page
    await login(page);
    await createemployee(page);
    await searchEmployee(page);

    await page.pause();
    await page.getByPlaceholder("First Name").fill("TESTEDIT");
    await page.pause();
    await page.getByRole("button", { name: "Save" }).nth(0).click();

    await page.pause();
    // console.log("*************************************************");
});
