import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { USERS } from '../data/users';
import { PRODUCTS } from '../data/products';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginUser(USERS.standard.username, USERS.standard.password);
});

test('user can remove item from the cart via catalog', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  await inventoryPage.addToCartByTitle(PRODUCTS.backpack);
  await inventoryPage.removeFromCartByTitle(PRODUCTS.backpack);
  await inventoryPage.openCart();
  await cartPage.expectItemNotInCart(PRODUCTS.backpack);
});
