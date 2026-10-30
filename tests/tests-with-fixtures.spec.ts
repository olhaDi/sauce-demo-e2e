import { expect } from '@playwright/test';
import { test } from './fixtures/fixtures';
import { USERS } from './swag-labs.data';
import { PRODUCTS } from './swag-labs.data';

test.describe('swag lab UI tests', () => {
  test('user can log in via LoginPage', async ({ inventoryPage }) => {
    await inventoryPage.expectInventoryPageOpened();
  });

  test('user can add item to the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCartByTitle(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.expectItemExistsInCart(PRODUCTS.backpack);
  });

  test('user can remove item from the cart via catalog', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCartByTitle(PRODUCTS.backpack);
    await inventoryPage.removeFromCartByTitle(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.expectItemNotInCart(PRODUCTS.backpack);
  });

  test('user can return from the cart to the catalog', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.openCart();
    await cartPage.continueShopping();
    await inventoryPage.expectInventoryPageOpened();
  });
});

test.describe('negative swag lab UI tests', () => {
  test.use({ user: USERS.lockedOut });
  test.use({ autoLogin: false });
  test('problem user can not login', async ({
    inventoryPage,
    loginPage,
    user,
  }) => {
    await loginPage.loginUser(user.username, user.password);
    await loginPage.expectErrorMessageVisible();
  });
});
