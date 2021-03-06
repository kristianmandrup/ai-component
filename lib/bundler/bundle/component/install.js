const installer = require('../../../installer')
const configurer = require('../configurer');

class Install {
  constructor(component) {
    this.component = component; 
  }

  resolve() {
    return this.resolveLocal() || this.resolveRemote() || this.onError();  
  }

  resolveLocal() {
    return this.component.filePath ? this.configure() : null; 
  } 

  resolveRemote() {
    return this.component.remoteURL ? this.install() : null;
  }

  onError() {
    throw `Unable to resolve component: ${this.component.name}`;
  }

  install() {
    return installer.install(this.component);
  } 

  configure() {
    return configurer.configure(this.component);
  }
}

function install(component) {
  new Install(component).resolve(); 
}

module.exports = {
  install: install,
  Install: Install 
}