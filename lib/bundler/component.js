const { utils } = require('ai-core');
const { readFile } = utils.io;
const lib = require('ai-lib');

module.exports = class ComponentConfig {
  constructor(config) {
    this.config = config;
    this.dependencies = config.dependencies || [];
    this.bundles = config.bundles || [];
    this.prepends = this.config.prepend || [];
  }

  get expandedDependencies() {    
    return _.uniq(_.flatten(this.installConfigDependencies));
  }

  get installConfigDependencies() {
    installConfig.dependencies.concat(this.expandedBundleDeps);
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
