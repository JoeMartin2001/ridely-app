const { launchApp, resetAppState } = require("../__helpers__/setup");
const { PhoneOTPScreen } = require("../screens/auth/PhoneOTPScreen");
const { HomeScreen } = require("../screens/home/HomeScreen");
const { testUsers, testOTP } = require("../__fixtures__/users");
const { expectVisible } = require("../__helpers__/matchers");
const { TestIds } = require("../__helpers__/test-ids");

/**
 * Complete authentication flow test
 */
describe("Authentication Flow", () => {
  beforeAll(async () => {
    await launchApp({ newInstance: true });
  });

  it("should complete full login flow", async () => {
    const phoneOTPScreen = new PhoneOTPScreen();
    const homeScreen = new HomeScreen();

    // Step 1: Enter phone number
    await phoneOTPScreen.enterPhone(testUsers.driver.phone);
    await expectVisible(TestIds.auth.submitButton);

    // Step 2: Submit phone
    await phoneOTPScreen.submit();

    // Step 3: Enter OTP
    await expectVisible(TestIds.auth.otpInput);
    await phoneOTPScreen.enterOTP(testOTP.valid);

    // Step 4: Submit OTP and verify login
    await phoneOTPScreen.submit();

    // Step 5: Verify user is logged in (on home screen)
    await expectVisible(TestIds.home.searchCard);
  });

  it("should handle login failure with invalid OTP", async () => {
    await resetAppState();
    const phoneOTPScreen = new PhoneOTPScreen();

    await phoneOTPScreen.enterPhone(testUsers.driver.phone);
    await phoneOTPScreen.submit();
    await phoneOTPScreen.enterOTP(testOTP.invalid);
    await phoneOTPScreen.submit();

    // Verify error message or OTP input still visible
    await expectVisible(TestIds.auth.otpInput);
  });
});
