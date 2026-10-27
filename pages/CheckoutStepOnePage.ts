import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepOnePage extends BasePage {
  url = '/checkout-step-one.html';

  async fillFirstName(firstName: string) {
    await this.page.getByTestId('firstName').fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.getByTestId('lastName').fill(lastName);
  }

  async fillZipCode(zipCode: string) {
    await this.page.getByTestId('postalCode').fill(zipCode);
  }

  async continue() {
    await this.page.getByTestId('continue').click();
  }
}
