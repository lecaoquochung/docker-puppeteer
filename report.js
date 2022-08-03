const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'report.json',
  output: 'report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
};

reporter.generate(options);