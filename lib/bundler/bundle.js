const { Registry, Preferences, utils, aureliaFile } = require('ai-core');
const {_, log, io} = utils;
const { hasFolder, path, readJson } = io;
const sort = require('sort-json');

const TypingsInstaller = require('ai-typings');
const configurer = require('./bundle/configurer');

class Bundle {
  constructor(componentsPath) {
    this.registry = new Registry();
    this.componentsPath = componentsPath || this.registry.componentsPath;
  }

  bundle(file) {
    try {
      file ? this.bundleOne(file) : this.bundleAll();
    } catch (e) {
      console.error('bundle error', e);
      // done(e);
    }    
  }

  filePath(name) {
    return path.join(this.componentsPath, name);
  }

  get files() {
    return io.filesIn(this.componentsPath);
  }

  bundleAll() {
    // Loop through all the folders in the src/components directory
    this.files.forEach(this.bundleOne.bind(this));
    console.log('To install component dependencies, please run:', c.important('npm install')); 
  }

  bundleOne(name) {    
    hasFolder(this.filePath(name), () => {
      configurer(name, this.filePath).configure();
    })
  }
}

function bundle(name) {
  new Bundle().bundle(name);
}

module.exports = {
  bundle: bundle,
  Bundle: Bundle
}