const Component = require('./component');
const questions = require('./unbundle/questions');
const sort = require('sort-json');

module.exports = class ComponentUnBundler {
  constructor(componentsPath) {
    this.registry = new Registry();
    this.componentsPath = componentsPath || this.registry.componentsPath;
    this.component = new Component();
  }

  removeDependencies(dependencies) {
    remover(dependencies, this.name).remove();
  }

  unbundle(name) {
    this.name = name;
    ask(questions).then(answers => {      
      answers.remove ? this.removeVendorBundles() : bundleNotFound(name);
    })    
  }

  bundleNotFound(name) {
    throw `Bundle for ${name} not found`;
  }

  removeVendorBundles() {
    this.removeDependencies(this.component.dependencies);
    this.removePrepends(this.component.prepends);
    this.registry.markAsUnBundled(this.name);
  }

  removeLib(libConfig, name) {
    this.removeDependencies(libConfig.dependencies);
    this.removePrepends(libConfig.prepend);
  }  
}
