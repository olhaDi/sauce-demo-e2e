import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutStepOnePageLocators } from './CheckoutStepOnePageLocators';

export class CheckoutStepOnePage extends BasePage {
  url = '/checkout-step-one.html';

  private readonly locators: CheckoutStepOnePageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutStepOnePageLocators(page);
  }

  async fillFirstName(firstName: string) {
    await this.locators.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.locators.lastNameInput.fill(lastName);
  }

  async fillZipCode(zipCode: string) {
    await this.locators.zipCodeInput.fill(zipCode);
  }

  async continue() {
    await this.locators.continueButton.click();
  }
}
