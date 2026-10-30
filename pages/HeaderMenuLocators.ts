import { Locator, Page } from '@playwright/test';

export class HeaderMenuLocators {
  // The burger button has no data-test attribute, only id="react-burger-menu-btn".
  readonly openMenuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByTestId('logout-sidebar-link');
  }
}
