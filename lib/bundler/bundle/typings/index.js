const installer = require('./install');
const uninstaller = require('./uninstall');

module.exports = {
  install: installer.install,
  uninstall: uninstaller.uninstall
}