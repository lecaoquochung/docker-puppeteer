/* eslint-disable */
const { setWorldConstructor } = require('@cucumber/cucumber');

class World {
  constructor() {
    this.browser;
    this.browserVersion;
    this.clipboard;
    this.context;
    this.currentUnixTime;
    this.date
    this.height;
    this.healthcheck;
    this.networkLogs;
    this.notification;
    this.page;
    this.scenario;
    this.taskDuration;
    this.version;
    this.width;
  }

  setTo(number) {
    this.variable = number;
  }

  incrementBy(number) {
    this.variable += number;
  }

  setTimestamp(timestamp) {
    this.currentUnixTime = timestamp;
  }

  setDate(date) {
    this.date = date;
  }

  isItFriday(today) {
    if (today === "Friday") {
      return "TGIF";
    } else {
      return "Nope";
    }
  }
}

setWorldConstructor(World);