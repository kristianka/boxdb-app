/* eslint-disable quotes */
import { test, expect } from "@playwright/test";

// change to http://localhost:5173 if run outside docker locally
const url = "http://localhost";

test.describe("Boxdb-app frontend", async () => {
  const random = Math.floor(Math.random() * 1000);
  // Go to the main page
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test("It loads", async ({ page }) => {
    const title = await page.title();
    expect(title).toBe("Box database");
    await expect(page.locator('text="Box dimensions database"')).toHaveCount(1);
  });

  test("You can add a box", async ({ page }) => {
    await page.click("[data-testid=addBoxButton]");
    await page.fill('input[id="width"]', "10");
    await page.fill('input[id="height"]', "20");
    await page.fill('input[id="depth"]', "30");
    await page.fill('[data-testid="comment"]', `This is a test box ${random}`);
    await page.click("[data-testid=submitBoxButton]");
  });

  test("Added box is displayed in the list", async ({ page }) => {
    const boxLabel = `This is a test box ${random}`;
    const box = await page.getByLabel(boxLabel);
    expect(box).not.toBeNull();
  });

  test("You can click the box and view detailed info", async ({ page }) => {
    const boxLabel = `This is a test box ${random}`;
    const boxListItem = await page
      .locator('[data-testid="BoxListItem"]')
      .first();
    expect(boxListItem).not.toBeNull();
    await boxListItem.click();

    const msg = page.getByText("Click on a box to see its information");
    await expect(msg).toHaveCount(0);

    // Check that the box details are displayed
    await expect(page.getByTestId("BoxDetailsId")).not.toBeNull();
    await expect(page.getByTestId("BoxDetailsUndoButton")).not.toBeNull();
    await expect(page.getByTestId("BoxDetailsDeleteButton")).not.toBeNull();

    // Verify the width, height, and depth input values. needs to be done like this
    // since they are number inputs
    await expect(page.locator('[data-testid="BoxDetailsWidth"]')).toHaveValue(
      "10",
    );
    await expect(page.locator('[data-testid="BoxDetailsHeight"]')).toHaveValue(
      "20",
    );
    await expect(page.locator('[data-testid="BoxDetailsDepth"]')).toHaveValue(
      "30",
    );
    await expect(page.getByTestId("BoxDetailsComment")).toHaveText(boxLabel);
    await expect(page.getByTestId("BoxDetailsSubmitButton")).not.toBeNull();
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log("Taking screenshot to /e2e/screenshots/");
    await page.screenshot({
      path: `./e2e/screenshots/${testInfo.title.replace(/ /g, "_")}.png`,
    });
  });
});
