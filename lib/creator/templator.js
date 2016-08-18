const fs = require('fs-extra');
const ejs = require('ejs');
const {log, utils, Registry, Preferences} = require('ai-core');
const { ask, _, io } = utils;
const { path, readJson } = io; 


module.exports = class Templator {
  constructor(destinationFolder, ctx) {
    this.destinationFolder = destinationFolder;
    console.log('new Templator');
    this.registry = new Registry();
    this.preferences = new Preferences();
    
    this.setCtx(ctx);
  }

  get registryConfig() {
    return this.registry.config;
  }

  assemble(templatePath, data) {
    const fullPath = path.join(__dirname, templatePath);
    try {
      const template = fs.readFileSync(fullPath, 'utf-8');
      return ejs.render(template, data);
    } catch (e) {
      throw `Template error: ${fullPath}`;
    }
  }

  createFile(templatePath, destinationPath, data) {
    console.log('createFile', templatePath, destinationPath, data);
    let fileContent = assemble(templatePath, data);
    let destFolder = path.dirname(destinationPath);
    // console.log(fileContent);
    try {
      fs.writeFileSync(destinationPath, fileContent);
    } catch (e) {
      throw `Template write error: ${templatePath} -> ${destinationPath}`;
    }
  }  

  templateFile(templatePath, destinationPath) {
    destinationPath = destinationPath || path.basename(templatePath);
    console.log('templateFile', templatePath, destinationPath);
    let destFile = path.join(this.destinationFolder, destinationPath);
    templatePath = path.join('templates', templatePath);
    console.log('go', templatePath, destFile);
    this.createFile(templatePath, destFile, this.ctx)
  }

  componentFile(templatePath, destinationPath) {
    try {
      templatePath = path.join('component', templatePath);
      console.log('componentFile', templatePath);
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
      ext: this.preferences.jsFileExt
    };
  }

  setCtx(ctx) {
    let keywords = ctx.keywords;
    keywords = keywords.match(/w+/) ? keywords.split(/,/) : [];
    keywords.unshift('aurelia-component');
    ctx.keywords = keywords;
    console.log('baseCtx', this.baseCtx);    
    this.ctx = Object.assign(this.baseCtx, ctx);
  }

  // TODO: check file not there!
  createIndex() {
    this.templateFile('index.js', '../index.js');
  }    

  create(name) {
    console.log('create', name);
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