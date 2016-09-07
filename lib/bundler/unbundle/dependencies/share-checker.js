module.exports = class ShareChecker {
  constructor(name) {
    this.name = name;
    this.componentPath = this.componentLocation(name);

    // see component and install-config
    this.componentConfigPath = path.join(componentPath, 'install.json');
    this.config = readFile(componentConfigPath);
  }

  check() {
    if (config.dependencies) {
      return config.dependencies.indexOf(this.dependency) >= 0;
    }
    if (config.bundles && config.bundles.length < 0) {
      return config.bundles.find(bundle => {
        let bundleConfig = vendorLibs[bundle];
        return bundleConfig.dependencies && bundleConfig.dependencies.indexOf(this.dependency) >= 0 
      });
    }
    return false;
  }
}