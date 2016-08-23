class Filterer {
  constructor(dependencies) {
    this.dependencies = dependencies;        
  }

  get matchers() { 
    return {
      object: (obj) => { return JSON.stringify(obj) !== this.objDep },
      string: (name) => { return name !== this.dependency }
    }
  } 

  get objDep() {
    return JSON.stringify(this.dependency);
  }

  get matcherName() {
    return typeof this.dependency;
  }

  get matcher() {
    return this.matchers[this.matcherName];
  }

  filter(dependency) {
    this.dependency = dependency;        
    return _.filter(this.dependencies, (dependency) => {
      return this.matcher(dependency) ? dependencyChecker(dependency).isIndependent : false;        
    }); 
  }
} 

function createFilterer(dependencies) {
  return new Filterer(dependencies);
}

module.exports = {
  createFilterer: createFilterer,
  Filterer: Filterer 
}