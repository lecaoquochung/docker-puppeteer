echo $SHELL
cat /etc/os-release
pwd;ls;whoami;date;

# Chrome version
google-chrome --version
sudo apt-get upgrade google-chrome-stable -y
google-chrome --version

yarn upgrade; yarn install
yarn --version

yarn global add junit-report-merger
yarn global bin

export PATH="$PATH:/home/qa/.yarn/bin"

# web driver
npx playwright install

# verify env var
echo $PUPPETEER_EXECUTABLE_PATH