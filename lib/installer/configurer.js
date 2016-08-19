module.exports = class Configurer {
  constructor(name) {
    this.name = name;
    this.bundler = require('../bundler');
  }

  configure() {
    this.bundler.bundle(name);
  }

  deconfigure() {
    this.bundler.unbundle(name);
  }
}
