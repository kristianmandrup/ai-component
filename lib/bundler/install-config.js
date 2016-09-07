const { Registry, utils } = require('ai-core');
const { path, readFile} = utils.io;

// Sample install.json
// {
//   "bundles": [
//     "foundation"
//   ],
//   "dependencies": [
//     "jquery",
//     {
//       "name": "bootstrap",
//       "path": "../node_modules/bootstrap/dist",
//       "main": "js/bootstrap.min",
//       "deps": ["jquery"],
//       "exports": "$",
//       "resources": [
//         "css/bootstrap.css"
//       ]
//     }
//   ],
//   "typings": [
//     "nprogress"
//   ]
// }

module.exports = class InstallConfig {
  constructor(name) {
    this.name = name;
    this.registry = new Registry();
    this.srcPath = this.registry.componentLocation(this.name);
  }

  get installPath() {
    try {
      return path.join(this.srcPath, 'install.json');
    } catch (err) {
      return undefined;
    }    
  }

  validateRegistration() {
    if (!this.srcPath) {
      throw new Error(`Component ${this.name} is not registered in your application component registry`);
    }
  }

  object(validate = false) {
    if (this.config) return this.config;
    if (validate)    
      this.validateRegistration();

    try {      
      return this.config = readFile(this.installPath);      
    } catch (e) {
      throw new Error(`config file install.json for ${this.name} could not be read`);
    }    
  }  
}
