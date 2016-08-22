const fs = require('fs-extra');
const { template, log, utils, Registry, Preferences} = require('ai-core');
const { ask, classify } = utils; 
const ContextMaker = require('./context-maker');

module.exports = class Templator {
  constructor(name, destinationFolder, ctx) {
    this.name = name;
    this.destinationFolder = destinationFolder;
    this.registry = new Registry();
    this.preferences = new Preferences();
    this.ctx = new ContextMaker(name, ctx).ctx;
  }

  get registryConfig() {
    return this.registry.config;
  }

  // TODO: use component layout/skeleton mapping?
  create(name) {
    this.createIndex();  
  }

  // TODO: check file not there!
  createIndex() {
    this.componentFile('index.js', '../index.js');
  }    

  componentFile(templatePath, destinationPath) {
    template(this.destinationFolder, {templatePath: templatePath, destinationPath: destinationPath, ctx: this.ctx}).create();
  }
}