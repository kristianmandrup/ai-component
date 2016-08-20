const { Registry } = require('ai-core');

module.exports = class Configurer {
  constructor(paths) {
    this.paths = paths;
    this.destinationPath = paths.destinationPath;
    this.name = paths.name;
    this.bundler = require('../bundler');
    this.registry = new Registry();
  }

  get components() {
    return this.registry.components;
  }

  get autoBundle() {
    return this.registry.autoBundle;
  }

  configure() {
    // update registry with new component entry
    // also bundles if autoBundle is true
    this.components.register(this.name, this.destinationPath);

    if (this.autoBundle) {
      this.bundler.bundle(name);
    }
    
  }

  deconfigure() {
    // update registry by removing component entry
    // also unbundles if autoBundle is true
    this.components.unregister(this.name);

    if (this.autoBundle) {
      this.bundler.unbundle(name);
    }
  }
}
