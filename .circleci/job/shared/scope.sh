#!/bin/bash
echo $FEATURE_DOMAIN:
echo $ENV:
echo $TEST_SUITE_NAME;

# AWS CLI
# https://docs.aws.amazon.com/cli/latest/reference/configure/set.html#examples
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set default.region ap-northeast-1
echo 'export AWS_PROFILE="default"' >> $BASH_ENV
source $BASH_ENV

export FENV=$(echo "$FEATURE_DOMAIN" | cut -d'.' -f1)

aws cloudformation describe-stacks --stack-name "${FENV}" | jq '.Stacks[].Parameters'