const { utils, aureliaFile } = require('ai-core');
const { io, log } = utils; 
const { path } = io; 

const component = require('./component');
const bundles = require('./bundles');
const typings = require('./typings');
const packages = require('./packages');

const aureliaConfig = {
  install: function(config) {
    console.log('configuring aurelia.json vendor bundles');    
    aureliaFile.addToVendorBundle(config);
  }
}

class Configurer {
  constructor({name, filePath}) {
    this.filePath = filePath;
    this.name = name || path.basename(filePath);
    this.preferences = new Preferences();
    this.childComponents = this.component.children;
    this.installConfigPath = path.join(this.filePath, 'install.json')
    this.config = jsonfile.readFileSync(this.installConfigPath);
  }

  configure() {
    // console.log(c.info('Installing '), c.important(this.name));
    ['aureliaConfig', 'packages', 'typings', 'bundles', 'childComponents'].forEach(obj => obj.install(this.config));
  
    // this.installLibs();
    // this.installDtsSources();
    this.registry.markAsBundled(this.name);
    log.success(this.name + '✓');
  }
}

function configurer(name, filePath) {
  return new Configurer(name, filePath);
}

module.exports = {
  Configurer: Configurer,
  configurer: configurer
}