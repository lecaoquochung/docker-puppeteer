# https://circleci.com/docs/2.0/env-vars#setting-an-environment-variable-in-a-shell-command
# echo 'export QA=$(cat qa_test)' >> $BASH_ENV
echo 'export PATH=/home/qa/code/bin:$PATH' >> $BASH_ENV
echo 'export QA=test' >> "${BASH_ENV}"
source $BASH_ENV
echo ${QA}