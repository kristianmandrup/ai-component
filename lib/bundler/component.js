const _ = require('lodash'); 
const lib = require('ai-lib');
const Logger = require('./logger');

module.exports = class ComponentConfig extends Logger {
  constructor(installConfig) {
    super();
    this.config = installConfig;
    this.dependencies = this.config.dependencies || [];
    this.bundles = this.config.bundles || [];
    this.prepend = this.config.prepend || [];
    this.expandBundleDeps();
  }

  get uniqueDependencies() {    
    return _.uniqBy(this.expandedDependencies, (dep) => {
      return typeof dep === 'string' ? dep : dep.name 
    });
  }

  get expandedDependencies() {
    return _.flatten(this.dependencies.concat(this.expandedBundleDeps));
  }

  get vendorLibs() {
    return lib.registries.vendor;
  } 
  
  expandBundleDeps() { 
    this.expandedBundleDeps = this.bundles.reduce( (expanded, name) => {
      let vendorLibConfig = this.vendorLibs[name];
      console.log(name, vendorLibConfig);
      return vendorLibConfig ? expanded.concat(vendorLibConfig.dependencies || []) : expanded; 
    }, []);
  }
}
