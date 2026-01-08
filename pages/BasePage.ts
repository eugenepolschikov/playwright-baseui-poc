import { Page, Locator, expect } from '@playwright/test';

/**
 * Base Page Object class that provides common functionality for all page objects in the framework.
 * All page objects should extend this class to inherit common methods.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param url - The URL to navigate to
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for a specific element to be visible
   * @param locator - The locator of the element to wait for
   * @param timeout - Optional timeout in milliseconds (default: 30000)
   */
  async waitForElement(locator: Locator, timeout: number = 30000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Click on an element
   * @param locator - The locator of the element to click
   */
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Fill an input field
   * @param locator - The locator of the input field
   * @param text - The text to fill
   */
  async fill(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  /**
   * Type text into an input field (with keyboard simulation)
   * @param locator - The locator of the input field
   * @param text - The text to type
   */
  async type(locator: Locator, text: string): Promise<void> {
    await locator.type(text);
  }

  /**
   * Get text content of an element
   * @param locator - The locator of the element
   * @returns The text content
   */
  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  /**
   * Check if an element is visible
   * @param locator - The locator of the element
   * @returns True if element is visible, false otherwise
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Wait for and click an element
   * @param locator - The locator of the element to click
   */
  async waitAndClick(locator: Locator): Promise<void> {
    await this.waitForElement(locator);
    await this.click(locator);
  }

  /**
   * Press a keyboard key
   * @param key - The key to press (e.g., 'Enter', 'Escape')
   */
  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /**
   * Take a screenshot
   * @param path - Optional path to save the screenshot
   */
  async takeScreenshot(path?: string): Promise<Buffer> {
    return await this.page.screenshot({ path });
  }

  /**
   * Get the current page title
   * @returns The page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get the current page URL
   * @returns The current URL
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Reload the current page
   */
  async reload(): Promise<void> {
    await this.page.reload();
  }

  /**
   * Go back in browser history
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * Go forward in browser history
   */
  async goForward(): Promise<void> {
    await this.page.goForward();
  }
}

