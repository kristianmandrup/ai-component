const { Registry } = require('ai-core');

module.exports = class Base {
  constructor(name) {
    this.registry = new Registry();
    this.componentRegistry = this.registry.componentRegistry;
  }

  // TODO: create @logging decorator!
  log(...msgs) {
    console.error(...msgs);
  }

  error(...msgs) {
    console.error(...msgs);
  }    
}