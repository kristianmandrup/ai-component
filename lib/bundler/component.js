const { utils } = require('ai-core');
const { readFile } = utils.io;
const lib = require('ai-lib');
const vendorLibs = lib.registries.vendor;

module.exports = class ComponentConfig {
  constructor(config) {
    this.config = config;
    this.dependencies = config.dependencies || [];
    this.bundles = config.bundles || [];
    this.prepends = this.config.prepend || [];
  }

  get dependencies() {    
    const expandedBundleDeps = this.bundles.map(dep => {
      return vendorLibs[dep].dependencies;
    })

    return _.uniq(_.flatten(installConfig.dependencies.concat(expandedBundleDeps)));
  }
}
