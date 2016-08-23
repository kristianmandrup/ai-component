const { Registry, utils } = require('ai-core');
const { path, readFile} = utils.io;

module.exports = class InstallConfig {
  constructor(name) {
    this.name = name;
    this.registry = new Registry();
    this.srcPath = this.registry.componentLocation(this.name);
  }

  get installPath() {
    return path.join(this.srcPath, 'install.json');
  }

  validateRegistration() {
    if (!srcPath) {
      throw `Component ${this.name} is not registered in your application component registry`;
    }
  }

  get object(validate = false) {
    if (this.config) return this.config;
    if (validate)    
      this.validateRegistration();

    try {      
      return this.config = readFile(this.installPath);      
    } catch (e) {
      throw `config file install.json for ${this.name} could not be read`;
    }    
  }  
}
