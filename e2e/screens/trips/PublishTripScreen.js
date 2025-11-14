const { by, element } = require('detox');
const { TestIds } = require('../../__helpers__/test-ids');
const { tapElement, typeText } = require('../../__helpers__/actions');

/**
 * Page Object Model for Publish Trip Screen
 */
class PublishTripScreen {
  // Element getters
  getOriginInput() {
    return element(by.id(TestIds.publishTrip.originInput));
  }

  getDestinationInput() {
    return element(by.id(TestIds.publishTrip.destinationInput));
  }

  getDatePicker() {
    return element(by.id(TestIds.publishTrip.datePicker));
  }

  getTimePicker() {
    return element(by.id(TestIds.publishTrip.timePicker));
  }

  getSeatsInput() {
    return element(by.id(TestIds.publishTrip.seatsInput));
  }

  getPriceInput() {
    return element(by.id(TestIds.publishTrip.priceInput));
  }

  getSubmitButton() {
    return element(by.id(TestIds.publishTrip.submitButton));
  }

  // Actions
  async fillTripForm(data) {
    await tapElement(TestIds.publishTrip.originInput);
    await typeText(TestIds.publishTrip.originInput, data.origin);

    await tapElement(TestIds.publishTrip.destinationInput);
    await typeText(TestIds.publishTrip.destinationInput, data.destination);

    await tapElement(TestIds.publishTrip.seatsInput);
    await typeText(TestIds.publishTrip.seatsInput, data.seats.toString());

    await tapElement(TestIds.publishTrip.priceInput);
    await typeText(TestIds.publishTrip.priceInput, data.price.toString());
  }

  async submit() {
    await tapElement(TestIds.publishTrip.submitButton);
  }

  async publishTrip(data) {
    await this.fillTripForm(data);
    await this.submit();
  }
}

module.exports = { PublishTripScreen };

