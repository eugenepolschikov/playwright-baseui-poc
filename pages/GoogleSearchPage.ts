import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for Google Search page
 */
export class GoogleSearchPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly resultsContainer: Locator;
  readonly firstResult: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('textarea[name="q"]');
    this.searchButton = page.locator('input[name="btnK"]').first();
    this.resultsContainer = page.locator('#search');
    this.firstResult = page.locator('#search a').first();
  }

  /**
   * Navigate to Google search page
   */
  async navigate(): Promise<void> {
    await this.goto('https://www.google.com');
    await this.waitForPageLoad();
  }

  /**
   * Perform a search query
   * @param query - The search query text
   */
  async search(query: string): Promise<void> {
    await this.waitForElement(this.searchInput);
    await this.fill(this.searchInput, query);
    await this.pressKey('Enter');
    await this.waitForPageLoad();
  }

  /**
   * Check if search results are displayed
   * @returns True if results are visible, false otherwise
   */
  async areResultsDisplayed(): Promise<boolean> {
    try {
      await this.waitForElement(this.resultsContainer, 10000);
      return await this.isVisible(this.resultsContainer);
    } catch {
      return false;
    }
  }

  /**
   * Get the text of the first search result
   * @returns The text of the first result
   */
  async getFirstResultText(): Promise<string> {
    await this.waitForElement(this.firstResult);
    return await this.getText(this.firstResult);
  }

  /**
   * Get the number of search results
   * @returns The number of results found
   */
  async getResultsCount(): Promise<number> {
    const results = await this.page.locator('#search a').count();
    return results;
  }
}

