"use strict";

const { Registry, Preferences, utils, aureliaFile } = require('ai-core');
const {_, log, io} = utils;
const { path, readJson } = io;
const sort = require('sort-json');

const TypingsInstaller = require('ai-typings');
const LibraryBundler = require('ai-lib');
const Configure = require('./configure');

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

  bundleAll(done) {
    // Loop through all the folders in the src/components directory
    let files = fs.readdirSync(this.componentsPath, 'utf8');
    files.forEach(this.bundleOne.bind(this));
    console.log('To install component dependencies, please run:', c.important('npm install')); 
  }

  bundleOne(file) {
    let filePath = path.join(this.componentsPath, file);
    let stat = fs.statSync(filePath);
    if( stat.isDirectory() ) {
      new Configure(filePath).install();
    }
  }
}

