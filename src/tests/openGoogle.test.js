const puppeteer = require('puppeteer');
const timeout = 20000;
testName = "open Google homepage";

describe(
  '/ (' + testName + ')',
  () => {
    let page;
    let browser ;

    beforeAll(async () => {
      browser = await puppeteer.launch({});
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