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

BeforeAll(async function() {
  // Write code here that turns the phrase above into concrete actions
  // return 'pending';
  // Output Test Information
  // TOOL: puppeteer, playwright, robotframework, selenium etc
  // BROWSERS: chrome, firefox, safari, etc
  console.log('VERSION:', packageJson.version);
  console.log('ENV:', constant.env);
  console.log('OS:', constant.os);
  console.log('TOOL:', constant.tool);
  console.log('BROWSERS:', constant.browser);
  console.log('SCENARIO TIMEOUT:', constant.scenarioTimeout);
  console.log('STEP TIMEOUT:', constant.stepTimeout);
});

Before(
  {
    timeout: constant.stepTimeout,
    tags: " \
      @api or \
      @e2e or \
      @puppetter or \
      @playwright or \
      @selenium or \
      @cucumber or \
      @navigation \
    "
  }, 
  async function(scenario) {
    return await this.configBrowser(scenario)
  });

  After(
    {
      tags: " \
        @api or \
        @e2e or \
        @puppetter or \
        @playwright or \
        @selenium or \
        @cucumber or \
        @navigation \
      "
    }, 
    async function() {
      await evidenceAction.closing(this.page, this.browser);
    }
  );

  AfterAll(async function(){
      // await driver.quit();
  });