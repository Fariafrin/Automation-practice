import { test } from "@playwright/test";
import { login } from "../utilities/loginHelper";
import { createemployee } from "../utilities/createemployeeHelper";

test.describe("OrangeHRM Tests", () => {
    //This runs before each test in this describe block
    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test("OrangeHRM Add Employee Test", async ({ page }) => {
        await createemployee(page);
    });
});
