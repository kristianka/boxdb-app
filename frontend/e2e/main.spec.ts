/* eslint-disable quotes */
import { test, expect } from "@playwright/test";

// change to http://localhost:5173 if run outside docker locally
const url = "http://localhost";

test.describe("Boxdb-app frontend", async () => {
  // Go to the main page
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  // Frontend is reachable. If backend is down like missing env values,
  // later tests will fail
  test("It loads", async ({ page }) => {
    const title = await page.title();
    expect(title).toBe("Box database");
    await expect(page.locator('text="Box database"')).toHaveCount(1);
  });

  // Add a box
  test("You can add a box", async ({ page }) => {
    await expect(page.locator('text="No boxes found."')).toHaveCount(1);
    await page.click("[data-testid=addBoxButton]");
    await page.fill('input[id="width"]', "10");
    await page.fill('input[id="height"]', "20");
    await page.fill('input[id="depth"]', "30");
    await page.fill('[data-testid="comment"]', `This is a test box 1`);
    await page.click("[data-testid=submitBoxButton]");
  });

  // Make sure the addedd box is shown in the list
  test("Added box is displayed in the list", async ({ page }) => {
    await expect(page.locator('text="No boxes found."')).toHaveCount(0);
    await expect(page.locator('text="This is a test box 1"')).toHaveCount(1);
  });

  test("You can click the box and view detailed info", async ({ page }) => {
    await page.waitForSelector('[data-testid="BoxListItem"]', {
      state: "visible",
    });
    const boxListItem = await page
      .locator('[data-testid="BoxListItem"]')
      .first();

    await expect(boxListItem).not.toBeNull();
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
    await expect(page.getByTestId("BoxDetailsComment")).toHaveText(
      "This is a test box 1",
    );
    await expect(page.getByTestId("BoxDetailsSubmitButton")).not.toBeNull();
  });

  // Delete the added box
  test("You can delete a box", async ({ page }) => {
    await page.waitForSelector('[data-testid="BoxListItem"]', {
      state: "visible",
    });
    const boxListItem = await page
      .locator('[data-testid="BoxListItem"]')
      .first();

    await expect(boxListItem).not.toBeNull();
    await boxListItem.click();

    // Setup listener for the confirmation dialog before clicking the delete button
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    await page.click("[data-testid=BoxDetailsDeleteButton]");
    // check that removed box is not in the list
    await expect(boxListItem).toBeHidden();
    await expect(page.locator('text="No boxes found."')).toHaveCount(1);
  });

  // You can change the language from the button in navbar
  test("You can change the language", async ({ page }) => {
    await page.click("[data-testid=changeLanguageDropdown]");
    await page.click('[data-testid="changeLanguageDropdownFi"]');
    await expect(page.locator('text="Laatikkotietokanta"')).toHaveCount(1);

    await page.click("[data-testid=changeLanguageDropdown]");
    await page.click('[data-testid="changeLanguageDropdownEn"]');
    await expect(page.locator('text="Box database"')).toHaveCount(1);
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log(testInfo.title, testInfo.status);

    console.log("Taking screenshot to /e2e/screenshots/");
    await page.screenshot({
      path: `./e2e/screenshots/${testInfo.title.replace(/ /g, "_")}.png`,
    });
  });
});
