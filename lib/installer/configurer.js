const { Registry } = require('ai-core');

module.exports = class Configurer {
  constructor(name) {
    this.name = name;
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
    this.components.register(this.name);

    // bundle if autoBundle is true
    if (this.autoBundle)
      this.bundler.bundle(name);
  }

  deconfigure() {
    // update registry by removing component entry
    this.components.unregister(this.name);

    // unbundle if autoBundle is true
    if (this.autoBundle)
      this.bundler.unbundle(name);
  }
}
