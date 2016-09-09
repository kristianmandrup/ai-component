const Base = require('./base');

class UnInstall extends Base {
  constructor(config) {
    super(config);
    this.message = 'uninstalling child components...';
  }
  
  onItem(component) {
    this.installer.uninstall(component); 
  }
}
