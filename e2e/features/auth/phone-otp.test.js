const { launchApp } = require("../../__helpers__/setup");
const { PhoneOTPScreen } = require("../../screens/auth/PhoneOTPScreen");
const { testUsers, testOTP } = require("../../__fixtures__/users");
const { expectVisible } = require("../../__helpers__/matchers");
const { TestIds } = require("../../__helpers__/test-ids");

describe("Phone OTP Authentication", () => {
  let phoneOTPScreen;

  beforeAll(async () => {
    await launchApp();
    phoneOTPScreen = new PhoneOTPScreen();
  });

  describe("Phone Input", () => {
    it("should display phone input field", async () => {
      await expectVisible(TestIds.auth.phoneInput);
    });

    it("should allow entering phone number", async () => {
      await phoneOTPScreen.enterPhone(testUsers.driver.phone);
      // Verify phone was entered (implementation depends on your component)
    });

    it("should show submit button after entering phone", async () => {
      await phoneOTPScreen.enterPhone(testUsers.driver.phone);
      await expectVisible(TestIds.auth.submitButton);
    });
  });

  describe("OTP Input", () => {
    beforeEach(async () => {
      await phoneOTPScreen.enterPhone(testUsers.driver.phone);
      await phoneOTPScreen.submit();
    });

    it("should display OTP input field after submitting phone", async () => {
      await expectVisible(TestIds.auth.otpInput);
    });

    it("should allow entering OTP code", async () => {
      await phoneOTPScreen.enterOTP(testOTP.valid);
    });

    it("should show resend button", async () => {
      await expectVisible(TestIds.auth.resendButton);
    });
  });

  describe("Login Flow", () => {
    it("should complete login with valid credentials", async () => {
      await phoneOTPScreen.login(testUsers.driver.phone, testOTP.valid);
      // After successful login, user should be on home screen
      // Adjust expectations based on your app flow
    });
  });
});
