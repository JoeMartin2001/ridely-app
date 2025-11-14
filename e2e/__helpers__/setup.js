const { device } = require('detox');

/**
 * Test setup and teardown utilities
 */

/**
 * Launch app with optional permissions
 */
async function launchApp(options = {}) {
  await device.launchApp({
    permissions: options.permissions,
    newInstance: options.newInstance ?? false,
  });
}

/**
 * Reload React Native app
 */
async function reloadApp() {
  await device.reloadReactNative();
}

/**
 * Send app to background and bring back
 */
async function backgroundApp(duration = 3000) {
  await device.sendToHome();
  await new Promise((resolve) => setTimeout(resolve, duration));
  await device.launchApp({ newInstance: false });
}

/**
 * Terminate app
 */
async function terminateApp() {
  await device.terminateApp();
}

/**
 * Set device orientation
 */
async function setOrientation(orientation) {
  await device.setOrientation(orientation);
}

/**
 * Reset app state (useful for auth tests)
 */
async function resetAppState() {
  await device.launchApp({ newInstance: true });
}

/**
 * Wait for app to be ready
 */
async function waitForAppReady(timeout = 10000) {
  // Wait for any loading indicators to disappear
  // Adjust based on your app's loading states
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

module.exports = {
  launchApp,
  reloadApp,
  backgroundApp,
  terminateApp,
  setOrientation,
  resetAppState,
  waitForAppReady,
};

