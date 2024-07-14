// Reference
// Navigation Timeout Exceeded when using networkidle0 and no insight into what timed out
// https://github.com/puppeteer/puppeteer/issues/1908
class PuppeteerComponent {
  constructor (page) {
    this._page = page
    this._requests = new Set()
    this._onStarted = this._onStarted.bind(this)
    this._onFinished = this._onFinished.bind(this)
    this._page.on('request', this._onStarted)
    this._page.on('requestfinished', this._onFinished)
    this._page.on('requestfailed', this._onFinished)
  }

  _onStarted (request) { this._requests.add(request) }
  _onFinished (request) { this._requests.delete(request) }

  inflightRequests () { return Array.from(this._requests) }

  dispose () {
    this._page.removeListener('request', this._onStarted)
    this._page.removeListener('requestfinished', this._onFinished)
    this._page.removeListener('requestfailed', this._onFinished)
  }
}

module.exports = PuppeteerComponent
