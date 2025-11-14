const { by, element, expect: detoxExpect } = require('detox');

/**
 * Custom matchers and assertions for E2E tests
 */

/**
 * Check if element is visible
 */
async function expectVisible(testId) {
  return detoxExpect(element(by.id(testId))).toBeVisible();
}

/**
 * Check if element is not visible
 */
async function expectNotVisible(testId) {
  return detoxExpect(element(by.id(testId))).not.toBeVisible();
}

/**
 * Check if element has text
 */
async function expectText(testId, text) {
  return detoxExpect(element(by.id(testId))).toHaveText(text);
}

/**
 * Check if element contains text
 */
async function expectTextContaining(testId, text) {
  return detoxExpect(element(by.id(testId))).toHaveText(new RegExp(text));
}

/**
 * Check if element has label
 */
async function expectLabel(testId, label) {
  return detoxExpect(element(by.id(testId))).toHaveLabel(label);
}

/**
 * Check if element exists
 */
async function expectExists(testId) {
  return detoxExpect(element(by.id(testId))).toExist();
}

/**
 * Check if element does not exist
 */
async function expectNotExists(testId) {
  return detoxExpect(element(by.id(testId))).not.toExist();
}

module.exports = {
  expectVisible,
  expectNotVisible,
  expectText,
  expectTextContaining,
  expectLabel,
  expectExists,
  expectNotExists,
};

