# docker-puppeteer
Docker image for [puppeteer](https://github.com/puppeteer/puppeteer).

[![Build Status](https://travis-ci.org/lehungio/php-fpm.svg?branch=master)](https://travis-ci.org/lecaoquochung/docker-puppeteer) 
[![Automated Build](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg)](https://hub.docker.com/r/lecaoquochung/puppeteer/builds/)
[![Windows Build Status](https://img.shields.io/appveyor/ci/lecaoquochung/docker-puppeteer/master.svg?logo=appveyor)](https://ci.appveyor.com/project/lecaoquochung/docker-puppeteer/branch/master)
[![Build Status](https://api.cirrus-ci.com/github/lecaoquochung/docker-puppeteer.svg)](https://cirrus-ci.com/github/lecaoquochung/docker-puppeteer)

## Supported branches

- nodejs:latest (lecaoquochung/puppeteer:latest)
 [Dockerfile](https://github.com/lecaoquochung/docker-puppeteer/blob/master/Dockerfile)
 - nodejs:11.12.0 (lecaoquochung/puppeteer:node11.12.0-dev)
 [Dockerfile](https://github.com/lecaoquochung/docker-puppeteer/blob/11.12.0/Dockerfile)

## What is Puppeteer ?
Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.

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
    image: lecaoquochung/puppeteer:node11.12.0
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

