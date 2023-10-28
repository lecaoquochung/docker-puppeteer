# https://hub.docker.com/repository/docker/lecaoquochung/puppeteer
# https://github.com/lecaoquochung/docker-puppeteer
# scala-build
# image: lecaoquochung/puppeteer:latest / branch master
# image: lecaoquochung/puppeteer:dev    / branch dev

FROM node:18.17.0

WORKDIR /build

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst \
# #7 22.79 Package ttf-freefont is not available, but is referred to by another package.
#7 22.79 This may mean that the package is missing, has been obsoleted, or
#7 22.79 is only available from another source
#7 22.79 
#7 23.01 E: Package 'ttf-freefont' has no installation candidate
      # ttf-freefont \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /src/*.deb

ADD https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKjp-hinted.zip /tmp
RUN unzip /tmp/NotoSansCJKjp-hinted.zip && \
    mkdir -p /usr/share/fonts/noto && \
    cp *.otf /usr/share/fonts/noto && \
    chmod 644 -R /usr/share/fonts/noto/ && \
    fc-cache -fv

RUN apt-get update -y

# dependencies
RUN apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget --fix-missing \
    vim apt-utils git curl unzip sudo whois dnsutils

RUN apt-get update -y \
    && apt-get install -yq default-jre default-jdk software-properties-common python3 screen bash zip tar postgresql-client

# If running Docker >= 1.13.0 use docker run's --init arg to reap zombie processes, otherwise
# uncomment the following lines to have `dumb-init` as PID 1
# ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
# RUN chmod +x /usr/local/bin/dumb-init
# ENTRYPOINT ["dumb-init", "--"]

# Uncomment to skip the chromium download when installing puppeteer. If you do,
# you'll need to launch puppeteer with:
#     browser.launch({executablePath: 'google-chrome-unstable'})
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Pythong3 & Pip3
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        software-properties-common \
        apt-transport-https \
        jq \
        gpg-agent \
        time
RUN apt install -y python3-pip \
        python3-setuptools
RUN apt -y autoremove
RUN rm -rf /var/lib/apt/lists/*

# Install aws-cli 
# Update package repository information and install python3-venv
RUN apt-get update && apt-get install -y python3-venv

# Create a virtual environment
RUN python3 -m venv /venv

# Activate the virtual environment
ENV PATH="/venv/bin:$PATH"

# Install awscli within the virtual environment
RUN pip3 install awscli

# groff utility to format and display AWS CLI command output
RUN apt-get update
RUN apt-get install -y groff

# Install n package
RUN npm install -g n;

# Install trcli
RUN pip install trcli

# Install sbt
RUN curl -L -o /root/sbt.zip https://github.com/sbt/sbt/releases/download/v1.2.8/sbt-1.2.8.zip \
	&& unzip /root/sbt.zip -d /root \
	&& rm /root/sbt.zip

# Put tools like aws and sbt in the PATH
ENV PATH /root/.local/bin:/root/sbt/bin:/root/bin:${PATH}

# sbt build
RUN sbt sbtVersion

# Init yarn dependencies
COPY package.json /build
RUN yarn install

# Install puppeteer so it's available in the container.
RUN yarn add puppeteer \
    # Add user so we don't need --no-sandbox.
    # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
    && groupadd -r qa && useradd -r -g qa -G audio,video qa \
    && mkdir -p /home/qa/Downloads \
    && mkdir -p /home/qa/code \
    && chown -R qa:qa /home/qa \
    && chown -R qa:qa /build/node_modules

# Run everything after as non-privileged user.
RUN adduser qa sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER qa

# Install sbt
RUN curl -L -o /home/qa/sbt.zip https://github.com/sbt/sbt/releases/download/v1.2.8/sbt-1.2.8.zip \
	&& unzip /home/qa/sbt.zip -d /home/qa \
	&& rm /home/qa/sbt.zip

# Put tools like aws and sbt in the PATH
ENV PATH /home/qa/.local/bin:/home/qa/sbt/bin:/home/qa/bin:${PATH}

# timezone
# Reference https://stackoverflow.com/questions/40234847/docker-timezone-in-ubuntu-16-04-image
ENV TZ=Asia/Tokyo

# puppeteer executable path
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

RUN pwd;ls
RUN node --version
RUN npm --version
RUN yarn --version
RUN sudo yarn feature --version
RUN cat /build/package.json
RUN aws --version
RUN javac -version
RUN python3 --version
RUN pip3 --version
RUN aws --version
RUN trcli

CMD ["google-chrome-stable"]
