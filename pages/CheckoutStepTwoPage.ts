import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutStepTwoPageLocators } from './CheckoutStepTwoPageLocators';

export class CheckoutStepTwoPage extends BasePage {
  url = '/checkout-step-two.html';

  private readonly locators: CheckoutStepTwoPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutStepTwoPageLocators(page);
  }

  async expectPageOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  async getItemTitles(): Promise<string[]> {
    return await this.locators.itemNames.allInnerTexts();
  }

  async getPriceByTitle(title: string): Promise<string> {
    return await this.locators.items
      .filter({ hasText: title })
      .getByTestId('inventory-item-price')
      .innerText();
  }

  async getItemTotal(): Promise<number> {
    return await this.readAmount(this.locators.itemTotalLabel);
  }

  async getTax(): Promise<number> {
    return await this.readAmount(this.locators.taxLabel);
  }

  async getTotal(): Promise<number> {
    return await this.readAmount(this.locators.totalLabel);
  }

  async finish() {
    await this.locators.finishButton.click();
  }

  async cancel() {
    await this.locators.cancelButton.click();
  }

  // Labels look like "Item total: $29.99"; keep only the number.
  private async readAmount(label: Locator): Promise<number> {
    const text = await label.innerText();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }
}
