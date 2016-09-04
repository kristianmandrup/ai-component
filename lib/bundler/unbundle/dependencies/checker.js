const { Registry, utils } = require('ai-core');
const { path, readFile} = utils.io;

const lib = require('ai-lib');
const vendorLibs = lib.registries.vendor; 

const { decorate } = require('core-decorators');
const { memoize } = require('lodash');

module.exports = class DependencyChecker {
  constructor(depencency) {
    this.depencency = depencency;
  }

  // usage
  get isIndependent() {
    return this.bundleDependencies.length > 0 ? this.bundleDependencies : false;
  }
  
  // iterate dependencies for each bundles component
  // see if there is a conflict
  // return list of conflicting components, false if no conflicts
  // @decorate(memoize)
  bundleDependencies() {
    return this.components.map(name => {
      return new ShareChecker(name).check();
    });
  }
}
