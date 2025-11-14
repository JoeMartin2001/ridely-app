const { by, element } = require("detox");
const { TestIds } = require("../../__helpers__/test-ids");
const { tapElement, typeText } = require("../../__helpers__/actions");

/**
 * Page Object Model for Phone OTP Screen
 */
class PhoneOTPScreen {
  // Element getters
  getPhoneInput() {
    return element(by.id(TestIds.auth.phoneInput));
  }

  getOTPInput() {
    return element(by.id(TestIds.auth.otpInput));
  }

  getSubmitButton() {
    return element(by.id(TestIds.auth.submitButton));
  }

  getResendButton() {
    return element(by.id(TestIds.auth.resendButton));
  }

  // Actions
  async enterPhone(phone) {
    await tapElement(TestIds.auth.phoneInput);
    await typeText(TestIds.auth.phoneInput, phone);
  }

  async enterOTP(otp) {
    await tapElement(TestIds.auth.otpInput);
    await typeText(TestIds.auth.otpInput, otp);
  }

  async submit() {
    await tapElement(TestIds.auth.submitButton);
  }

  async resendOTP() {
    await tapElement(TestIds.auth.resendButton);
  }

  async login(phone, otp) {
    await this.enterPhone(phone);
    await this.submit();
    await this.enterOTP(otp);
    await this.submit();
  }
}

module.exports = { PhoneOTPScreen };
