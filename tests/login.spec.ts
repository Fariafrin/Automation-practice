import { test } from "@playwright/test";
import { login } from "../utilities/loginHelper";

test.describe("OrangeHRM Tests", () => {
    test("OrangeHRM Login Test", async ({ page }) => {
        await login(page);
    });
});
