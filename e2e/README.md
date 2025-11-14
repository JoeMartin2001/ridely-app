# E2E Testing Structure

This directory contains end-to-end tests for the Ridely app using Detox and Jest.

## Structure

```
e2e/
├── __helpers__/          # Shared utilities and helpers
│   ├── actions.js        # Common user actions (tap, type, swipe, etc.)
│   ├── matchers.js       # Custom matchers and assertions
│   ├── setup.js          # Test setup and teardown utilities
│   └── test-ids.js      # Centralized test ID constants
├── __fixtures__/         # Test data and fixtures
│   ├── users.js          # User test data
│   ├── rides.js         # Ride test data
│   └── locations.js      # Location test data
├── screens/              # Page Object Models (POM)
│   ├── auth/
│   │   └── PhoneOTPScreen.js
│   ├── home/
│   │   └── HomeScreen.js
│   ├── trips/
│   │   ├── PublishTripScreen.js
│   │   ├── MyTripsScreen.js
│   │   └── TripResultsScreen.js
│   ├── profile/
│   │   └── ProfileScreen.js
│   └── chat/
│       └── ChatScreen.js
├── flows/                # Complete user flows
│   ├── auth-flow.test.js
│   ├── search-trip-flow.test.js
│   └── publish-trip-flow.test.js
├── features/             # Feature-specific tests
│   ├── auth/
│   │   └── phone-otp.test.js
│   ├── home/
│   │   └── search-trip.test.js
│   ├── trips/
│   │   ├── publish-trip.test.js
│   │   └── my-trips.test.js
│   └── profile/
│       └── profile.test.js
└── jest.config.js        # Jest configuration
```

## Best Practices

1. **Page Object Model (POM)**: Use screen objects in `screens/` to encapsulate element selectors and actions
2. **Reusable Actions**: Common interactions go in `__helpers__/actions.js`
3. **Test IDs**: All test IDs should be centralized in `__helpers__/test-ids.js`
4. **Test Data**: Use fixtures for consistent test data
5. **Flows**: Complex multi-step flows go in `flows/`
6. **Features**: Single feature tests go in `features/`
7. **Avoid Unnecessary Reloads**: Don't use `reloadApp()` in `beforeEach` unless absolutely necessary - use `navigateToTab()` or setup-specific state instead

## Running Tests

```bash
# iOS
npm run detox:test:ios

# Android
npm run detox:test:android

# Build first
npm run detox:build:ios
npm run detox:build:android
```

## Writing Tests

### Example using Page Objects:

```javascript
const { launchApp } = require("../__helpers__/setup");
const { HomeScreen } = require("../screens/home/HomeScreen");
const { navigateToTab } = require("../__helpers__/actions");
const { expectVisible } = require("../__helpers__/matchers");
const { TestIds } = require("../__helpers__/test-ids");

describe("Search Trip Flow", () => {
  let homeScreen;

  beforeAll(async () => {
    await launchApp();
    homeScreen = new HomeScreen();
  });

  beforeEach(async () => {
    await navigateToTab("home");
  });

  it("should search for trips", async () => {
    await homeScreen.searchTrip("Tashkent", "Samarkand");
    await expectVisible(TestIds.tripResults.list);
  });
});
```
