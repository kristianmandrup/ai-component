const { aureliaFile, log } = require('ai-core');
const { createFilterer } = require('./filterer');

function normalize(componentDependencies) {
    return typeof componentDependencies === 'string' ? [componentDependencies] : componentDependencies;
}

module.exports = class Remover {
  constructor(componentDependencies = [], name) {
    this.name = name;
    this.componentDependencies = componentDependencies;
    // find vendor lib dependencies in aurelia.json
    this.filterer = createFilterer(this.dependencies);
  }

  set componentDependencies(dependencies) {
    dependencies = normalize(dependencies);
    if (_.isEmpty(dependencies)) {
      log.info(`ABORT: No dependencies to unbundle found for ${name}`);
      return;
    }
    this._componentDependencies = dependencies;
  }

  get componentDependencies() {
    return this._componentDependencies;
  }

  get dependencies() {
    return jp.value(aureliaFile.bundlePath()).dependencies;
  }

  get filteredDependencies() {
    return this.componentDependencies.reduce((filtered, dependency) => {
      return filterer.filter(dependency);
    }, {});
  }

  // source must be a filePath to a json file or an Object
  remove() {
    aureliaFile.mutate(this.filteredDependencies, aureliaFile.replaceInBundle);
  }
}