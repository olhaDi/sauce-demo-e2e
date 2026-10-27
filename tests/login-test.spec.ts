import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS } from '../data/users';

test('user can log in via LoginPage', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.loginUser(USERS.standard.username, USERS.standard.password);
  await inventoryPage.expectInventoryPageOpened();
});
