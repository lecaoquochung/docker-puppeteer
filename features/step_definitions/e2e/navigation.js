const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('expect')

const path = require('path');
const rootDir = path.resolve(__dirname, '../../../');
const constant = require(path.join(rootDir, 'constant.js'));

///////////////////////////////// COMPONENT
const EvidenceComponent = require(path.join(rootDir, 'src/component/EvidenceComponent.js'));
const evidenceAction = new EvidenceComponent();
const NavigationComponent = require(path.join(rootDir, 'src/component/NavigationComponent.js'));
const navigationAction = new NavigationComponent();

Given('I open the website {string}', async (url) => {
    // browser = await puppeteer.launch({ headless: false });
    // page = await browser.newPage();

    console.log('URL: ' + url);
    // await this.page.goto(url, {timeout: 120000, waitUntil: 'networkidle0'}).catch(e => {
    //     console.log('Navigation failed: ' + e.message);
    //     const inflight = tracker.inflightRequests();
    //     console.log(inflight.map(request => '  ' + request.url()).join('\n'));
    // });
    
    console.log('TOOL: ' + constant.tool)
    console.log('VERSION: ' + this.version);
    await navigationAction.openUrl(this.page, url);

    return 'pending';
});

When('I login with username {string} and password {string}', async (username, password) => {
    // await this.page.type('#password', password); // Replace with the correct selector for password input
    // await this.page.click('#loginButton'); // Replace with the correct selector for login button
    // await this.page.waitForNavigation();
});

Then('I should see the menu', async () => {
    // const menu = await this.page.$('#menuButton'); // Replace with the correct selector for the menu button
    // expect(menu).to.not.be.null;
});

Then('I click on order', async () => {
    // await this.page.click('#orderButton'); // Replace with the correct selector for the order button
});

Then('I click submit', async () => {
    // await this.page.click('#submitButton'); // Replace with the correct selector for the submit button
    // await this.page.waitForTimeout(3000);
});