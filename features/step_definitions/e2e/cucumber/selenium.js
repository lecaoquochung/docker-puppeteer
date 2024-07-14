const { Given, When, Then, AfterAll } = require('@cucumber/cucumber');
const { Browser, Builder, By, Capabilities, Key, until } = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');
const { suite } = require('selenium-webdriver/testing');
const { expect } = require('chai');
require("chromedriver");

// driver setup
// const capabilities = Capabilities.chrome();
// capabilities.set('chromeOptions', { "w3c": false, args: ["--headless"] }); // Enable headless mode
// const driver = new Builder().withCapabilities(capabilities).build();

// selenium new headless mode
// https://www.selenium.dev/blog/2023/headless-is-going-away/
// https://www.selenium.dev/documentation/webdriver/browsers/chrome/
// let driver = await env
//     .builder()
//     .setChromeOptions(options.addArguments('--headless=new'))
//     .build();
const options = new Chrome.Options();
options.addArguments('--headless=new');
const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

Given('I am on the Google search page', { timeout: 30000 }, async function () {
    await driver.get('http://www.google.com');
});

// https://www.selenium.dev/selenium/docs/api/javascript/index.html
When('I search for {string}', { timeout: 30000 }, async function (searchTerm) {
    const element = await driver.findElement(By.css('textarea'));
    await element.sendKeys(searchTerm);
    await element.submit();
});

Then('the page title should start with {string}', {timeout: 60 * 1000}, async function (searchTerm) {
    const title = await driver.getTitle();
    const isTitleStartWithCheese = title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
    expect(isTitleStartWithCheese).to.equal(true);
});
