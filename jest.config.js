const path = require('path');

module.exports = {
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: 'node',
  verbose: true,
  preset: "jest-puppeteer",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  // Other configuration options as needed
};
