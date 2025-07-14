/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable playwright/require-top-level-describe */
/* eslint-disable playwright/no-page-pause */
import { test } from "@playwright/test";
import { login } from "../utilities/login";
import { createemployee } from "../utilities/createemployee";
import { searchEmployee } from "../utilities/searchEmployee";

test.describe("OrangeHRM Tests", () => {
    //This runs before each test in this describe block
    test.beforeEach(async ({ page }) => {
        await login(page);
        await createemployee(page);
        await searchEmployee(page);
    });

    test("OrangeHRM Login Test", async ({ page }) => {
        await page.getByPlaceholder("First Name").fill("TESTEDIT");
        await page.pause();
        await page.getByRole("button", { name: "Save" }).nth(0).click();

        await page.pause();
        // console.log("*************************************************");
    });
});
