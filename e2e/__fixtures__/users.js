/**
 * Test user fixtures
 */

const testUsers = {
  driver: {
    phone: '+998901234567',
    name: 'Test Driver',
    email: 'driver@test.com',
  },
  passenger: {
    phone: '+998907654321',
    name: 'Test Passenger',
    email: 'passenger@test.com',
  },
  invalid: {
    phone: '123',
    name: '',
  },
};

const testOTP = {
  valid: '123456',
  invalid: '000000',
};

module.exports = { testUsers, testOTP };

