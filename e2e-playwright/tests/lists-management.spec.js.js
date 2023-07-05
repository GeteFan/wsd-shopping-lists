const { test, expect } = require("@playwright/test");

test("Main page has expected title and headings.", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h2")).toHaveText("Shared shopping lists");
});

test("Can create a list.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create list!' }).click();
  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
});

test("Can open a list page.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create list!' }).click();
  await page.locator(`a >> text='${listName}'`).click();
  await expect(page.locator("h1")).toHaveText(listName);
});

test("Can create a list item.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create list!' }).click();
  await page.locator(`a >> text='${listName}'`).click();
  const listItem = `My item: ${Math.random()}`;
  await page.locator("input[type=text]").type(listItem);
  await page.locator("input[type=submit]").click();
  await expect(page.locator(`ul >> li >> text='${listItem}'`)).toContainText(listItem);
});

test("Can collect an item.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create list!' }).click();
  await page.locator(`a >> text='${listName}'`).click();
  const listItem = `My item: ${Math.random()}`;
  await page.locator("input[type=text]").type(listItem);
  await page.locator("input[type=submit]").click();
  await page.getByRole('button', { name: 'Mark collected!' }).click();
  await expect(page.locator(`ul >> li`)).not.toBeEmpty();
});

test("Can deactivate a list.", async ({ page }) => {
  await page.goto("/lists");
  let listElem = await page.locator(`ul >> li`).count();
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.getByRole('button', { name: 'Create list!' }).click();
  await page.getByRole('listitem').filter({ hasText: `${listName}` }).getByRole('button', { name: 'Deactivate list!' }).click();
  await expect(page.locator(`ul >> li`)).toHaveCount(listElem);
});