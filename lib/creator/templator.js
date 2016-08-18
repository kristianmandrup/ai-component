const fs = require('fs-extra');
const ejs = require('ejs');
const {log, utils, Registry, Preferences} = require('ai-core');
const { ask, _, io, classify } = utils;
const { path, readJson } = io; 


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

  assemble(templatePath, data) {
    try {
      if (!this.validate(data)) {
        console.error('invalid ctx data', data);
        throw 'Abort';
      }
      const fullPath = path.join(__dirname, templatePath);
      const template = io.readFile(fullPath, 'utf-8');
      // console.log('template', template);
      return ejs.render(template, data);
    } catch (e) {
      console.log(e);
      throw `Template error: ${fullPath}`;
    }
  }

  createFile(templatePath, destinationPath, data) {
    let fileContent = this.assemble(templatePath, data);
    let destFolder = path.dirname(destinationPath);
    try { 
      io.writeFile(destinationPath, fileContent);
    } catch (e) {
      throw `Template write error: ${templatePath} -> ${destinationPath}`;
    }
  }  

  templateFile(templatePath, destinationPath) {
    destinationPath = destinationPath || path.basename(templatePath);
    let destFile = path.join(this.destinationFolder, destinationPath);
    templatePath = path.join('templates', templatePath);
    this.createFile(templatePath, destFile, this.ctx)
  }

  componentFile(templatePath, destinationPath) {
    try {
      templatePath = path.join('component', templatePath);
      this.templateFile(templatePath, destinationPath);
    } catch (e) {
      throw `ERROR: componentFile: ${templatePath}`;
    }
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

  // TODO: check file not there!
  createIndex() {
    this.templateFile('index.js', '../index.js');
  }    

  // TODO: use component layout/skeleton mapping?
  create(name) {
    if (this.ctx.hasView) {
      this.componentFile('index.html', `${name}.html`);
    }

    this.componentFile('index.js', `${name}.${this.ctx.ext}`);

    this.componentFile('package.json_', 'package.json');
    this.componentFile('install.json');
    this.componentFile('Readme.md');
    this.componentFile('_gitignore', '.gitignore');

    this.createIndex();  
  }
}