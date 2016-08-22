const { utils, Registry, Preferences} = require('ai-core');
const { log, ask, io, template } = utils; 
const { filesIn, path } = io;
const ContextMaker = require('./context-maker');

module.exports = class Templator {
  constructor(paths, ctx) {
    this.paths = paths;
    this.name = paths.name;    
    this.destinationFolder = this.paths.destinationFolder;
    this.registry = new Registry();
    this.preferences = new Preferences();
    this.ctx = new ContextMaker(this.name, ctx).ctx;
    this.layoutPath = this.paths.layoutPath;
    this.layouter = require(this.paths.relativeLayoutPath);
    this.templatePaths = this.layouter.template.paths(this.ctx);    
  }

  get registryConfig() {
    return this.registry.config;
  }

  // TODO: use component layout/skeleton mapping?
  create() {
    this.createComponentFiles();
    this.createIndex();    
  }
    
  createComponentFiles() {
    for (let templatePath of this.templatePaths) {
      let targetFile = this.layouter.template.rename(templatePath, this.ctx);
      this.componentFile(templatePath, targetFile);
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
    let opts = {
      basePath: path.join(this.layoutPath, 'component'), 
      templatePath: templatePath, 
      destinationPath: destinationPath, 
      ctx: this.ctx
    };
    let templater = template(this.destinationFolder, opts)
    templater.create();
  }
}