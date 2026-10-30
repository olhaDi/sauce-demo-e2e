import { Locator, Page } from '@playwright/test';

export class InventoryPageLocators {
  readonly inventoryItems: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.inventoryItems = page.getByTestId('inventory-item');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }
}
