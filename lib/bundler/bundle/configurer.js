const { utils, aureliaFile, Preferences } = require('ai-core');
const { io, log } = utils; 
const { path, readJson } = io; 

const component = require('./component');
const bundles = require('./bundles');
const typings = require('./typings');
const packages = require('./packages');
const Base = require('../base');

const aureliaConfig = {
  install: function(config) {
    if (!config) return;

    console.log('configuring aurelia.json vendor bundles', config);
    aureliaFile.addToVendorBundle(config);
  }
}

class Configurer extends Base {
  constructor({name, filePath}) {
    super();
    this.filePath = filePath;
    console.log(filePath);
    this.name = name || path.basename(filePath);
    this.component = component;
    this.preferences = new Preferences();
    this.childComponents = this.component.children;
    this.installConfigPath = path.join(this.filePath, 'install.json')
    this.config = readJson(this.installConfigPath);
  }

  get entries() {
    return ['aureliaConfig', 'packages', 'typings', 'bundles', 'childComponents'];
  }

  configure() {
    // console.log(c.info('Installing '), c.important(this.name));
    console.log('config', this.installConfigPath, this.config);
    this.entries.forEach(entry => {
      let config = this.config[entry];
      console.log('config', config);      
      aureliaConfig.install(config)
    });
  
    // this.installLibs();
    // this.installDtsSources();
    this.componentRegistry.markAsBundled(this.name);
    log.success(this.name + '✓');
  }
}

function configurer(name, filePath) {
  return new Configurer(name, filePath);
}

module.exports = {
  Configurer: Configurer,
  create: configurer
}