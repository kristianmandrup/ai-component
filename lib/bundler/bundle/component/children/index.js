const Install = require('./install');
const UnInstall = require('./uninstall');

function install(config) {
  return new Install(config);
}

function uninstall(config) {
  return new UnInstall(config);
}

module.exports = {
  install: install,
  uninstall: uninstall
}