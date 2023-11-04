echo $TEST_SUITE_NAME > coverage/feature/test_suite_name.txt

# Cucumber test report in JSON
yarn test:report coverage/feature/${TEST_SUITE_NAME}
echo "coverage/feature/${TEST_SUITE_NAME}.json" > coverage/feature/json_filelist.txt
xargs jq -s '[.[][]]' < coverage/feature/json_filelist.txt > coverage/feature/report.json

# Cucumber test report in Junit
yarn test:junitreport coverage/feature/report

# Junit report with timestamp for parallel test report
timestamp=$(date +"%Y-%m-%d_%H-%M-%S")
cp coverage/feature/report.xml coverage/feature/report_$timestamp.xml