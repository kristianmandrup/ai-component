module.exports = class Install {
  constructor(config) {
    this.config = config;
    this.bundler = new VendorLibraryBundler();
  }

  get bundles() {
    return this.config.bundles;
  }

  install() {    
    if (!this.bundles) return;

    console.log('installing bundles...');
    
    for (let name of this.bundles) {
      this.bundler.bundle(name)
    }    
  }
}