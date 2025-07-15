import { Page, Locator, expect } from "@playwright/test";

// Wrapper for navigation
export async function gotoURL(page: Page, url: string) {
    await page.goto(url);
}
