import type { Page } from '@playwright/test';
import { HeaderMenuLocators } from './HeaderMenuLocators';

export class HeaderMenuPage {
  private readonly locators: HeaderMenuLocators;

  constructor(page: Page) {
    this.locators = new HeaderMenuLocators(page);
  }

  async logout() {
    await this.locators.openMenuButton.click();
    await this.locators.logoutLink.click();
  }
}
