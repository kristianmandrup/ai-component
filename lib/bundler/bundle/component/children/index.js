const Install = require('./install');
const UnInstall = require('./uninstall');

function install(config) {
  new Install(config).run();
}

function uninstall(config) {
  new UnInstall(config).run();
}

module.exports = {
  install: install,
  uninstall: uninstall
}