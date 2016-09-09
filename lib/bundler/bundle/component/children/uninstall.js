const Base = require('./base');

module.exports = class UnInstall extends Base {
  constructor(config) {
    super(config);
    this.message = 'uninstalling child components...';
  }
  
  onItem(component) {
    this.installer.uninstall(component); 
  }
}
