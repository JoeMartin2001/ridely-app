# E2E Testing Structure

This directory contains end-to-end tests for the Ridely app using Detox and Jest.

## Structure

```
e2e/
├── __helpers__/          # Shared utilities and helpers
│   ├── actions.ts        # Common user actions (tap, type, swipe, etc.)
│   ├── matchers.ts       # Custom matchers and assertions
│   ├── setup.ts          # Test setup and teardown utilities
│   └── test-ids.ts       # Centralized test ID constants
├── __fixtures__/         # Test data and fixtures
│   ├── users.ts          # User test data
│   ├── rides.ts          # Ride test data
│   └── locations.ts      # Location test data
├── screens/              # Page Object Models (POM)
│   ├── auth/
│   │   └── PhoneOTPScreen.ts
│   ├── home/
│   │   └── HomeScreen.ts
│   ├── trips/
│   │   ├── PublishTripScreen.ts
│   │   ├── MyTripsScreen.ts
│   │   └── TripResultsScreen.ts
│   ├── profile/
│   │   └── ProfileScreen.ts
│   └── chat/
│       └── ChatScreen.ts
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
2. **Reusable Actions**: Common interactions go in `__helpers__/actions.ts`
3. **Test IDs**: All test IDs should be centralized in `__helpers__/test-ids.ts`
4. **Test Data**: Use fixtures for consistent test data
5. **Flows**: Complex multi-step flows go in `flows/`
6. **Features**: Single feature tests go in `features/`

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
import { HomeScreen } from '../screens/home/HomeScreen';

describe('Search Trip Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should search for trips', async () => {
    const homeScreen = new HomeScreen();
    await homeScreen.searchTrip('Tashkent', 'Samarkand');
    await expect(homeScreen.getResults()).toBeVisible();
  });
});
```

