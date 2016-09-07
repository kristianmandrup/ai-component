const { utils } = require('ai-core');
const { readFile } = utils.io;
const lib = require('ai-lib');

module.exports = class ComponentConfig {
  constructor(installConfig) {
    this.config = installConfig;
    this.dependencies = this.config.dependencies || [];
    this.bundles = this.config.bundles || [];
    this.prepend = this.config.prepend || [];
  }

  get allDependencies() {    
    return _.uniq(_.flatten(this.expandedDependencies));
  }

  get expandedDependencies() {
    this.dependencies.concat(this.expandedBundleDeps);
  }

  get vendorLibs() {
    return lib.registries.vendor;
  } 
  
  get expandedBundleDeps() { 
    return this.bundles.map(dep => {
      return vendorLibs[dep].dependencies;
    });
  }
}
