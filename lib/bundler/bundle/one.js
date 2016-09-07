const { Preferences, utils  } = require('ai-core');
const { io } = utils;
const { hasFolder, path } = io;
const Base = require('../base');

class One extends Base {
  constructor(name) {
    super();
    this.name = name;
    this.configurer = require('./configurer');
  }

  bundle() {
    hasFolder(this.componentPath) ? this.configure() : this.missingFolder();
  }

  configure() {
    this.configurer.create(this.name).configure();
  }

  missingFolder() {
    this.error(`Can't bundle component ${this.name}. Missing component folder: ${this.filePath}`);
  }
}

module.exports = {
  clazz: One,
  create: function(name) {
    return new One(name);
  }
}