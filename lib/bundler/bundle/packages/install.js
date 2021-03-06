const Base = require('./base');
const _ = require('lodash');
const sort = require('sort-json');

class Install extends Base {
  constructor(config, filePath) {
    super(config, filePath);
  }

  get message() {
    return 'installing npm package dependencies';
  }

  createMutator(options) {
    return function (targetConfig, sourceConfig) {
      if (options.key) {
        let source = {}
        source[options.key] = sourceConfig[options.key]
        sourceConfig = source;
      }

      return sort(_.merge({}, targetConfig, sourceConfig));
    }
  }
}

function install(config, filePath) {
  new Install(config, filePath).install();
}

module.exports = {
  install: install,
  Install: Install
}
