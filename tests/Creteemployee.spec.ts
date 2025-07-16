import { test } from "@playwright/test";
import { login } from "../utilities/Login";
import { createemployee } from "../utilities/createemployee";

test.describe("OrangeHRM Tests", () => {
    //This runs before each test in this describe block
    test.beforeEach(async ({ page }) => {
        await login(page);
        // await createemployee(page);
    });

    test("OrangeHRM Add Employee Test", async ({ page }) => {
        await createemployee(page);
    });
});
