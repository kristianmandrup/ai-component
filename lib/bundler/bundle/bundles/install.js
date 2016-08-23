const Base = require('./base');

module.exports = class Install extends Base {
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
