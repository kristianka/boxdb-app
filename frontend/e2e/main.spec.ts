/* eslint-disable quotes */
import { test, expect } from "@playwright/test";

const url = "http://localhost";

test.describe("Boxdb-app frontend", async () => {
  // Go to the main page
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test("It loads", async ({ page }) => {
    const title = await page.title();
    expect(title).toBe("Box database");
  });

  test("You can add a box", async ({ page }) => {
    await page.click("[data-testid=addBoxButton]");
    await page.fill('input[id="width"]', "10");
    await page.fill('input[id="height"]', "20");
    await page.fill('input[id="depth"]', "30");
    await page.fill('input[id="comment"]', "This is a test box");
    await page.click("[data-testid=submitBoxButton]");
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
      await page.screenshot({
        path: `./e2e/screenshots/${testInfo.title.replace(/ /g, "_")}.png`,
      });
    }
  });
});
