/*eslint-disable*/
"use strict"

const axios = require('axios');
const baseDir = process.cwd();
var moment = require('moment');
const request = require('request');
const fs = require('fs');
const path = require('path');

// component
const rootDir = path.resolve(__dirname, '../..');
const constant = require(path.join(rootDir, 'constant.js'));

const SLACK_API_URL = constant.slackFileUploadApiUrl
const SLACK_API_TOKEN = constant.slackApiToken
const env = constant.env

// slack channel
const SLACK_CHANNEL = (env === "local") ? 
  constant.slackChannelLocal : 
  constant.slackChannel

let currentUnixTime = moment()
let currentTime = moment(currentUnixTime, moment.ISO_8601).format('YYYY-MM-DD[T]HH mm ss') + 'Z'

// Read the package.json file
const pathToJson = './package.json';
const packageJson = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'));
const currentVersion = packageJson.version;

/* eslint-enable */
class EvidenceComponent {
  async slackNotification (
    page,
    name,
    detail,
    saveLocalOnly = false,
    pageLoadDelay = 300,
    debug = constant.debugMode,
    slackChannel = SLACK_CHANNEL,
    healthcheck = 'undefined'
  ) {
    const currentUnixTime = moment()
    const currentTime = moment(currentUnixTime, moment.ISO_8601).format('YYYY-MM-DD[T]HH mm ss') + 'Z'
    const b64string = await page.screenshot({ encoding: 'base64' })
    const buffer = await Buffer.from(b64string, 'base64')

    if (healthcheck === 'undefined') {
      healthcheck = await this.getHealthCheck(constant.healthCheckRequired, 'false') // const healthCheck = await this.healthcheck
    }

    const domain =
      (env === 'local' || env === 'circleci')
        ? constant.localDomain
        : (env === 'dev')
            ? constant.devDomain
            : (env === 'stage')
                ? constant.stageDomain
                : constant.featDomain

    const filename = await (
      currentVersion + ' - ' +
      currentTime + ' - ' +
      env + '- ' +
      healthcheck + '% - ' +
      constant.os + ' - ' +
      constant.browser + ' - ' +
      domain + ' - ' +
      name + ' ' +
      detail + '.png'
    )

    const data = await {
      url: SLACK_API_URL,
      formData: {
        channels: slackChannel,
        file: {
          value: buffer,
          options: {
            filename
          }
        },
        filename,
        filetype: 'image/png',
        token: SLACK_API_TOKEN
      }
    }

    // notificationMode
    // 1:FAILED ERROR only
    // 2:WARNING 3:ALL (FAILED, ERROR, WARNING, INFO, PASSED)
    // TODO UI
    const isNotification =
      parseInt(constant.notificationMode) === 1
        ? await name.includes('FAILED') || name.includes('ERROR') || name.includes('PENDING')
        : parseInt(constant.notificationMode) === 2
          ? await (name.includes('FAILED') || name.includes('ERROR') || name.includes('WARNING'))
          : await true

    if (await (isNotification === true)) {
      if (saveLocalOnly === false || parseInt(debug) === 1) {
        await request.post(data, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            console.log('screenshot - ' + currentTime + ' - ' + name + detail)

            return true
          } else {
            if (parseInt(debug) === 1) console.log(body)
            if (parseInt(debug) === 1) console.log(error)

            return false
          }
        })
      } else {
        // saveLocalOnly === true && debugMode !== 1
        await page.screenshot({ path: baseDir + '/coverage/' + filename, fullPage: false })
      }
    }

    await page.waitForTimeout(parseInt(pageLoadDelay))
    await console.log(constant.infoPrefix + page.url())

    return b64string
  }

  async slackTextNotification () { }

  async warningNotification (page, warningText = 'Ooops') {
    await console.log('EvidenceComponent:warningNotification')
    await console.log(constant.warningPrefix + warningText)
    await this.slackNotification(page, constant.warningPrefix, warningText)
  }

  async endingNotification (
    page,
    url,
    data,
    describeName = 'describeName',
    currentUnixTime = '1',
    screenshot = true,
    debug = parseInt(constant.debugMode),
    browser = null
  ) {
    if (parseInt(constant.debugMode) === 1) await console.log('EvidenceComponent:endingNotification - ' + currentUnixTime)

    screenshot === true ? await this.slackNotification(page, constant.notificationEnding, describeName) : await ''
    if (parseInt(constant.debugMode) === 1) await console.log('url: ' + url)
    if (parseInt(constant.debugMode) === 1) await console.log(data)
    parseInt(debug) !== 1 ? await page.close() : await ''
    parseInt(debug) !== 1 && browser !== null && browser.isConnected() === true ? await browser.close() : await ''
    await console.log(constant.notificationEnding + ' - ' + env + ' - ' + moment.unix(moment().unix()).format('YYYY-MM-DD HH:mm:ss'))
  }

  async closing (page, browser = null, namespace = currentUnixTime) {
    let getMetrics

    if (parseInt(constant.debugMode) === 1) {
      if (await constant.tool === 'puppeteer') {
        await page.waitForTimeout(3000) // handling After - function timed out
        getMetrics = await page.metrics()

        await console.log(constant.infoPrefix + 'Task Duration: ' + getMetrics.TaskDuration)
        await console.log('Metrics : ' + JSON.stringify(getMetrics))
      } else {
        // MEMO - Playwright
      }
    }

    if (parseInt(constant.debugMode) !== 1) await page.close()
    if (parseInt(constant.debugMode) !== 1 && browser !== null && browser.isConnected() === true) await browser.close()
  }

  async startedAt () {
    await console.log(constant.startedAtPrefix + env + ' - ' + moment.unix(moment().unix()).format('YYYY-MM-DD HH:mm:ss'))
  }

  async currentTime () {
    if (parseInt(constant.debugMode) === 1) await console.log('currentTime - ' + moment.unix(moment().unix()).format('YYYY-MM-DD HH:mm:ss'))
  }

  async pending (warningText) {
    console.log(constant.testPending + warningText)

    return 'pending'
  }
}

module.exports = EvidenceComponent
