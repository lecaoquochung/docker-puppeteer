
# Verify
pwd;whoami;ls;
echo "Env: $ENV"
echo "Test Suite Name: $TEST_SUITE_NAME"
echo "Feature Domain: $FEATURE_DOMAIN"

# Verify circleci test glob
CIRCLECI_GLOB=$(circleci tests glob "features/e2e/**/*.feature")
echo "$CIRCLECI_GLOB"

# Run test old-fashion
# xargs -a ./features/testsuite/${TEST_SUITE_NAME}.txt -I {} circleci tests glob features/{} | circleci tests split --split-by=timings | xargs -I {} yarn feature -f json:coverage/feature/$TEST_SUITE_NAME.json {}

# CircleCI config rerun failed tests
# https://circleci.com/docs/rerun-failed-tests/#example-config-file-after
TEST_FILES=$(xargs -a ./features/e2e/testsuite/${TEST_SUITE_NAME}.txt -I {} circleci tests glob features/e2e/{})
echo "$TEST_FILES" | circleci tests run --command="xargs yarn feature -f json:coverage/feature/$TEST_SUITE_NAME.json {}" --verbose --split-by=timings