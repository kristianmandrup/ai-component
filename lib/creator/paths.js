const { utils, Registry, Preferences} = require('ai-core');
const { log, io, slug, ask, _ } = utils;
const { path, readJson } = io;

module.exports = class Paths {
  constructor() {
    this.registry = new Registry(); // TODO: should be instance
  }

  get appPath() {
    return this.registry.appPath;
  }

  get mountPath() {
    return this._mountPath || this.componentsPath;
  }

  get fullMountPath() {
    return path.join(this.appPath, this.mountPath);
  }

  named(name) {
    this.name = slug(name);
    this.destinationFolder = io.path.join(this.fullMountPath, this.name);
    return this;
  }
}