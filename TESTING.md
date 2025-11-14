# Cypress Testing Guide for WriteNow

## Overview

This project includes comprehensive end-to-end (E2E) testing using Cypress. The test suite covers authentication, comments, chat/messaging, and UI navigation.

## Installation

Cypress is already installed as a dev dependency. If you need to reinstall it:

```bash
npm install --save-dev cypress
```

## Running Tests

### Open Cypress Test Runner (Interactive Mode)
```bash
npm test
```
or
```bash
npx cypress open
```

This opens the Cypress dashboard where you can:
- View all test files
- Run individual test suites
- Run all tests
- Debug tests with browser DevTools
- Watch tests run in real-time

### Run Tests in Headless Mode (CLI)
```bash
npm run test:headless
```
or
```bash
npx cypress run
```

This runs all tests without the GUI and outputs results to the terminal.

### Run Specific Test File
```bash
npm run test:spec cypress/e2e/auth.cy.js
```
or
```bash
npx cypress run --spec "cypress/e2e/auth.cy.js"
```

### Run Tests in Specific Browser
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
```

## Test Structure

### Test Files Location
All test files are located in `cypress/e2e/` directory:

```
cypress/
├── e2e/
│   ├── auth.cy.js          # Authentication tests
│   ├── comments.cy.js      # Comments tests
│   ├── chat.cy.js          # Real-time chat tests
│   └── navigation.cy.js    # UI/Navigation tests
├── support/
│   ├── commands.js         # Custom commands
│   └── e2e.js             # Support file
└── fixtures/              # Test data (optional)
```

## Test Suites

### 1. Authentication Tests (`auth.cy.js`)
Tests user registration, login, and logout functionality:

- Display landing page
- Navigate to register page
- Navigate to login page
- Show validation errors
- Login with valid credentials
- Logout successfully

**Run:** `npm run test:spec cypress/e2e/auth.cy.js`

### 2. Comments Tests (`comments.cy.js`)
Tests commenting system:

- Display comments section
- Add new comment
- Display comment with timestamp
- Delete own comments
- Hide delete button for others' comments

**Run:** `npm run test:spec cypress/e2e/comments.cy.js`

### 3. Chat Tests (`chat.cy.js`)
Tests real-time messaging features:

- Navigate to chat inbox
- Display chat inbox
- Click on conversation
- Display chat messages
- Send message input
- Validate non-empty messages

**Run:** `npm run test:spec cypress/e2e/chat.cy.js`

### 4. Navigation Tests (`navigation.cy.js`)
Tests UI and navigation:

- Display navbar
- Display brand logo
- Display search bar
- Navigate between pages
- Navigate to team page
- Display team members
- Responsive design
- Footer display

**Run:** `npm run test:spec cypress/e2e/navigation.cy.js`

## Custom Commands

Custom commands are defined in `cypress/support/commands.js`:

### `cy.login(username, password)`
Logs in a user with the provided credentials.

```javascript
cy.login('testuser', 'password123');
```

### `cy.logout()`
Logs out the current user.

```javascript
cy.logout();
```

### `cy.registerUser(username, email, password)`
Registers a new user account.

```javascript
cy.registerUser('newuser', 'email@test.com', 'password123');
```

### `cy.createPost(title, description)`
Creates a new post with the provided title and description.

```javascript
cy.createPost('Test Post', 'This is a test post');
```

## Configuration

The Cypress configuration is in `cypress.config.js`:

```javascript
{
  baseUrl: 'https://writenow-gbdd.onrender.com',
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 8000,
  requestTimeout: 8000,
  responseTimeout: 8000
}
```

### Configuration Options
- `baseUrl` - The base URL for all test requests
- `viewportWidth/Height` - Default browser size for tests
- `defaultCommandTimeout` - Timeout for Cypress commands
- `requestTimeout` - HTTP request timeout
- `responseTimeout` - Response timeout for network requests

## Best Practices

### 1. Test Naming
Test names should be descriptive and start with "should":
```javascript
it('should login with valid credentials', () => {
  // test code
});
```

### 2. Setup and Teardown
Use `beforeEach` to run setup code before each test:
```javascript
beforeEach(() => {
  cy.login('testuser', 'password123');
});
```

### 3. Selectors
Use meaningful selectors:
- IDs: `cy.get('#elementId')`
- Names: `cy.get('input[name="username"]')`
- Classes: `cy.get('.post-item')`
- Data attributes: `cy.get('[data-testid="submit-btn"]')`

### 4. Waiting for Elements
Don't use hard-coded waits. Let Cypress handle retries:
```javascript
// Good
cy.get('.post').should('be.visible');

// Bad
cy.wait(1000);
```

### 5. Assertions
Use clear assertions to verify behavior:
```javascript
cy.url().should('include', '/posts');
cy.get('button').should('contain', 'Save');
cy.get('.error').should('not.exist');
```

## Debugging Tests

### 1. Use `cy.debug()`
Add debugging output:
```javascript
cy.get('.post').debug();
```

### 2. Use `cy.pause()`
Pause test execution:
```javascript
cy.get('.post').pause();
```

### 3. Use Browser DevTools
Right-click in Cypress and select "Inspect" to open DevTools.

### 4. Check Test Output
Run tests in headed mode to see what's happening:
```bash
npx cypress run --headed
```

## CI/CD Integration

### GitHub Actions
Create `.github/workflows/cypress.yml`:

```yaml
name: Cypress E2E Tests

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm install
      - run: npm run test:headless
```

## Troubleshooting

### Tests Fail Due to Selector Not Found
- Check if the selector is correct
- Verify element is visible/rendered
- Use developer tools to inspect the element

### Timeouts During Tests
- Increase timeout in specific test: `{ timeout: 10000 }`
- Check if app is running: `npm start`
- Verify network requests complete

### Authentication Tests Fail
- Ensure test user exists in database
- Check login credentials match
- Verify session is properly stored

### Chat Tests Don't Work
- Start the app with `npm start`
- Ensure Socket.IO connection is working
- Check browser console for errors

## Tips for Writing Tests

1. **Keep tests independent** - Each test should be able to run alone
2. **Test user workflows** - Test what users actually do
3. **Use realistic data** - Use data similar to production
4. **Test error cases** - Test validation and error handling
5. **Mock external APIs** - Use fixtures for external API calls
6. **Keep tests fast** - Avoid unnecessary delays
7. **Make tests readable** - Write tests that read like documentation

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress API Reference](https://docs.cypress.io/api/table-of-contents)
- [Cypress Examples](https://example.cypress.io/)

## Next Steps

1. Run tests: `npm test`
2. Create test user account
3. Run individual test suites to verify functionality
4. Add more test cases as features are added
5. Integrate tests into CI/CD pipeline
