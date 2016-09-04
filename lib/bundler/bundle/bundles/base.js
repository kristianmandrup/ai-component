const lib = require('ai-lib')

module.exports = class Base {
  constructor(config) {
    this.config = config;
    this.lib = lib;
  }

  get bundles() {
    return this.config.bundles;
  }

  run() {    
    if (!this.bundles) return;
    console.log(this.message);  
    for (let name of this.bundles) {
      this.onItem(name)
    }    
  }
}
