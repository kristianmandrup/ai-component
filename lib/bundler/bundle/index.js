const Base = require('../base');
const One = require('./one');

class Bundle extends Base {
  constructor() {
    super();
    this.componentsPath = this.registry.fullComponentsPath;
    this.configurer = require('./configurer');
  }

  get files() {
    return io.filesIn(this.componentsPath);
  }

  bundle(name) {
    if (Array.isArray(name)) {
      for (let name of names)
        this.bundle(name); 
    }
    try {
      name ? this.bundleOne(name) : this.bundleAll();
    } catch (e) {
      this.error('bundle error', e);
    }    
  }

  bundleAll() {
    this.log('bundle all');
    // Loop through all the folders in the src/components directory
    this.files.forEach(this.bundleOne.bind(this));
    this.log('To install component dependencies, please run:', c.important('npm install')); 
  }

  bundleOne(name) {
    new One(name).bundle();    
  }
}

function bundle(name) {
  new Bundle().bundle(name);
}

module.exports = {
  bundle: bundle,
  Bundle: Bundle
}