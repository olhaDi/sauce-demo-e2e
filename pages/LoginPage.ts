import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPageLocators } from './LoginPageLocators';

export class LoginPage extends BasePage {
  url = '/';

  private readonly locators: LoginPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new LoginPageLocators(page);
  }

  async loginUser(userName: string, password: string): Promise<void> {
    await this.open();
    await this.locators.usernameInput.fill(userName);
    await this.locators.passwordInput.fill(password);
    await this.locators.loginButton.click();
  }

  async expectErrorMessageVisible(): Promise<void> {
    await expect(this.locators.errorMessage).toBeVisible();
  }

  async expectErrorMessageText(text: string): Promise<void> {
    await expect(this.locators.errorMessage).toHaveText(text);
  }
}
