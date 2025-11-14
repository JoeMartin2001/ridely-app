const { launchApp } = require("../../__helpers__/setup");
const { PublishTripScreen } = require("../../screens/trips/PublishTripScreen");
const { navigateToTab } = require("../../__helpers__/actions");
const { testRides } = require("../../__fixtures__/rides");
const { expectVisible } = require("../../__helpers__/matchers");
const { TestIds } = require("../../__helpers__/test-ids");

describe("Publish Trip", () => {
  let publishTripScreen;

  beforeAll(async () => {
    await launchApp();
    publishTripScreen = new PublishTripScreen();
  });

  beforeEach(async () => {
    await navigateToTab("publish");
  });

  it("should display publish trip form", async () => {
    await expectVisible(TestIds.publishTrip.form);
  });

  it("should allow filling trip details", async () => {
    await publishTripScreen.fillTripForm({
      origin: testRides.valid.origin,
      destination: testRides.valid.destination,
      seats: testRides.valid.seats,
      price: testRides.valid.price,
    });
  });

  it("should submit trip successfully", async () => {
    await publishTripScreen.publishTrip({
      origin: testRides.valid.origin,
      destination: testRides.valid.destination,
      seats: testRides.valid.seats,
      price: testRides.valid.price,
    });
    // Verify success message or navigation
  });
});
