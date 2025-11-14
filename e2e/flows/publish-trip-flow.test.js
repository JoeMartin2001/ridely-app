const { launchApp } = require("../__helpers__/setup");
const { PublishTripScreen } = require("../screens/trips/PublishTripScreen");
const { MyTripsScreen } = require("../screens/trips/MyTripsScreen");
const { navigateToTab } = require("../__helpers__/actions");
const { testRides } = require("../__fixtures__/rides");
const { expectVisible } = require("../__helpers__/matchers");
const { TestIds } = require("../__helpers__/test-ids");

/**
 * Complete publish trip flow test
 */
describe("Publish Trip Flow", () => {
  beforeAll(async () => {
    await launchApp();
  });

  it("should complete full publish trip flow", async () => {
    const publishTripScreen = new PublishTripScreen();
    const myTripsScreen = new MyTripsScreen();

    // Step 1: Navigate to publish tab
    await navigateToTab("publish");
    await expectVisible(TestIds.publishTrip.form);

    // Step 2: Fill trip form
    await publishTripScreen.fillTripForm({
      origin: testRides.valid.origin,
      destination: testRides.valid.destination,
      seats: testRides.valid.seats,
      price: testRides.valid.price,
    });

    // Step 3: Submit trip
    await publishTripScreen.submit();

    // Step 4: Verify trip appears in My Trips
    await navigateToTab("trips");
    await myTripsScreen.expectTripList();
  });
});
