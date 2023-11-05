# Docker-Puppeteer
Docker image for [puppeteer](https://github.com/puppeteer/puppeteer).

[![CircleCI](https://circleci.com/gh/lecaoquochung/docker-puppeteer/tree/master.svg?style=svg)](https://circleci.com/gh/lecaoquochung/docker-puppeteer/tree/master)
[![Build Status](https://travis-ci.org/lehungio/php-fpm.svg?branch=master)](https://travis-ci.org/lecaoquochung/docker-puppeteer) 
[![Automated Build](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg)](https://hub.docker.com/r/lecaoquochung/puppeteer/builds/)
[![Windows Build Status](https://img.shields.io/appveyor/ci/lecaoquochung/docker-puppeteer/master.svg?logo=appveyor)](https://ci.appveyor.com/project/lecaoquochung/docker-puppeteer/branch/master)
[![Build Status](https://api.cirrus-ci.com/github/lecaoquochung/docker-puppeteer.svg)](https://cirrus-ci.com/github/lecaoquochung/docker-puppeteer)


Welcome to Docker-Puppeteer, your go-to Docker image for using Puppeteer. Puppeteer is a Node.js library that provides a convenient high-level API for controlling Chrome or Chromium through the DevTools Protocol. Whether you want to run Chrome in headless mode or need the full Chrome experience, Puppeteer has you covered.

## Supported Branches

We offer the following Docker image branches for your convenience:

- `nodejs:latest` (Docker image: `lecaoquochung/puppeteer:latest`)
  [Dockerfile](https://github.com/lecaoquochung/docker-puppeteer/blob/master/Dockerfile)

- `nodejs:18.17.0` (Docker image: `lecaoquochung/puppeteer:node-18.17.0`)
  [Dockerfile](https://github.com/lecaoquochung/docker-puppeteer/blob/node-18.17.0/Dockerfile)

## What is Puppeteer?

Puppeteer simplifies browser automation tasks by providing a user-friendly way to interact with Chrome or Chromium. Whether you're scraping web data, generating PDFs, or running end-to-end tests, Puppeteer's got you covered with its easy-to-use API.


## Getting image
```sh
sudo docker pull lecaoquochung/docker-puppeteer
```

## Basic usage

### Docker
```sh
# TODO run direct script with docker
# sudo docker run -v /path/to/your/app:/code -d lecaoquochung/docker-puppeteer
```

### docker-compose
- docker-compose.yml
```yaml
version: '3.7'

services:
  puppeteer:
    container_name: 
    image: lecaoquochung/puppeteer:latest
    init: true
    tty: true
    stdin_open: true
    volumes:
      - ./:/code
    working_dir: /code
    env_file:
      - .env
    dns: 8.8.8.8
    entrypoint: ["sh", "-c", "sleep infinity"]
```

## Reference
- Puppeteer Github
https://github.com/puppeteer/puppeteer
- Headless Chrome Node.js API 
https://pptr.dev/
- Chrome version for testing
https://googlechromelabs.github.io/chrome-for-testing/