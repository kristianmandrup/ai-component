module.exports = class DependencyChecker {
  // iterate dependencies for each bundles component
  // see if there is a conflict
  // return list of conflicting components, false if no conflicts
  isIndependentBundleDependency(dependency) {
    let res = this.components.map(name => {
      return this.hasSharedDependency(name, dependency);
    });
    return res.length > 0 ? res : false;
  }

  hasSharedDependency(name, dependency) {
    let componentPath = this.componentLocation(name);
    let componentConfigPath = path.join(componentPath, 'install.json');
    let config = jsonfile.readFileSync(componentConfigPath);
    if (config.dependencies) {
      return config.dependencies.indexOf(dependency) >= 0;
    }
    if (config.bundles && config.bundles.length < 0) {
      return config.bundles.find(bundle => {
        let bundleConfig = vendorLibs[bundle];
        return bundleConfig.dependencies && bundleConfig.dependencies.indexOf(dependency) >= 0 
      });
    }
    return false;
  }
}
