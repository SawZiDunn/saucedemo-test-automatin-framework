# SauceDemo Test Automation Framework

A [Playwright](https://playwright.dev/) TypeScript automation framework for testing the [SauceDemo](https://www.saucedemo.com/) web application.

## Project Structure

The project follows the **Page Object Model** pattern for better maintainability and code organization:

```bash
test-automation-demo/
├── playwright.config.ts    # Playwright configuration
├── package.json
├── README.md
├── pages/                  # Page Object Models
│   ├── BasePage.ts         # Base page with common methods
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutInfoPage.ts
│   ├── CheckoutOverviewPage.ts
│   └── CheckoutCompletePage.ts
├── utils/
│   └── config.ts           # Configuration values
├── tests/                  # Test specifications
│   ├── login.spec.ts       # Login test cases
│   └── purchase.spec.ts    # End-to-end purchase test cases
├── .github/
│   └── workflows/
│       └── playwright.yml  # GitHub Actions workflow

```

### Test Coverage

The framework tests these two scenarios:

-   **Login functionality**:

    -   Valid user credentials
    -   Invalid user credentials
    -   Wrong password behaviour

-   **End-to-end purchase flow**:
    -   Product selection and cart management
    -   Checkout information validation
    -   Order summary verification
    -   Confirmation process

## Design Decisions

1. **Page Object Model**: Each page of the application has its own class that encapsulates the page's elements and actions. This makes tests more maintainable as UI changes only require updates in one place.

2. **Fluent Interface Pattern**: Page methods return instances of the next page, allowing for method chaining that follows the user flow (e.g., `loginPage.login(...).addProductToCart(...).goToCart()`).

3. **Separation of Concerns**:

    - Pages handle element interactions
    - Tests handle assertions and test flow
    - Base class handles common functionality
    - Configuration is separated into utility files

4. **Strong Typing**: TypeScript is used to ensure type safety throughout the framework.

5. **Cross-browser Testing**: Configuration supports **Chrome**, **Firefox**, and **Safari**.

6. **CI/CD Integration**: GitHub workflows configured for automated test execution.

## Setup Instructions

### Prerequisites

-   Node.js 16 or newer
-   npm or yarn

### Installation

1. Clone the repository:

```bash
git clone git@github.com:SawZiDunn/test-automatin-demo.git
cd test-automation-demo
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

### Run all tests

```bash
npx playwright test

or

npm run test
```

### Run specific test file

```bash
npx playwright test tests/login.spec.ts
```

### Run tests in a specific browser

```bash
npx playwright test --project=chromium
```

### Run tests with UI Mode

```bash
npx playwright test --ui
```

### View test report

```bash
npx playwright show-report

or

npm run report
```

## Test Results

After running the tests, a HTML report will be generated in the `playwright-report` directory. Open `index.html` in this directory to view detailed test results, including screenshots and traces for failed tests.

## Authentication Strategy

The framework uses a configuration file (`utils/config.ts`) to store `baseURL` and `test credentials`. This approach allows for easy credential management and updates across the test suite.

## Future Enhancements

1. Add more test cases for various user types - including problem_user, performance_glitch_user, and error_user
2. Implement detailed test scenarios such as payment cancellation, single product page interactions, and navigation bar functionality
3. Develop API tests for backend validation where applicable
4. Create custom reporters to improve test result visualization
