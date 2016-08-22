const { utils, Registry, Preferences} = require('ai-core');
const { _, log, ask, io, template } = utils; 
const { filesIn, path } = io;
const ContextMaker = require('./context-maker');
const _eval = require('eval');

function loadEval(filePath, dirname) {
  let content = io.readFile(filePath + '.js', 'utf8');
  try {
    return _eval(content, {filesIn: filesIn, _: _, path: path});
  } catch (e) {
    console.error(e);
    throw e;
  }  
}

function loadEvalRecurse(filePath) {
  let content = io.readFile(filePath + '.js', 'utf8');
  filePath = filePath.replace('\/index', '');
  content = content.replace(/require\('./g, "loadEval('" + filePath); 
  return _eval(content, {loadEval: loadEval});
}

module.exports = class Templator {
  constructor(paths, ctx) {
    this.paths = paths;
    this.name = paths.name;    
    this.destinationFolder = this.paths.destinationFolder;
    this.registry = new Registry();
    this.preferences = new Preferences();
    this.ctx = new ContextMaker(this.name, ctx).ctx;
    this.layoutPath = this.paths.layoutPath;

    let layouterPath = this.paths.relativeLayoutPath;
    
    let load = require; 
    if (this.paths.custom) {
      load = loadEvalRecurse;
      layouterPath = this.paths.relativeLayoutPath + '/index';
    } 

    this.layouter = load(layouterPath);
    let componentTemplatesPath = path.join(this.paths.relativeLayoutPath, 'component');
    let files = filesIn(componentTemplatesPath);
    this.templatePaths = this.layouter.template.paths(this.ctx, files);    
  }

  get registryConfig() {
    return this.registry.config;
  }

  // TODO: use component layout/skeleton mapping?
  create() {
    console.log('create');
    this.createComponentFiles();
    this.createIndex();    
  }
    
  createComponentFiles() {
    console.log('create Component Files');
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
    console.log('componentFile', opts);

    let templater = template(this.destinationFolder, opts)
    templater.create();
  }
}