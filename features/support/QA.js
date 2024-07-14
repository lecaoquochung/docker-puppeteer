/* eslint-disable */
const { setWorldConstructor } = require('@cucumber/cucumber');
const { BeforeAll, Before, Given, When, Then, After, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver');
var {setDefaultTimeout} = require('@cucumber/cucumber');

// lib
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const puppeteer = require('puppeteer');
const { chromium, firefox, webkit, devices } = require('playwright');
const expect = require('expect')
require("chromedriver");

// component
// const constant = require(`${__base}src/constant`);
const rootDir = path.resolve(__dirname, '../..');
const constant = require(path.join(rootDir, 'constant.js'));
const {installMouseHelper} = require(path.join(rootDir, 'src/puppeteer/component/install-mouse-helper.js'));
const EvidenceComponent = require(path.join(rootDir, 'src/component/EvidenceComponent.js'));
const evidenceAction = new EvidenceComponent();

// Read the package.json file
const pathToJson = './package.json';
const packageJson = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'));

// timeout
const currentUnixTime = moment().valueOf();
const date = moment(currentUnixTime).format('YYYYMMDD');
setDefaultTimeout(constant.stepTimeout);

class QA {
  constructor() {
    this.browser;
    this.browserVersion;
    this.clipboard;
    this.context;
    this.currentUnixTime;
    this.date
    this.height;
    this.healthcheck;
    this.networkLogs;
    this.notification;
    this.page;
    this.pageMetricsInit;
    this.pageMetricsByStep;
    this.scenario;
    this.taskDuration;
    this.version;
    this.width;
  }

  setTo(number) {
    this.variable = number;
  }

  incrementBy(number) {
    this.variable += number;
  }

  setTimestamp(timestamp) {
    this.currentUnixTime = timestamp;
  }

  setDate(date) {
    this.date = date;
  }

  isItFriday(today) {
    if (today === "Friday") {
      return "TGIF";
    } else {
      return "Nope";
    }
  }

  async configBrowser (scenario) {
    // try {
      setDefaultTimeout(constant.scenarioTimeout);
      this.version = packageJson.version;
      this.scenario = await scenario.pickle.name;
      this.currentUnixTime = await currentUnixTime;
      this.date = date;
      this.taskDuration = 0; // performance testing - calculate page load from the beginning when the browser is opened if tastDuration = 0

      if (await constant.tool === 'puppeteer') {
        this.browser = await puppeteer.launch({
          executablePath: constant.puppeteerExecutablePath,
          headless: constant.headless, // Chrome new headless https://developer.chrome.com/articles/new-headless/
          args: constant.args, 
          dumpio: constant.dumpio
        });
        
        this.page = await this.browser.newPage()
        this.browserVersion = await this.page.browser().version()
        await this.page.authenticate({username: constant.basicAuthUser, password: constant.basicAuthPassword});
        await this.page.setViewport({width: constant.defaultWidth, height: constant.defaultHeight});
        await installMouseHelper(this.page);

        // MEMO - handling console.log error
        // await this.page.on('error', (err) => { console.log('error: ', err)})
        // await this.page.on('pageerror', (err) => { console.log('pageerror: ', err) })
        // await this.page.on('console', msg => { for (let i = 0; i < msg.args.length; ++i)  console.log(`${i}: ${msg.args[i]}`) })

        // Network log
        // Enable request interception
        // await this.page.setRequestInterception(true); // Page loading is not completed when this is enabled
        this.networkLogs = [];
        
        // Listen for network responses
        this.page.on('response', (response) => {
          const request = response.request();
          const url = request.url();
          const method = request.method();
          const status = response.status();
          // const headers = response.headers();
          // const body = response.text();

          // Store the network log information
          this.networkLogs.push({
            url,
            method,
            status,
            // headers,
            // body,
          });
        });

      } else if (await constant.tool === 'playwright') {
        // playwright
        if (await constant.browser === 'safari') { 
          this.browser = await webkit.launch({
            headless: constant.headless,
            slowMo: constant.slowMo,
            devtools: constant.devtools,
            dumpio: constant.dumpio,
            args: constant.argsWebkit
          });
        } else if (await constant.browser === 'firefox') {
          this.browser = await firefox.launch({headless: constant.headless,slowMo: constant.slowMo,devtools: constant.devtools,dumpio: constant.dumpio,args: constant.args});
        } else {
          this.browser = await chromium.launch({headless: constant.headless,slowMo: constant.slowMo,devtools: constant.devtools,dumpio: constant.dumpio,args: constant.args});

          // browser version
          const session = await this.browser.newBrowserCDPSession();
          this.browserVersion = await session.send('Browser.getVersion');
        }
    
        this.page = await this.browser.newPage({context: currentUnixTime});
        this.context = await this.browser.newContext({
          locale: 'ja-JP',
          // viewport: { width: constant.defaultWidth, height: constant.defaultHeight }
          // ...iPhone11,
          // geolocation: { longitude: 12.492507, latitude: 41.889938 },
          // permissions: ['geolocation'],
          httpCredentials: {
            username: constant.basicAuthUser,
            password: constant.basicAuthPassword,
          },
          // recordVideo: {
          //   dir: "./recordings",
          //   size: { width: constant.defaultWidth, height: constant.defaultHeight },
          // }
        });
        this.page = await this.context.newPage();
        await this.page.setViewportSize({width: constant.defaultWidth, height: constant.defaultHeight});
      } else if (await constant.tool === 'selenium') {
        // selenium
        // await driver.manage().window().setRect({width: constant.defaultWidth, height: constant.defaultHeight});
        // await driver.manage().window().maximize();

        // selenium driver setup
        const capabilities = Capabilities.chrome();
        capabilities.set('chromeOptions', { "w3c": false, args: ["--headless"] }); // Enable headless mode
        const driver = new Builder().withCapabilities(capabilities).build();
      } else {
        // robotframework
      }

      // Output Test Browser Information
      console.log('BROWSER VERSION:', this.browserVersion);
      console.log('PAGE INFORMATION:', this.page);
    // } catch (error) {
    //   // Handle the error as needed
    //   console.error("An error occurred:", error);
    //   // throw the error to fail the scenario
    //   throw error;
    // }
  }
}

setWorldConstructor(QA);