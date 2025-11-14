const { by, element } = require('detox');
const { TestIds } = require('../../__helpers__/test-ids');
const { tapElement } = require('../../__helpers__/actions');
const { expectVisible } = require('../../__helpers__/matchers');

/**
 * Page Object Model for Trip Results Screen
 */
class TripResultsScreen {
  // Element getters
  getTripList() {
    return element(by.id(TestIds.tripResults.list));
  }

  getTripItem(index) {
    return element(by.id(`${TestIds.tripResults.tripItem}.${index}`));
  }

  getBookButton(index) {
    return element(by.id(`${TestIds.tripResults.bookButton}.${index}`));
  }

  // Actions
  async expectResultsVisible() {
    await expectVisible(TestIds.tripResults.list);
  }

  async tapTrip(index) {
    await this.getTripItem(index).tap();
  }

  async bookTrip(index) {
    await tapElement(`${TestIds.tripResults.bookButton}.${index}`);
  }
}

module.exports = { TripResultsScreen };

