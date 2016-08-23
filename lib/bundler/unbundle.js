const Component = require('./component');
const questions = require('./unbundle/questions');
const sort = require('sort-json');
const lib = require('ai-lib');
const vendorLibs = lib.registries.vendor;
const _ = require('lodash');

module.exports = class ComponentUnBundler {
  constructor(componentsPath) {
    this.registry = new Registry();
    this.componentsPath = componentsPath || this.registry.componentsPath;
    this.config = new InstallConfig().object;
    this.component = new Component(this.config);
  }

  remove(key, list) {
    remover(this.name).remove(key, list);
  }

  unbundle(name) {
    this.name = name;
    ask(questions).then(answers => {      
      answers.remove ? this.removeAll() : bundleNotFound(name);
    })    
  }

  bundleNotFound(name) {
    throw `Bundle for ${name} not found`;
  }

  removeConfig(config) {
    for (let key of ['dependencies', 'prepends']) {
      this.remove(key, config[key]);
    }      
  }

  removeAll() {
    this.removeConfig(this.component);
    this.removeConfig(this.libConfig);

    this.registry.markAsUnBundled(this.name);
  }

  // find lib registrations and create config of dependencies and prepends
  get libConfig() { 
    return this.config.bundles.reduce((config, bundle) => {
      config = _.merge(config, vendorLibs[bundle]);
    }, {})   
  }
}
