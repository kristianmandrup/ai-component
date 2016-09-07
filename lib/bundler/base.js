const { Registry } = require('ai-core');
const Logger = require('./logger');

module.exports = class Base extends Logger {
  constructor() {
    super();
    this.registry = new Registry();
    this.componentRegistry = this.registry.componentRegistry;
  }
}
