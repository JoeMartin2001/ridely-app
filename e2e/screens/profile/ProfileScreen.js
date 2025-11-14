const { by, element } = require('detox');
const { TestIds } = require('../../__helpers__/test-ids');
const { tapElement } = require('../../__helpers__/actions');

/**
 * Page Object Model for Profile Screen
 */
class ProfileScreen {
  // Element getters
  getAvatar() {
    return element(by.id(TestIds.profile.avatar));
  }

  getName() {
    return element(by.id(TestIds.profile.name));
  }

  getEditButton() {
    return element(by.id(TestIds.profile.editButton));
  }

  getMenuList() {
    return element(by.id(TestIds.profile.menuList));
  }

  // Actions
  async tapEdit() {
    await tapElement(TestIds.profile.editButton);
  }

  async tapMenuItem(itemId) {
    await tapElement(`${TestIds.profile.menuList}.${itemId}`);
  }
}

module.exports = { ProfileScreen };

