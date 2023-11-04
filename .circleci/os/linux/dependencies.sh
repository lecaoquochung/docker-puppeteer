echo $SHELL
pwd;ls;whoami;date;
yarn upgrade; yarn install
yarn --version

yarn global add junit-report-merger
yarn global bin

export PATH="$PATH:/home/qa/.yarn/bin"

# web driver
npx playwright install

# verify env var
echo $PUPPETEER_EXECUTABLE_PATH