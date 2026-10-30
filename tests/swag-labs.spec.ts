import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { USERS } from './swag-labs.data';
import { PRODUCTS } from './swag-labs.data';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;

test.describe('swag lab UI tests', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.loginUser(USERS.standard.username, USERS.standard.password);
  });

  test('user can log in via LoginPage', async ({ page }) => {
    await inventoryPage.expectInventoryPageOpened();
  });

  test('user can add item to the cart', async ({ page }) => {
    await inventoryPage.addToCartByTitle(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.expectItemExistsInCart(PRODUCTS.backpack);
  });

  test('user can remove item from the cart via catalog', async ({ page }) => {
    await inventoryPage.addToCartByTitle(PRODUCTS.backpack);
    await inventoryPage.removeFromCartByTitle(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.expectItemNotInCart(PRODUCTS.backpack);
  });

  test('user can return from the cart to the catalog', async ({ page }) => {
    await inventoryPage.openCart();
    await cartPage.continueShopping();
    await inventoryPage.expectInventoryPageOpened();
  });
});
