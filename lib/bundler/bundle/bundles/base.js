module.exports = class Base {
  constructor(config) {
    this.config = config;
    this.bundler = new VendorLibraryBundler();
  }

  get bundles() {
    return this.config.bundles;
  }

  run() {    
    if (!this.bundles) return;
    console.log(this.message);  
    for (let name of this.bundles) {
      this.onItem(name)
    }    
  }
}
