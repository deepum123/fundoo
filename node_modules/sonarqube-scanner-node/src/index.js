#!/usr/bin/env node

const path = require('path');
const log = require('fancy-log');
const execute = require('child_process').execFileSync;
const config = require('./config');
const fs = require('fs');

const args = process.argv.slice(2);

if (fs.existsSync(config.sonarqubeAccessTokenFile)) {
  log(`Reading token from ${config.sonarqubeAccessTokenFile}`);
  const token = fs.readFileSync(config.sonarqubeAccessTokenFile).toString().replace('\n','');
  args.push(`-Dsonar.login=${token}`);
}

log(`Executing sonarqube-scanner ${config.sonarqubeScannerExecutable}`);
execute(config.sonarqubeScannerExecutable, args, {stdio:[0,1,2]});