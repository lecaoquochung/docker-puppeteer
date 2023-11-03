module.exports = {
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: 'node',
  // testEnvironment: './puppeteer_environment.js',
  verbose: true,
  preset: "jest-puppeteer",
  transform: {
    "^.+\\.js$": "babel-jest"
  }
}