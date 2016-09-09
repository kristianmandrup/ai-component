const installer = require('../');

module.exports = class Base {
  constructor(config) {
    this.config = config;
    this.installer = installer;
  }

  run(config) {
    console.log(config);
    for (let component of this.config.components) {
      this.onItem(component);
    }
  }
}
