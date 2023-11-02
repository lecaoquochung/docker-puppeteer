const { BeforeAll, Given, When, Then, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver');
var {setDefaultTimeout} = require('@cucumber/cucumber');

// lib
const fs = require('fs');
const moment = require('moment');
const puppeteer = require('puppeteer');
const { chromium, firefox, webkit, devices } = require('playwright');
const { expect } = require('chai');
require("chromedriver");

const path = require('path');
const rootDir = path.resolve(__dirname, '../../..');
const constantPath = path.join(rootDir, 'constant.js');
const constant = require(constantPath);

// Read the package.json file
const pathToJson = './package.json';
const packageJson = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'));

// selenium driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false, args: ["--headless"] }); // Enable headless mode
const driver = new Builder().withCapabilities(capabilities).build();

BeforeAll(async function() {
  // Write code here that turns the phrase above into concrete actions
  // return 'pending';
  // Output Test Information
  // TOOL: puppeteer, playwright, robotframework, selenium etc
  // BROWSERS: chrome, firefox, safari, etc
  console.log('VERSION:', packageJson.version);
  console.log('TOOL:', constant.tool);
  console.log('BROWSERS:', constant.browser);
  console.log('SCENARIO TIMEOUT:', constant.scenarioTimeout);
  console.log('STEP TIMEOUT:', constant.stepTimeout);
});


AfterAll(async function(){
    // await driver.quit();
});