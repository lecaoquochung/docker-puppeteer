/* eslint-disable */
module.exports = Object.freeze({
  /// /////////////////////////////////////////////////
  // Global Constant - env vars / configuration
  /// /////////////////////////////////////////////////
  headless: process.env.DEBUG === '1' ? false : true,
  slowMo: process.env.DEBUG === "1" ? 0 : 0,
  devtools: process.env.CONSOLE === "1" ? true : false,
  dumpio: process.env.DEBUG === "1" ? true : false,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--incognito'], // default
  argsPuppeteer: "'--no-sandbox', '--disable-setuid-sandbox', '--incognito'",
  argsPlaywright: ['--no-sandbox', '--disable-setuid-sandbox'],
  argsWebkit: [],
  argsSandbox: ['--incognito', '--disable-notifications'], // puppeteer
  userDataDir: '/tmp',
  tool: process.env.TOOL || 'puppeteer', // puppeteer, playwright
  browser: process.env.BROWSER || 'chrome', // chrome, firefox, safari, edge
  os: process.env.OS || 'linux', // linux, windows, macos
  githubAccessToken: process.env.GITHUB_ACCESS_TOKEN, // commit
  githubToken: process.env.GITHUB_TOKEN, // public package download
  env: process.env.ENV || 'dev',
  scriptEnv: process.env.SCRIPT_ENV || 'circleci',
  debugMode: process.env.DEBUG,
  screenshot: process.env.SCREENSHOT || 'false',
  basic: process.env.BASIC_AUTH || 'username:password',
  basicAuthUser: 'username',
  basicAuthPassword: process.env.BASIC_AUTH_PW || 'password',
  defaultPassword: process.env.DEFAULT_PASSWORD || 'Password123456',
  notificationMode: process.env.NOTIFICATION || 3, // notificationMode 1:FAILED,ERROR,PENDING only 2:WARNING 3:ALL (FAILED, WARNING, INFO, PASSED)
  puppeteerExecutablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '', // 'chromium' export PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
  scenarioTimeout: parseInt(process.env.SCENARIO_TIMEOUT) || 900000, // maximumn: 15 mins timeout control by steps in scenario / Number.MAX_SAFE_INTEGER
  stepTimeout: parseInt(process.env.STEP_TIMEOUT) || 180000, // 3 mins
})