import { expect, Page } from '@playwright/test';

export class BasePage {
  page: Page;
  url = '';

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto(this.url);
  }
}
