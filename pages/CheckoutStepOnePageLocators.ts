import { Locator, Page } from '@playwright/test';

export class CheckoutStepOnePageLocators {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.zipCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
  }
}
