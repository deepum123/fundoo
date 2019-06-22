# sonarqube-scanner


sonarqube-scanner is npm package for [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner)

## Installation

`yarn add sonarqube-scanner-node`

## Usage

This package allows you to use same command line parameters and properties file [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) allows.

sonar-scanner-node can be added to node scripts as follows. 

```javascript  
 "scripts": {
    "sonarqube": "sonarqube-scanner-node -Dsonar.login=<token>",
  }
  ```
  
## Download From Mirrors

By default, SonarQube scanner binaries are downloaded from https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/. To use a custom mirror, use
environment variable `SONAR_SCANNER_BASE_URL` and `SONAR_SCANNER_CLI_VERSION`.

```sh
    export SONAR_SCANNER_BASE_URL=https://npm.taobao.org/mirrors/sonar-scanner/
    export SONAR_SCANNER_CLI_VERSION=3.2.0.1227
```

or (you can use [cross-env](https://www.npmjs.com/package/cross-env) for cross-platform)

```sh
    SONAR_SCANNER_BASE_URL=https://npm.taobao.org/mirrors/sonar-scanner/ SONAR_SCANNER_CLI_VERSION=3.2.0.1227 npm i
```

or set it in your `.npmrc` / npm variables.

```
    sonar_scanner_base_url=https://npm.taobao.org/mirrors/sonar-scanner/
    sonar_scanner_cli_version=3.2.0.1227
```


