const installer = require('../../../installer')
const configurer = require('../configurer');

class UnInstall {
  constructor(component) {
    this.component = component; 
  }
}

function uninstall(component) {
  new UnInstall(component).uninstall(); 
}

module.exports = {
  uninstall: uninstall,
  UnInstall: UnInstall 
}