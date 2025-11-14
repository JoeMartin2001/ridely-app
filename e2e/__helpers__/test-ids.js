/**
 * Centralized test IDs for E2E tests
 * 
 * These should match the testID props in your React Native components.
 * Example: <View testID={TestIds.home.searchButton}>
 */

const TestIds = {
  // Auth
  auth: {
    phoneInput: 'auth.phoneInput',
    otpInput: 'auth.otpInput',
    submitButton: 'auth.submitButton',
    resendButton: 'auth.resendButton',
  },

  // Home Screen
  home: {
    searchCard: 'home.searchCard',
    originInput: 'home.originInput',
    destinationInput: 'home.destinationInput',
    datePicker: 'home.datePicker',
    passengerCount: 'home.passengerCount',
    searchButton: 'home.searchButton',
  },

  // Trip Results
  tripResults: {
    list: 'tripResults.list',
    tripItem: 'tripResults.tripItem',
    tripPrice: 'tripResults.tripPrice',
    tripTime: 'tripResults.tripTime',
    bookButton: 'tripResults.bookButton',
  },

  // Publish Trip
  publishTrip: {
    form: 'publishTrip.form',
    originInput: 'publishTrip.originInput',
    destinationInput: 'publishTrip.destinationInput',
    datePicker: 'publishTrip.datePicker',
    timePicker: 'publishTrip.timePicker',
    seatsInput: 'publishTrip.seatsInput',
    priceInput: 'publishTrip.priceInput',
    submitButton: 'publishTrip.submitButton',
  },

  // My Trips
  myTrips: {
    list: 'myTrips.list',
    tripItem: 'myTrips.tripItem',
    emptyState: 'myTrips.emptyState',
  },

  // Profile
  profile: {
    avatar: 'profile.avatar',
    name: 'profile.name',
    editButton: 'profile.editButton',
    menuList: 'profile.menuList',
  },

  // Chat
  chat: {
    list: 'chat.list',
    input: 'chat.input',
    sendButton: 'chat.sendButton',
    messageItem: 'chat.messageItem',
  },

  // Tab Navigation
  tabs: {
    home: 'tabs.home',
    publish: 'tabs.publish',
    trips: 'tabs.trips',
    chat: 'tabs.chat',
    profile: 'tabs.profile',
  },
};

module.exports = { TestIds };

