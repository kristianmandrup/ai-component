const { utils } = require('ai-core');
const { readFile } = utils.io;
const libRegistry = require('../../../registry/vendor-libs.json');

module.exports = class ComponentConfig {
  constructor() {
    this.config = this.installConfig();
    this.dependencies = config.dependencies || [];
    this.bundles = config.bundles || [];
    this.prepends = this.config.prepend || [];
  }

  get dependencies() {    
    const expandedBundleDeps = this.bundles.map(dep => {
      return libRegistry[dep].dependencies;
    })

    return _.uniq(_.flatten(installConfig.dependencies.concat(expandedBundleDeps)));
  }

  get installConfig() {
    if (this._installConfig) return this._installConfig;

    const srcPath = this.registry.componentLocation(this.name);
    if (!srcPath) {
      throw `Component ${this.name} is not registered in component registry: installer.json`;
    }

    try {
      let installPath = path.join(srcPath, 'install.json');
      return this._installConfig = readFile(installPath);      
    } catch (e) {
      throw `Install.json for ${this.name} could not be read for dependencies to unbundle`;
    }    
  }  
}
