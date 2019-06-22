var fs = require('fs');
var path = require('path');
var download = require('download');
var log = require('fancy-log');
var mkdirs = require('mkdirp').sync;
var config = require('./config');

const isJavaInstalled = () => {
  try {
    const result = require('child_process').spawnSync('java', ['-version']).stderr.toString();
    return new RegExp('version ".*"').test(result);
  } catch(err){
    return false;
  }
};

const downloadSonarScanner = () => {
  const hasJava = isJavaInstalled();
  const downloadUrl = hasJava ? config.sonarqubeScannerUrl : config.sonarqubeScannerWithJreUrl;
  try {
    fs.accessSync(config.sonarqubeScannerExecutable, fs.F_OK);
    log('Local sonar-scanner exists...skipping download.');
  } catch (e) {
    log(`Downloading sonar-scanner:${config.sonarqubeScannerVersion} - ${downloadUrl}...`);
    mkdirs(config.installPath);
    log(`installPath: ${config.installPath}`);
    download(downloadUrl, config.installPath, {extract: true})
      .then(() => {
        if(!hasJava) {
          fs.renameSync(config.somarqubeWithJreFolder, config.somarqubeFolder);
        }
        log('sonar-scanner download complete');
      })
      .catch((err) => {
          log.error(`Error downloading sonar-scanner: ${err.message}`);
          throw err;
        }
      );
  }
};

downloadSonarScanner();