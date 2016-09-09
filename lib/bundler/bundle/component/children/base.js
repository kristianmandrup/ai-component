const installer = require('../');

module.exports = class Base {
  constructor(config) {
    this.config = config;
    this.installer = installer;
  }

  get components() {
    return this.config.components || [];
  }

  run(config) {
    console.log(config);
    for (let component of this.components) {
      this.onItem(component);
    }
  }
}
