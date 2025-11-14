/**
 * Test ride fixtures
 */

const testRides = {
  valid: {
    origin: 'Tashkent',
    destination: 'Samarkand',
    date: new Date(Date.now() + 86400000), // Tomorrow
    time: '10:00',
    seats: 3,
    price: 50000,
  },
  invalid: {
    origin: '',
    destination: '',
    date: new Date(Date.now() - 86400000), // Yesterday (invalid)
    seats: 0,
    price: -100,
  },
};

module.exports = { testRides };

