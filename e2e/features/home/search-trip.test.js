const { launchApp } = require('../../__helpers__/setup');
const { HomeScreen } = require('../../screens/home/HomeScreen');
const { navigateToTab } = require('../../__helpers__/actions');
const { testLocations } = require('../../__fixtures__/locations');
const { expectVisible } = require('../../__helpers__/matchers');
const { TestIds } = require('../../__helpers__/test-ids');

describe('Search Trip', () => {
  let homeScreen;

  beforeAll(async () => {
    await launchApp();
    homeScreen = new HomeScreen();
  });

  beforeEach(async () => {
    await navigateToTab('home');
  });

  it('should display search card on home screen', async () => {
    await expectVisible(TestIds.home.searchCard);
  });

  it('should allow entering origin and destination', async () => {
    await homeScreen.searchTrip(
      testLocations.tashkent.name,
      testLocations.samarkand.name
    );
    // Verify navigation to results screen
  });

  it('should navigate to trip results after search', async () => {
    await homeScreen.searchTrip(
      testLocations.tashkent.name,
      testLocations.samarkand.name
    );
    // Wait for results screen
    // Adjust based on your navigation implementation
  });
});

