import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepTwoPage extends BasePage {
  url = '/checkout-step-two.html';

  async expectPageOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  async getItemTitles(): Promise<string[]> {
    return await this.page.getByTestId('inventory-item-name').allInnerTexts();
  }

  async getPriceByTitle(title: string): Promise<string> {
    return await this.page
      .getByTestId('inventory-item')
      .filter({ hasText: title })
      .getByTestId('inventory-item-price')
      .innerText();
  }

  async getItemTotal(): Promise<number> {
    return await this.readAmount('subtotal-label');
  }

  async getTax(): Promise<number> {
    return await this.readAmount('tax-label');
  }

  async getTotal(): Promise<number> {
    return await this.readAmount('total-label');
  }

  async finish() {
    await this.page.getByTestId('finish').click();
  }

  async cancel() {
    await this.page.getByTestId('cancel').click();
  }

  // Labels look like "Item total: $29.99"; keep only the number.
  private async readAmount(testId: string): Promise<number> {
    const text = await this.page.getByTestId(testId).innerText();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }
}
