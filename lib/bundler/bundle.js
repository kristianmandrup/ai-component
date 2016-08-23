"use strict";

const { Registry, Preferences, utils, aureliaFile } = require('ai-core');
const {_, log, io} = utils;
const { path, readJson } = io;
const sort = require('sort-json');

const TypingsInstaller = require('ai-typings');
const LibraryBundler = require('ai-lib');
const Configure = require('./bundle/configure');

module.exports = class ComponentBundler {
  constructor(componentsPath) {
    this.registry = new Registry();
    this.componentsPath = componentsPath || this.registry.componentsPath;
  }

  bundle(file, done) {
    try {
      file ? this.bundleOne(file, done) : this.bundleAll(done);
      done();
    } catch (e) {
      done(e);
    }    
  }

  filePath(name) {
    return path.join(this.componentsPath, name);
  }

  get files() {
    return io.filesIn(this.componentsPath);
  }

  bundleAll(done) {
    // Loop through all the folders in the src/components directory
    this.files.forEach(this.bundleOne.bind(this));
    console.log('To install component dependencies, please run:', c.important('npm install')); 
  }

  bundleOne(name) {    
    hasFolder(this.filePath(name), () => {
      new Configure(filePath).install();
    })
  }
}

