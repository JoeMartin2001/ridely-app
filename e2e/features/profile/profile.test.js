const { launchApp } = require("../../__helpers__/setup");
const { ProfileScreen } = require("../../screens/profile/ProfileScreen");
const { navigateToTab } = require("../../__helpers__/actions");
const { expectVisible } = require("../../__helpers__/matchers");
const { TestIds } = require("../../__helpers__/test-ids");

describe("Profile", () => {
  let profileScreen;

  beforeAll(async () => {
    await launchApp();
    profileScreen = new ProfileScreen();
  });

  beforeEach(async () => {
    await navigateToTab("profile");
  });

  it("should display profile screen", async () => {
    await expectVisible(TestIds.profile.avatar);
    await expectVisible(TestIds.profile.name);
  });

  it("should allow editing profile", async () => {
    await profileScreen.tapEdit();
    // Verify navigation to edit profile screen
  });

  it("should display menu items", async () => {
    await expectVisible(TestIds.profile.menuList);
  });
});
