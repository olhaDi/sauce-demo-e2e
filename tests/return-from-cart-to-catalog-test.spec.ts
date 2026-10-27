import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { USERS } from '../data/users';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginUser(USERS.standard.username, USERS.standard.password);
});

test('user can return from the cart to the catalog', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  await inventoryPage.openCart();
  await cartPage.continueShopping();
  await inventoryPage.expectInventoryPageOpened();
});
