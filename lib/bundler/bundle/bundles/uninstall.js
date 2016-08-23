const Base = require('./base');

module.exports = class UnInstall extends Base {
  constructor(config) {
    super(config);
  }
  
  get message() {
    return 'uninstalling bundles...'; 
  }

  onItem(name) {
    this.bundler.unbundle(name)
  }        
}
