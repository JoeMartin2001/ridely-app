const { by, element, waitFor, device } = require('detox');
const { TestIds } = require('./test-ids');

/**
 * Common user actions for E2E tests
 * These functions encapsulate common interactions to reduce code duplication
 */

/**
 * Wait for an element to be visible, then tap it
 */
async function tapElement(testId, timeout = 5000) {
  await waitFor(element(by.id(testId)))
    .toBeVisible()
    .withTimeout(timeout);
  await element(by.id(testId)).tap();
}

/**
 * Type text into an input field
 */
async function typeText(testId, text, timeout = 5000) {
  await waitFor(element(by.id(testId)))
    .toBeVisible()
    .withTimeout(timeout);
  await element(by.id(testId)).typeText(text);
}

/**
 * Clear text from an input field
 */
async function clearText(testId, timeout = 5000) {
  await waitFor(element(by.id(testId)))
    .toBeVisible()
    .withTimeout(timeout);
  await element(by.id(testId)).clearText();
}

/**
 * Replace text in an input field (clear + type)
 */
async function replaceText(testId, text, timeout = 5000) {
  await waitFor(element(by.id(testId)))
    .toBeVisible()
    .withTimeout(timeout);
  await element(by.id(testId)).replaceText(text);
}

/**
 * Scroll to an element
 */
async function scrollToElement(
  testId,
  direction = 'down',
  distance,
  timeout = 5000
) {
  await waitFor(element(by.id(testId)))
    .toBeVisible()
    .withTimeout(timeout);
  await element(by.id(testId)).scroll(distance || 200, direction);
}

/**
 * Swipe on an element
 */
async function swipeElement(
  testId,
  direction,
  speed = 'fast',
  timeout = 5000
) {
  await waitFor(element(by.id(testId)))
    .toBeVisible()
    .withTimeout(timeout);
  await element(by.id(testId)).swipe(direction, speed);
}

/**
 * Navigate to a tab
 */
async function navigateToTab(tab) {
  await tapElement(TestIds.tabs[tab]);
}

/**
 * Wait for element to disappear
 */
async function waitForElementToDisappear(testId, timeout = 5000) {
  await waitFor(element(by.id(testId)))
    .not.toBeVisible()
    .withTimeout(timeout);
}

/**
 * Long press on an element
 */
async function longPress(testId, duration = 2000, timeout = 5000) {
  await waitFor(element(by.id(testId)))
    .toBeVisible()
    .withTimeout(timeout);
  await element(by.id(testId)).longPress(duration);
}

/**
 * Take a screenshot (useful for debugging)
 */
async function takeScreenshot(name) {
  await device.takeScreenshot(name);
}

module.exports = {
  tapElement,
  typeText,
  clearText,
  replaceText,
  scrollToElement,
  swipeElement,
  navigateToTab,
  waitForElementToDisappear,
  longPress,
  takeScreenshot,
};

