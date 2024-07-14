/* eslint-disable */
module.exports = Object.freeze({
  /// /////////////////////////////////////////////////
  // Global Constant - env vars / configuration
  /// /////////////////////////////////////////////////
  tool: process.env.TOOL || 'puppeteer', // puppeteer, playwright
  browser: process.env.BROWSER || 'chrome', // chrome, firefox, safari, edge
  os: process.env.OS || 'macos', // linux, windows, macos
  headless: process.env.DEBUG === '1' ? false : 'new',
  slowMo: process.env.DEBUG === "1" ? 0 : 0,
  devtools: process.env.CONSOLE === "1" ? true : false,
  dumpio: process.env.DEBUG === "1" ? true : false,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--incognito'], // default
  argsPuppeteer: "'--no-sandbox', '--disable-setuid-sandbox', '--incognito'",
  argsPlaywright: ['--no-sandbox', '--disable-setuid-sandbox'],
  argsWebkit: [],
  argsSandbox: ['--incognito', '--disable-notifications'], // puppeteer
  userDataDir: '/tmp',
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
  defaultWidth: parseInt(process.env.WIDTH) || 1680,
  defaultHeight: parseInt(process.env.HEIGHT) || 920,
  slackFileUploadApiUrl: process.env.SLACK_API_URL || 'https://slack.com/api/files.upload',
  slackApiToken: process.env.SLACK_API_TOKEN || 'SLACK_API_TOKEN',
  slackChannel: process.env.SLACK_CHANNEL || 'SLACK_CHANNEL',
  slackChannelLocal: process.env.SLACK_CHANNEL_LOCAL || 'SLACK_CHANNEL_LOCAL',

  // timeout
  defaultTimeout: 120000,

  // option
  // https://github.com/puppeteer/puppeteer/issues/1552
  // networkidle0 comes handy for SPAs that load resources with fetch requests.
  // networkidle2 comes handy for pages that do long-polling or any other side activity.
  // load - consider navigation to be finished when the load event is fired.
  // domcontentloaded - consider navigation to be finished when the DOMContentLoaded event is fired.
  // networkidle0 - consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
  // networkidle2 - consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.
  waitUtilDefaultOption: 'networkidle0',
  waitUtilPageReloadOption: 'networkidle2',
})