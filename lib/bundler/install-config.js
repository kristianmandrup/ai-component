const { Registry, utils } = require('ai-core');
const { path, readFile} = utils.io;
const Base = require('./base');

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

module.exports = class InstallConfig extends Base {
  constructor(name) {
    super();
    this.name = name;
  }

  get installPath() {
    try {
      return path.join(this.componentPath, 'install.json');
    } catch (err) {
      return undefined;
    }    
  }

  validateRegistration() {
    if (!this.componentPath) {
      throw new Error(`Component ${this.name} is not registered in your application component registry`);
    }
  }

  object(validate = false) {
    if (this.config) return this.config;
    if (validate)    
      this.validateRegistration();

    if (process.env.NODE_ENV === 'test') {
      let component = global.mocks.configs.components[this.name];
      return component ? component.config : {};      
    }    
    return this.readInstallConfig();
  }

  readInstallConfig() {
    try {      
      return this.config = readFile(this.installPath);      
    } catch (e) {
      throw new Error(`config file install.json for ${this.name} could not be read`);
    }    
  }  
}
