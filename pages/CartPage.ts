import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class CartPage extends BasePage {
  url = '/cart.html';

  async expectItemExistsInCart(title: string): Promise<void> {
    await expect(
      await this.page
        .getByTestId('inventory-item-name')
        .filter({ hasText: title }),
    ).toBeVisible();
  }

  async expectItemNotInCart(title: string): Promise<void> {
    await expect(
      this.page.getByTestId('inventory-item-name').filter({ hasText: title }),
    ).toHaveCount(0);
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

  async checkout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }

  async continueShopping() {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }
}
