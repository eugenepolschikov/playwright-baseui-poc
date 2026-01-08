import { test, expect } from '@playwright/test';
import { GoogleSearchPage } from '../pages/GoogleSearchPage';

test.describe('Google Search Tests', () => {
  let googleSearchPage: GoogleSearchPage;

  test.beforeEach(async ({ page }) => {
    googleSearchPage = new GoogleSearchPage(page);
    await googleSearchPage.navigate();
  });

  test('should search in google main page and check that results appear', async () => {
    // Perform search for 'tests'
    await googleSearchPage.search('tests');

    // Verify that search results are displayed
    const areResultsDisplayed = await googleSearchPage.areResultsDisplayed();
    expect(areResultsDisplayed).toBe(true);

    // Verify that at least one result is present
    const resultsCount = await googleSearchPage.getResultsCount();
    expect(resultsCount).toBeGreaterThan(0);

    // Verify that the first result has text content
    const firstResultText = await googleSearchPage.getFirstResultText();
    expect(firstResultText.length).toBeGreaterThan(0);
  });
});

