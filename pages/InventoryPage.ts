import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  url = '/inventory.html';

  async expectInventoryPageOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async addToCartByTitle(title: string) {
    await this.page
      .getByTestId('inventory-item')
      .filter({ hasText: title })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async removeFromCartByTitle(title: string) {
    await this.page
      .getByTestId('inventory-item')
      .filter({ hasText: title })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async getPriceByTitle(title: string): Promise<string> {
    return await this.page
      .getByTestId('inventory-item')
      .filter({ hasText: title })
      .getByTestId('inventory-item-price')
      .innerText();
  }

  async openCart() {
    await this.page.getByTestId('shopping-cart-link').click();
  }
}
