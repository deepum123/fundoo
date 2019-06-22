const path = require('path');
const platform = require('./platform');

const SONAR_SCANNER_CLI_VERSION = process.env.SONAR_SCANNER_CLI_VERSION  ||
    process.env.npm_config_sonar_scanner_cli_version ||
    '3.2.0.1227';
const SONAR_SCANNER_BASE_URL = process.env.SONAR_SCANNER_BASE_URL  ||
    process.env.npm_config_sonar_scanner_base_url ||
    'https://binaries.sonarsource.com/Distribution/sonar-scanner-cli';
const SONAR_SCANNER_CLI_FOLDER = `sonar-scanner-${SONAR_SCANNER_CLI_VERSION}`;
const SONAR_SCANNER_CLI_WITH_JRE_FOLDER = `${SONAR_SCANNER_CLI_FOLDER}-${platform.name}`;
const SONAR_SCANNER_URL = `${SONAR_SCANNER_BASE_URL}/sonar-scanner-cli-${SONAR_SCANNER_CLI_VERSION}.zip`;
const SONAR_SCANNER_WITH_JRE_URL = `${SONAR_SCANNER_BASE_URL}/sonar-scanner-cli-${SONAR_SCANNER_CLI_VERSION}-${platform.name}.zip`;
const SONAR_SCANNER_CLI_INSTALL_PATH = path.join(__dirname, '..', 'dist');
const SONAR_EXECUTABLE = `sonar-scanner${platform.isWin ? '.bat' : ''}`;
const config = {
  sonarqubeScannerVersion: SONAR_SCANNER_CLI_VERSION,
  sonarqubeScannerUrl: SONAR_SCANNER_URL,
  sonarqubeScannerWithJreUrl: SONAR_SCANNER_WITH_JRE_URL,
  installPath: SONAR_SCANNER_CLI_INSTALL_PATH,
  somarqubeFolder: `${SONAR_SCANNER_CLI_INSTALL_PATH}/${SONAR_SCANNER_CLI_FOLDER}`,
  somarqubeWithJreFolder: `${SONAR_SCANNER_CLI_INSTALL_PATH}/${SONAR_SCANNER_CLI_WITH_JRE_FOLDER}`,
  sonarqubeScannerExecutable: path.join(
    SONAR_SCANNER_CLI_INSTALL_PATH,
    SONAR_SCANNER_CLI_FOLDER,
    'bin',
    SONAR_EXECUTABLE
  ),
  sonarqubeAccessTokenFile: 'sonar.login'
};

module.exports = config;
