const { aureliaFile } = require('ai-core');

const { createFilterer } = require('./filterer');

module.exports = class Remover {
  constructor(componentDependencies = [], name) {
    this.name = name;

    // if only one, put in a list
    if (typeof componentDependencies === 'string') {
      componentDependencies = [componentDependencies];
    }
    if (_.isEmpty(componentDependencies)) {
      log.info(`ABORT: No dependencies to unbundle found for ${name}`);
      return;
    }

    this.componentDependencies = componentDependencies;

    // find vendor lib dependencies in aurelia.json
    const dependencies = jp.value(aureliaFile.bundlePath()).dependencies;
    this.filterer = createFilterer(dependencies); 
  }

  get filteredDependencies() {
    return componentDependencies.reduce((filtered, dependency) => {
      return filterer.filter(dependency);
    }, {});
  }              

  // source must be a filePath to a json file or an Object
  remove() {
    aureliaFile.mutate(this.filteredDependencies, aureliaFile.replaceInBundle);
  } 
}  