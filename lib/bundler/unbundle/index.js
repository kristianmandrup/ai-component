const ComponentConfig = require('../component-config');
const questions = require('./questions');
const lib = require('ai-lib');
const { utils } = require('ai-core');
const { _, sort, ask } = utils; 
const { remover } = require('./dependencies');
const { Registry } = require('ai-core');
const InstallConfig = require('../install-config');

class UnBundler {
  constructor(options = {}) {
    this.registry = new Registry();
    this.componentsPath = options.componentsPath || this.registry.componentsPath;
    this.config = new InstallConfig().object;
    this.componentConfig = new ComponentConfig(this.config);
  }

  remove(key, list) {
    remover(list, key).remove();
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

  // remove single library entry
  removeLib(name, config) {
    this.remove(name, list);
  }

  removeAll() {
    this.removeConfig(this.componentConfig);
    this.removeConfig(this.libConfig);

    this.registry.markAsUnBundled(this.name);
  }

  get vendorLibs() {
    return lib.registries.vendor;
  }

  // find lib registrations and create config of dependencies and prepends
  get libConfig() {
    return this.config.bundles.reduce((config, bundle) => {
      config = _.merge(config, this.vendorLibs[bundle]);
    }, {})
  }
}

function instance() {
  return new UnBundler();
}

function run(name) {
  return instance().unbundle(name);
}

module.exports = {
  clazz: UnBundler,
  instance: instance,
  run: run
}
