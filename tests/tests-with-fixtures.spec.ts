import { test } from './fixtures/fixtures';
import { USERS } from './swag-labs.data';
import { PRODUCTS } from './swag-labs.data';

test.describe('swag lab UI tests', () => {
  test('user can log in via LoginPage', async ({ inventoryPage, login }) => {
    await login;
    await inventoryPage.expectInventoryPageOpened();
  });

  test('user can add item to the cart', async ({ inventoryPage, cartPage, login }) => {
    await login;
    await inventoryPage.addToCartByTitle(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.expectItemExistsInCart(PRODUCTS.backpack);
  });

  test('user can remove item from the cart via catalog', async ({
    inventoryPage,
    cartPage,
    login,
  }) => {
    await login;
    await inventoryPage.addToCartByTitle(PRODUCTS.backpack);
    await inventoryPage.removeFromCartByTitle(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.expectItemNotInCart(PRODUCTS.backpack);
  });

  test('user can return from the cart to the catalog', async ({
    inventoryPage,
    cartPage,
    login,
  }) => {
    await login;
    await inventoryPage.openCart();
    await cartPage.continueShopping();
    await inventoryPage.expectInventoryPageOpened();
  });
});
