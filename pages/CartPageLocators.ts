import { Locator, Page } from '@playwright/test';

export class CartPageLocators {
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.cartItems = page.getByTestId('inventory-item');
    this.cartItemNames = page.getByTestId('inventory-item-name');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }
}
