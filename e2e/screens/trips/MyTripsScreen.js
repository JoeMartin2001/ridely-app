const { by, element } = require('detox');
const { TestIds } = require('../../__helpers__/test-ids');
const { expectVisible } = require('../../__helpers__/matchers');

/**
 * Page Object Model for My Trips Screen
 */
class MyTripsScreen {
  // Element getters
  getTripList() {
    return element(by.id(TestIds.myTrips.list));
  }

  getEmptyState() {
    return element(by.id(TestIds.myTrips.emptyState));
  }

  getTripItem(index) {
    return element(by.id(`${TestIds.myTrips.tripItem}.${index}`));
  }

  // Actions
  async expectEmptyState() {
    await expectVisible(TestIds.myTrips.emptyState);
  }

  async expectTripList() {
    await expectVisible(TestIds.myTrips.list);
  }

  async tapTrip(index) {
    await this.getTripItem(index).tap();
  }
}

module.exports = { MyTripsScreen };

