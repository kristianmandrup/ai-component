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
    return JSON.stringify(dependency);
  }

  get matcherName() {
    return typeof dependency;
  }

  get matcher() {
    return this.matchers[matcherName];
  }

  filter(dependency) {
    this.dependency = dependency;        
    return _.filter(this.dependencies, this.matcher); 
  }
} 

function createFilterer(dependencies) {
  return new Filterer(dependencies);
}

module.exports = {
  createFilterer: createFilterer,
  Filterer: Filterer 
}