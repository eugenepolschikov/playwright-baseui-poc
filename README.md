# autotests-playwright

QA test automation framework based on Playwright and TypeScript.

## Project Structure

```
autotests-playwright/
├── datamodels/          # Data models and test data
├── pages/               # Page Object Model classes
│   ├── BasePage.ts      # Base Page Object with common functionality
│   └── GoogleSearchPage.ts
├── tests/               # Test specifications
│   └── GoogleSearch.spec.ts
├── utils/               # Utility functions and helpers
├── Dockerfile           # Docker configuration for containerized test execution
├── .dockerignore        # Files to exclude from Docker build
├── docker-compose.yml   # Docker Compose configuration (optional)
├── playwright.config.ts # Playwright configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

### Folder Descriptions

- **datamodels/**: Contains data models, test data files, and data fixtures used across tests.
- **pages/**: Contains Page Object Model (POM) classes. Each page class extends `BasePage` and provides methods to interact with specific pages.
- **tests/**: Contains test specification files. Each file contains test cases organized in test suites.
- **utils/**: Contains utility functions, helpers, and common utilities used across the framework.

## Prerequisites

### Local Development
- Node.js (version 16 or higher)
- npm or yarn package manager

### Docker (Optional)
- Docker (version 20.10 or higher)
- Docker Compose (optional, for docker-compose workflows)

## Installation

### Local Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

### Docker Installation

No additional installation needed when using Docker. The Docker image includes all required dependencies and browsers.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (with browser UI)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### Run tests for a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run a specific test file
```bash
npx playwright test tests/GoogleSearch.spec.ts
```

### Run tests in a specific mode (e.g., only headed)
```bash
npx playwright test --headed
```

## Generating Reports

### View HTML report
After running tests, generate and view the HTML report:
```bash
npm run test:report
```

This will open the HTML report in your default browser showing:
- Test execution results
- Screenshots for failed tests
- Video recordings (if enabled)
- Test traces

### Generate report from last test run
If you've already run tests, you can view the report with:
```bash
npx playwright show-report
```

## Running Tests with Docker

### Build Docker Image
```bash
docker build -t autotests-playwright .
```

### Run Tests in Docker Container
```bash
docker run --rm autotests-playwright
```

### Run Tests with Volume Mount (to access reports locally)
```bash
docker run --rm -v ${PWD}/test-results:/app/test-results -v ${PWD}/playwright-report:/app/playwright-report autotests-playwright
```

### Run Tests for Specific Browser
```bash
docker run --rm autotests-playwright npm test -- --project=chromium
```

### Run Specific Test File
```bash
docker run --rm autotests-playwright npm test -- tests/GoogleSearch.spec.ts
```

### Run Tests in Headed Mode (requires X11 forwarding on Linux/Mac)
```bash
docker run --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix autotests-playwright npm run test:headed
```

### View Reports After Docker Execution
After running tests in Docker with volume mounts, view the HTML report:
```bash
npm run test:report
```

Or if reports are in the container, copy them first:
```bash
docker create --name test-container autotests-playwright
docker cp test-container:/app/playwright-report ./playwright-report
docker rm test-container
npm run test:report
```

### Docker Compose (Optional)
A `docker-compose.yml` file is included for easier Docker management. Run tests with:
```bash
docker-compose up
```

To run specific commands:
```bash
# Run all tests
docker-compose run --rm tests npm test

# Run specific test file
docker-compose run --rm tests npm test -- tests/GoogleSearch.spec.ts

# Run tests for specific browser
docker-compose run --rm tests npm test -- --project=chromium
```

After running tests, reports will be available in the local `playwright-report/` and `test-results/` directories.

## Page Object Model

The framework uses the Page Object Model (POM) pattern:

- **BasePage**: Provides common functionality for all page objects (navigation, element interaction, waiting, etc.)
- **Page Objects**: Extend `BasePage` and provide page-specific methods and locators

Example usage:
```typescript
import { GoogleSearchPage } from '../pages/GoogleSearchPage';

const googlePage = new GoogleSearchPage(page);
await googlePage.navigate();
await googlePage.search('query');
```

## Test Structure

Tests are organized using Playwright's test structure:
- `test.describe()`: Groups related tests
- `test.beforeEach()`: Setup code that runs before each test
- `test()`: Individual test cases

## Configuration

The framework configuration is in `playwright.config.ts`. You can customize:
- Test directory
- Browsers and devices
- Retry policy
- Timeouts
- Screenshots and videos
- Reporters

## Code Generation

Generate test code using Playwright's codegen tool:
```bash
npm run test:codegen
```

This opens a browser and records your interactions, generating Playwright test code.

## Best Practices

1. **Page Objects**: Always use Page Objects to interact with pages
2. **Locators**: Use stable, semantic locators (prefer data-testid, role, or text)
3. **Waits**: Use explicit waits via BasePage methods instead of hard-coded delays
4. **Test Data**: Store test data in the `datamodels/` folder
5. **Utilities**: Place reusable functions in the `utils/` folder
6. **Assertions**: Use Playwright's expect API for assertions

## Troubleshooting

### Tests are failing
- Check browser installation: `npx playwright install`
- Verify network connectivity
- Check if target websites are accessible
- Review test traces: `npx playwright show-trace trace.zip`

### Debugging
- Use `npm run test:debug` to run tests in debug mode
- Use `npm run test:ui` for interactive test execution
- Check screenshots and videos in `test-results/` folder

### Docker Issues
- Ensure Docker has enough resources allocated (memory, CPU)
- If tests fail in Docker but work locally, check network connectivity from container
- For headed mode in Docker, ensure X11 forwarding is properly configured
- Check Docker logs: `docker logs <container-id>`
