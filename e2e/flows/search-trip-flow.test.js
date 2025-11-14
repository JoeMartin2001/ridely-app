const { launchApp } = require("../__helpers__/setup");
const { HomeScreen } = require("../screens/home/HomeScreen");
const { TripResultsScreen } = require("../screens/trips/TripResultsScreen");
const { navigateToTab } = require("../__helpers__/actions");
const { testLocations } = require("../__fixtures__/locations");
const { expectVisible } = require("../__helpers__/matchers");
const { TestIds } = require("../__helpers__/test-ids");

/**
 * Complete search trip flow test
 */
describe("Search Trip Flow", () => {
  beforeAll(async () => {
    await launchApp();
  });

  beforeEach(async () => {
    await navigateToTab("home");
  });

  it("should complete full search trip flow", async () => {
    const homeScreen = new HomeScreen();
    const tripResultsScreen = new TripResultsScreen();

    // Step 1: Navigate to home
    await expectVisible(TestIds.home.searchCard);

    // Step 2: Enter search criteria
    await homeScreen.searchTrip(
      testLocations.tashkent.name,
      testLocations.samarkand.name
    );

    // Step 3: Verify results screen
    await tripResultsScreen.expectResultsVisible();

    // Step 4: Verify trip items are displayed
    // This assumes trips exist in test data
  });

  it("should allow selecting a trip from results", async () => {
    const homeScreen = new HomeScreen();
    const tripResultsScreen = new TripResultsScreen();

    await homeScreen.searchTrip(
      testLocations.tashkent.name,
      testLocations.samarkand.name
    );

    await tripResultsScreen.expectResultsVisible();
    await tripResultsScreen.tapTrip(0);
    // Verify navigation to trip details
  });
});
