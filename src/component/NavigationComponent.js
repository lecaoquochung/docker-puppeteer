/* eslint-disable */
"use strict"

const path = require('path');
const rootDir = path.resolve(__dirname, '../../');

///////////////////////////////// RUNTIME

///////////////////////////////// LIB
const constant = require(path.join(rootDir, 'constant.js'));

///////////////////////////////// COMPONENT
const EvidenceComponent = require(path.join(rootDir, 'src/component/EvidenceComponent.js'));
const evidenceAction = new EvidenceComponent();
// const PuppeteerComponent = require(`${__base}src/component/PuppeteerComponent`)
const PuppeteerComponent = require(path.join(rootDir, 'src/component/PuppeteerComponent.js'));

///////////////////////////////// INIT API

class NavigationComponent {
  async openUrl(page, url) {
    // const tracker = new PuppeteerComponent(page);
    // await page.goto(url, {timeout: constantdefaultTimeout, waitUntil: constant.waitUtilDefaultOption}).catch(e => {
    //   console.log('Navigation failed: ' + e.message);
    //   const inflight = tracker.inflightRequests();
    //   console.log(inflight.map(request => '  ' + request.url()).join('\n'));
    // });
    await page.goto(url, {timeout: constant.defaultTimeout, waitUntil: constant.waitUtilDefaultOption});
  }
  
  // loginRole systemAdmin / Admin
  async loginRole(role = 'systemAdmin') {
    // return login email by role 
    let credential = [];
    credential['email']  = await constant.systemAdmin;
    credential['password']  = await constant.systemPassword;

    switch (role) {
      case "systemAdmin":
        credential['email']  = await constant.systemAdmin;
        credential['password']  = await constant.systemPassword;
        break;
      default : // systemAdmin
        credential['email']  = await constant.systemAdmin;
        credential['password']  = await constant.systemPassword;
        break;
    }

    return credential;
  }

  /**
   * login
   * TODO create exam basic with 
   * @param {!puppeteer} page An object that return from puppeteer
   * @param {string=} currentUnixTime unix timestamp
   * @param {string=} namespace namespace for create exam
   * @param {string=} type type of exam 1: type email delivery 2: type id delivery
   * @return {string=} exam created unix timestamp or empty string
   */
  async login(
    page,
    userRole = 'Admin',
    loginUrl = null, 
    pageLoadPath = null, 
    validateLogin = true,
    timeout = constant.defaultTimeout
  ) {
  }

  /**
   * signout
   * TODO create exam basic with 
   * @param {!puppeteer} page An object that return from puppeteer
   * @param {string=} currentUnixTime unix timestamp
   * @param {string=} namespace namespace for create exam
   * @param {string=} type type of exam 1: type email delivery 2: type id delivery
   * @return {string=} exam created unix timestamp or empty string
   */
  async signout(page) {
  }

}

module.exports = NavigationComponent