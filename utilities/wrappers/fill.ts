/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable playwright/require-soft-assertions */
import { Page, Locator, expect } from "@playwright/test";

// Wrapper for clicking a button or element
export async function fillInput(locator: Locator, value: string) {
    await expect(locator).toBeVisible({ timeout: 5000 });
    await locator.fill(value);
}
