// const chalk = require('chalk')
const kleur = require('kleur');
const puppeteer = require('puppeteer')
const fs = require('fs')
const mkdirp = require('mkdirp')
const os = require('os')
const path = require('path')

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

module.exports = async function() {
  console.log(kleur.green('Setup Puppeteer'))
  // console.log(kleur.green(DIR))
  const browser = await puppeteer.launch({headless: 'new', args:['--no-sandbox']});
  
  // This global is not available inside tests but only in global teardown
  global.__BROWSER_GLOBAL__ = await browser
  
  // Instead, we expose the connection details via file system to be used in tests
  await mkdirp.sync(DIR)
  await fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint())
}