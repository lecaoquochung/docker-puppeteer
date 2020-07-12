const puppeteer = require('puppeteer');
const timeout = 20000;
testName = "open Google homepage";

describe(
  '/ (' + testName + ')',
  () => {
    let page;
    let browser ;

    beforeAll(async () => {
      // Running as root without --no-sandbox is not supported. See https://crbug.com/638180
      // https://app.circleci.com/pipelines/github/lecaoquochung/docker-puppeteer/41/workflows/7b4e4ab8-b8b2-46c6-9d21-f87abcd4543b/jobs/42
      // browser = await puppeteer.launch({});
      // https://github.com/karma-runner/karma-chrome-launcher/issues/158
      // Research sandbox
      // https://unix.stackexchange.com/questions/68832/what-does-the-chromium-option-no-sandbox-mean
      // https://www.google.com/googlebooks/chrome/big_00.html
      browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
      page = await browser.newPage();
      await page.goto('https://google.co.jp');
    }, timeout)

    afterAll(async () => {
      await page.close();
      await browser.close();
    })

    it('should load without error', async () => {
      let text = await page.evaluate(() => document.body.textContent);
      await expect(text).toContain('google');
    });
  },
  timeout
)