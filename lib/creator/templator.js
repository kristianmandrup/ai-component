const fs = require('fs-extra');
const { template, log, utils, Registry, Preferences} = require('ai-core');
const { ask, classify } = utils; 

module.exports = class Templator {
  constructor(name, destinationFolder, ctx) {
    this.name = name;
    this.destinationFolder = destinationFolder;
    this.registry = new Registry();
    this.preferences = new Preferences();
    
    this.className = classify(this.name);

    this.setCtx(ctx);
  }

  get registryConfig() {
    return this.registry.config;
  }

  validate(data) {
    if (data.className) return true;
  }

  get baseCtx() {
    return {
      name: this.name,
      className: this.className,
      repoName: this.name,
      account: this.registryConfig.gitAccount,
      ext: this.preferences.jsFileExt || 'js'
    };
  }

  setCtx(ctx) {
    let keywords = ctx.keywords;
    keywords = keywords.match(/w+/) ? keywords.split(/,/) : [];
    keywords.unshift('aurelia-component');
    ctx.keywords = keywords;    
    this.ctx = Object.assign(this.baseCtx, ctx);
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