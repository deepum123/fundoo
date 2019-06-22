const isWin = /^win/.test(process.platform);
const isMac = /^darwin/.test(process.platform);
const isLinux = /^linux/.test(process.platform);

const getPlatform = () => {
  if (isMac) {
    return "macosx";
  }
  if (isLinux) {
    return "linux";
  }
  if (isWin) {
    return "windows";
  }
  throw Error(`Not supported platform: "${process.platform}".`)
};

module.exports = {
  isWin,
  isMac,
  isLinux,
  name: getPlatform()
};