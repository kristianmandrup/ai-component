const Base = require('./base');

class UnInstall extends Base {
  constructor(config, filePath) {
    super(config, filePath);
  }

  createMutator(key = 'dependencies') {
    return function (targetConfig, sourceConfig) {
      for (let name in sourceConfig[key]) {
        delete targetConfig[key][name];
      }
      return targetConfig;
    }
  }

  get message() {
    return 'configuring npm dependencies';
  }
}

function uninstall(config, filePath) {
  new UnInstall(config, filePath).run();
}

module.exports = {
  uninstall: uninstall,
  UnInstall: UnInstall
}
