/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable playwright/require-soft-assertions */
import { Page, Locator, expect } from "@playwright/test";

// Wrapper for clicking a button or element
export async function clickElement(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: 5000 });
    await locator.click();
}
