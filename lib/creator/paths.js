const { utils, Registry, Preferences} = require('ai-core');
const { log, io, slug, ask, _ } = utils;
const { path, readJson } = io;

module.exports = class Paths {
  constructor(name, layout = 'simple', mountPath) {
    this.layout = layout;    
    this.registry = new Registry(); // TODO: should be instance
    this.appPath = this.registry.appPath || './src';
    this.componentsPath = this.registry.componentsPath || path.join(this.appPath, 'components');
    this.mountPath = mountPath || this.componentsPath;
    this.named(name);
  }

  get layoutPath() {
    return path.join(__dirname, 'templates', this.layout);
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