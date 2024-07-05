const kleur = require('kleur');
const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function() {
  console.log(kleur.green('Setup Puppeteer'));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  global.__BROWSER_GLOBAL__ = await browser;

  await mkdirp.sync(DIR);
  await fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
