const { Preferences, utils  } = require('ai-core');
const { io } = utils;
const { hasFolder, path } = io;
const Base = require('../base');
// const { decorate } = require('core-decorators');
// const { memoize } = require('lodash');


module.exports = class One extends Base {
  constructor(name) {
    super();
    this.name = name;
    this.componentsPath = this.registry.fullComponentsPath;
    this.configurer = require('./configurer');
  }

  // @decorate(memoize)
  get filePath() {
    return this.componentRegistry.location(this.name);
  }

  bundle() {
    hasFolder(this.filePath) ? this.configure() : this.missingFolder();
  }

  configure() {  
    this.configurer.create(this.name, this.filePath).configure();
  }

  missingFolder() {
    this.error(`Can't bundle component ${this.name}. Missing component folder: ${this.filePath}`);
  }
}
