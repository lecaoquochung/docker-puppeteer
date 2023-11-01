const { Given, When, Then, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver');

const { expect } = require('chai');

require("chromedriver");

// Configure chrome headlease mode
const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options().headless(); // TODO: switch to true for headless mode

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given('I am on the Google search page', { timeout: 30000 }, async function () {
    await driver.get('http://www.google.com');
});

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

AfterAll(async function(){
    await driver.quit();
});