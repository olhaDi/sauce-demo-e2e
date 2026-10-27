import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  url = '/';

  async loginUser(userName: string, password: string): Promise<void> {
    await this.open();
    await this.page.getByTestId('username').fill(userName);
    await this.page.getByTestId('password').fill(password);
    await this.page.getByTestId('login-button').click();
  }
}
