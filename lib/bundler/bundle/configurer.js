const { utils } = require('ai-core');
const { io, log } = utils; 
const { path, readJson } = io; 

const component = require('./component');
const bundles = require('./bundles');
const typings = require('./typings');
const packages = require('./packages');
const Base = require('../base');
const aureliaConfig = require('./aurelia-config');
const InstallConfig = require('../install-config');

class Configurer extends Base {
  constructor(name) {
    super();
    this.name = name;
    this.installConfig = new InstallConfig(name);
    this.filePath = this.installConfig.srcPath;

    this.aureliaConfig = aureliaConfig;
    this.component = component;
    this.packages = packages;
    this.bundles = bundles;
    this.typings = typings;    

    this.childComponents = this.component.children;
    this.installConfigPath = this.installConfig.installPath;
    this.config = this.installConfig.object();
  }

  get entries() {
    return ['aureliaConfig', 'packages', 'typings', 'bundles', 'childComponents'];
  }

  configure() {
    // console.log(c.info('Installing '), c.important(this.name));
    this.entries.forEach(entry => {      
      this[entry].install(this.config, this.filePath)
    });
  
    // this.installLibs();
    this.componentRegistry.markAsBundled(this.name);
    log.success(this.name + '✓');
  }
}

function configurer(name, filePath) {  
  return new Configurer(name, filePath);
}

module.exports = {
  clazz: Configurer,
  create: configurer
}