import { BasePage } from './BasePage';
import { expect, Page } from '@playwright/test';
import { CartPageLocators } from './CartPageLocators';

export class CartPage extends BasePage {
  url = '/cart.html';

  private readonly locators: CartPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CartPageLocators(page);
  }

  async expectItemExistsInCart(title: string): Promise<void> {
    await expect(
      this.locators.cartItemNames.filter({ hasText: title }),
    ).toBeVisible();
  }

  async expectItemNotInCart(title: string): Promise<void> {
    await expect(
      this.locators.cartItemNames.filter({ hasText: title }),
    ).toHaveCount(0);
  }

  async removeFromCartByTitle(title: string) {
    await this.locators.cartItems
      .filter({ hasText: title })
      .getByTestId(/^remove-/)
      .click();
  }

  async getPriceByTitle(title: string): Promise<string> {
    return await this.locators.cartItems
      .filter({ hasText: title })
      .getByTestId('inventory-item-price')
      .innerText();
  }

  async checkout() {
    await this.locators.checkoutButton.click();
  }

  async continueShopping() {
    await this.locators.continueShoppingButton.click();
  }
}
