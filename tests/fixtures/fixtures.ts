import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { HeaderMenuPage } from '../../pages/HeaderMenuPage';
import { USERS } from '../swag-labs.data';

type User = typeof USERS.standard;

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  headerMenuPage: HeaderMenuPage;
  login: void;
  logout: void;
  user: User;
};

export const test = base.extend<MyFixtures>({
  user: [USERS.standard, { option: true }],
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  headerMenuPage: async ({ page }, use) => {
    await use(new HeaderMenuPage(page));
  },

  login: [
    async ({ loginPage, user }, use) => {
      await loginPage.loginUser(user.username, user.password);
      await use();
    },
    { auto: true },
  ],
  logout: [
    async ({ headerMenuPage }, use) => {
      await use();
      await headerMenuPage.logout();
    },
    { auto: true },
  ],
});
