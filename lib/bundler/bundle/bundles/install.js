const Base = require('./base');

class Install extends Base {
  constructor(config) {
    super(config);
  }
  
  get message() {
    return 'installing bundles...'; 
  }

  onItem(name) {
    this.bundler.bundle(name)
  }        
}

function install(config) {
  new Install(config).run();
}

module.exports = {
  Install: Install,
  install: install
}