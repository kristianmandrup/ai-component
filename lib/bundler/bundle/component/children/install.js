const Base = require('./base');

module.exports = class Install extends Base {
  constructor(config) {
    super(config);
    this.message = 'installing child components...';
  }
  
  onItem(component) {
    this.installer.install(component); 
  }
}
