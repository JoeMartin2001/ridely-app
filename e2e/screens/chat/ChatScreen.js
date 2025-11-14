const { by, element } = require('detox');
const { TestIds } = require('../../__helpers__/test-ids');
const { tapElement, typeText } = require('../../__helpers__/actions');

/**
 * Page Object Model for Chat Screen
 */
class ChatScreen {
  // Element getters
  getChatList() {
    return element(by.id(TestIds.chat.list));
  }

  getInput() {
    return element(by.id(TestIds.chat.input));
  }

  getSendButton() {
    return element(by.id(TestIds.chat.sendButton));
  }

  getMessageItem(index) {
    return element(by.id(`${TestIds.chat.messageItem}.${index}`));
  }

  // Actions
  async sendMessage(text) {
    await tapElement(TestIds.chat.input);
    await typeText(TestIds.chat.input, text);
    await tapElement(TestIds.chat.sendButton);
  }

  async expectMessage(index) {
    return this.getMessageItem(index);
  }
}

module.exports = { ChatScreen };

