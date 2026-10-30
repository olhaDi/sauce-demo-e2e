import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventoryPageLocators } from './InventoryPageLocators';

export class InventoryPage extends BasePage {
  url = '/inventory.html';

  private readonly locators: InventoryPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new InventoryPageLocators(page);
  }

  async expectInventoryPageOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async addToCartByTitle(title: string) {
    await this.locators.inventoryItems
      .filter({ hasText: title })
      .getByTestId(/^add-to-cart-/)
      .click();
  }

  async removeFromCartByTitle(title: string) {
    await this.locators.inventoryItems
      .filter({ hasText: title })
      .getByTestId(/^remove-/)
      .click();
  }

  async getPriceByTitle(title: string): Promise<string> {
    return await this.locators.inventoryItems
      .filter({ hasText: title })
      .getByTestId('inventory-item-price')
      .innerText();
  }

  async openCart() {
    await this.locators.cartLink.click();
  }
}
