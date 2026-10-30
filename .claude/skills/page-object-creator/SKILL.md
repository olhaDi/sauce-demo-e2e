---
name: page-object-creator
description: Create or extend a Page Object for the Sauce Demo Playwright project in this repo. Use when the user asks for a new page class, new page methods, or locators for a page under pages/.
---

# Page Object creator

Create page objects that follow the conventions already used in `pages/`. Read the reference example
(`ExamplePage.ts` and `ExamplePageLocators.ts` in this skill's folder) before writing a new page, and match its
style.

## File layout

Every page is two files in `pages/`:

- `<Name>PageLocators.ts` holds the locators only.
- `<Name>Page.ts` holds the URL and the actions and assertions.

Both extend or use the shared base: `pages/BasePage.ts` provides `page`, `url` and `open()`.

## Locators class

```ts
import { Locator, Page } from '@playwright/test';

export class CartPageLocators {
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.checkoutButton = page.getByTestId('checkout');
  }
}
```

- Declare every locator as a `readonly` field with the `Locator` type, then assign it in the constructor.
- Use `getByTestId`. The project sets `testIdAttribute: 'data-test'` in `playwright.config.js`, so
  `getByTestId('checkout')` matches `data-test="checkout"`. Do not use `getByRole`, `getByPlaceholder` or CSS
  selectors unless an element has no `data-test` attribute (then say so in your reply).
- Name locators after the element and its kind: `usernameInput`, `loginButton`, `taxLabel`, `cartItems`.
- Locators that depend on a value (a product title) are not fields. Keep a list locator as the field and narrow it
  inside the method.

## Page class

```ts
import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartPageLocators } from './CartPageLocators';

export class CartPage extends BasePage {
  url = '/cart.html';

  private readonly locators: CartPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CartPageLocators(page);
  }
}
```

- Set `url` to the path only (the base URL comes from `playwright.config.js`).
- Keep one `private readonly locators` field and use `this.locators.<name>` in methods.
- Import only what is used.

## Methods

- Name methods for what the user does: `addToCartByTitle`, `fillFirstName`, `checkout`, `continueShopping`.
- Assertion methods start with `expect`, return `Promise<void>`, and use web-first assertions that retry:
  `await expect(locator).toBeVisible()`, `toHaveCount(0)`, `toHaveURL(/regex/)`. Do not return booleans from
  `isVisible()` and assert on them in tests.
- Getter methods return the value as the page shows it. Prices stay strings (`'$29.99'`); sums and totals that tests
  compare are returned as numbers.
- Per-product actions find the row first, then the element inside it:
  `this.locators.cartItems.filter({ hasText: title }).getByTestId(/^remove-/).click()`.
  Button ids contain the product name (`add-to-cart-sauce-labs-backpack`), so match them with a regex.
- Never use `waitForTimeout` or `networkidle`.

## Data

- Users come from `data/users.ts` (`USERS.standard`), products from `data/products.ts` (`PRODUCTS.backpack`).
  Pass these into page methods from the tests. Do not hardcode credentials or product names in page objects.

## Reference example

The reference example is two files in this skill's folder. Read both before you write a page:

- `.claude/skills/page-object-creator/ExamplePageLocators.ts` is the locators class.
- `.claude/skills/page-object-creator/ExamplePage.ts` is the page class that uses it.

They are templates, not code that runs. Copy their structure into `pages/` and rename the classes and files for the
new page (`<Name>PageLocators.ts`, `<Name>Page.ts`). In a real page the imports are `./BasePage` and
`./<Name>PageLocators`.

## Workflow

1. Look at the live page to confirm the `data-test` attributes. Use `playwright-cli` (see
   `.claude/skills/playwright-cli/SKILL.md`). Its browser session does not read `playwright.config.js`, so inspect
   attributes with `[data-test="..."]` selectors there instead of `getByTestId`.
2. Create the locators class, then the page class.
3. If the page is used in a test, run `PLAYWRIGHT_HTML_OPEN=never npx playwright test` and report the result. If a
   page has no test yet, say that its locators are unchecked against the live site.
4. Do not edit tests, config or other pages unless the user asked for it.
