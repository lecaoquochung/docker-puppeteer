const cucumberJunitConvert = require('cucumber-junit-convert')
const path = require('path')

// Get the JSON file path from command line arguments or provide a default value
const filePath = process.argv[2] || './report'

// Get the directory path of the JSON file
const directoryPath = path.dirname(filePath)

// Get the filename without extension from the JSON file path
const fileName = path.parse(filePath).name

const options = {
  inputJsonFile: filePath + '.json',
  outputXmlFile: path.join(directoryPath, `${fileName}.xml`),
  featureNameAsClassName: true // default: false
}

cucumberJunitConvert.convert(options)
