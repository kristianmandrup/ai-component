const { Registry } = require('ai-core');
const Logger = require('./logger');

// const { decorate } = require('core-decorators');
// const { memoize } = require('lodash');

module.exports = class Base extends Logger {
  constructor() {
    super();
    this.registry = new Registry();
    this.componentRegistry = this.registry.componentRegistry;
  }

  get componentPath() {
    return this.componentRegistry.location(this.name);
  }  
}
