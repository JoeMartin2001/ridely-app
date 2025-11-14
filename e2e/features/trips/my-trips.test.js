const { launchApp } = require("../../__helpers__/setup");
const { MyTripsScreen } = require("../../screens/trips/MyTripsScreen");
const { navigateToTab } = require("../../__helpers__/actions");
const { expectVisible } = require("../../__helpers__/matchers");
const { TestIds } = require("../../__helpers__/test-ids");

describe("My Trips", () => {
  let myTripsScreen;

  beforeAll(async () => {
    await launchApp();
    myTripsScreen = new MyTripsScreen();
  });

  beforeEach(async () => {
    await navigateToTab("trips");
  });

  it("should display my trips screen", async () => {
    await expectVisible(TestIds.myTrips.list);
  });

  it("should show empty state when no trips", async () => {
    // Assuming user has no trips
    await myTripsScreen.expectEmptyState();
  });

  it("should display trips list when trips exist", async () => {
    // Assuming user has trips
    await myTripsScreen.expectTripList();
  });

  it("should allow tapping on a trip", async () => {
    // Assuming trips exist
    await myTripsScreen.tapTrip(0);
    // Verify navigation to trip details
  });
});
