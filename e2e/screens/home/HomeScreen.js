const { by, element } = require('detox');
const { TestIds } = require('../../__helpers__/test-ids');
const { tapElement, typeText } = require('../../__helpers__/actions');

/**
 * Page Object Model for Home Screen
 */
class HomeScreen {
  // Element getters
  getSearchCard() {
    return element(by.id(TestIds.home.searchCard));
  }

  getOriginInput() {
    return element(by.id(TestIds.home.originInput));
  }

  getDestinationInput() {
    return element(by.id(TestIds.home.destinationInput));
  }

  getDatePicker() {
    return element(by.id(TestIds.home.datePicker));
  }

  getPassengerCount() {
    return element(by.id(TestIds.home.passengerCount));
  }

  getSearchButton() {
    return element(by.id(TestIds.home.searchButton));
  }

  // Actions
  async searchTrip(origin, destination) {
    await tapElement(TestIds.home.originInput);
    await typeText(TestIds.home.originInput, origin);
    
    await tapElement(TestIds.home.destinationInput);
    await typeText(TestIds.home.destinationInput, destination);
    
    await tapElement(TestIds.home.searchButton);
  }

  async selectDate(date) {
    await tapElement(TestIds.home.datePicker);
    // Date selection logic would go here
    // This depends on your date picker implementation
  }

  async selectPassengerCount(count) {
    await tapElement(TestIds.home.passengerCount);
    // Passenger count selection logic would go here
  }
}

module.exports = { HomeScreen };

