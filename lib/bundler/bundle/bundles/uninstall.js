const Base = require('./base');

class UnInstall extends Base {
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

function uninstall(config) {
  new UnInstall(config).run();
}

module.exports = {
  UnInstall: UnInstall,
  uninstall: uninstall
}