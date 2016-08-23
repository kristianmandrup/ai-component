const Base = require('./base');

class UnInstaller extends Base {
  constructor(filePath, config) {
    super(filePath, config);
  }

  createMutator(key = 'dependencies') {
    return function (targetConfig, sourceConfig) {
      for (let name in sourceConfig) {
        delete targetConfig[key][name];
      }
      return targetConfig;
    }
  }

  get message() {
    return 'configuring npm dependencies';
  }
}

function uninstall(filePath, config) {
  new UnInstaller(filePath, config).run();
}

module.exports = {
  uninstall: uninstall,
  UnInstaller: UnInstaller
}
