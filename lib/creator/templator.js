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
    console.log('new ctx', name, ctx)
    this.ctx = new ContextMaker(name, ctx).ctx;
    console.log('layouter', this.layoutPath)
    this.layouter = require(this.layoutPath);    
  }

  get registryConfig() {
    return this.registry.config;
  }

  // TODO: use component layout/skeleton mapping?
  create() {
    console.log('create...');
    this.createComponentFiles();
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
    console.log('paths', this.templatePaths);
    for (let templatePath in this.templatePaths) {
      this.componentFile(templatePath, layouter.rename(templatePath));
    }  
  }

  // TODO: check file not there!
  // skip if not a feature component
  createIndex() {
    if (!this.ctx.feature) return;

    io.unlessFilePresent('index.js', () => {
      console.log('creating missing feature index');
      this.componentFile('index.js', '../index.js');
    })    
  }    

  componentFile(templatePath, destinationPath) {
    template(this.destinationFolder, {templatePath: templatePath, destinationPath: destinationPath, ctx: this.ctx}).create();
  }
}