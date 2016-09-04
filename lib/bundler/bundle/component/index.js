const installer = require('./install');
const uninstaller = require('./uninstall');
const children = require('./children');

module.exports = {
  install: installer.install,
  uninstall: uninstaller.uninstall,
  children: children
}