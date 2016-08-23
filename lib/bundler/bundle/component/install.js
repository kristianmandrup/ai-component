const installer = require('../../installer')
const configurer = require('../configurer');

class Installer {
  constructor(component) {
    this.component = component; 
  }

  resolve() {
    return this.resolveLocal() || this.resolveRemote() || this.resolveError();  
  }

  resolveLocal() {
    return this.component.filePath ? this.configure() : null; 
  } 

  resolveRemote() {
    return this.component.remoteURL ? this.install() : null;
  }

  install() {
    return installer.install(this.component);
  } 

  configure() {
    return configurer.configure(this.component);
  }
}

function install(component) {
  new InstallComponent(component).resolve(); 
}

module.exports = {
  install: install,
  Installer: Installer 
}