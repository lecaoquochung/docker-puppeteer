const reporter = require('cucumber-html-reporter')
const path = require('path')

// Get the JSON file path from command line arguments or provide a default value
const filePath = process.argv[2] || './report'

// Get the directory path of the JSON file
const directoryPath = path.dirname(filePath)

// Get the filename without extension from the JSON file path
const fileName = path.parse(filePath).name

const options = {
  theme: 'bootstrap',
  jsonFile: filePath + '.json',
  output: path.join(directoryPath, `${fileName}.html`),
  reportSuiteAsScenarios: true,
  launchReport: false
}

reporter.generate(options)
