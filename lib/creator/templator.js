const fs = require('fs-extra');
const { template, log, utils, Registry, Preferences} = require('ai-core');
const { ask, io } = utils; 
const { filesIn } = io;
const ContextMaker = require('./context-maker');

module.exports = class Templator {
  constructor(name, destinationFolder, ctx) {
    this.name = name;
    this.destinationFolder = destinationFolder;
    this.registry = new Registry();
    this.preferences = new Preferences();
    this.ctx = new ContextMaker(name, ctx).ctx;
    this.layouter = require(this.layoutPath);    
  }

  get registryConfig() {
    return this.registry.config;
  }

  // TODO: use component layout/skeleton mapping?
  create(name) {
    this.createIndex();  
  }

  get templatesPath() {
    return path.join(__dirname, './templates', this.layout); 
  }

  get layoutPath() {
    return path.join(this.templatesPath, 'layout')
  }

  get templatePaths() {
    return this.layouter.layout(this.ctx);
  }
    
  createComponentFiles() {
    for (let templatePath in this.templatePaths) {
      this.componentFile(templatePath, layouter.rename(templatePath));
    }
    createIndex();
  }

  // TODO: check file not there!
  createIndex() {
    this.componentFile('index.js', '../index.js');
  }    

  componentFile(templatePath, destinationPath) {
    template(this.destinationFolder, {templatePath: templatePath, destinationPath: destinationPath, ctx: this.ctx}).create();
  }
}