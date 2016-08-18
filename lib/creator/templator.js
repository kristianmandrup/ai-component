const fs = require('fs-extra');
const ejs = require('ejs');
const {log, utils, Registry, Preferences} = require('ai-core');
const { ask, _, path, readJson } = utils;


module.exports = class Templator {
  constructor(ctx) {
    this.setCtx(ctx);
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
      ext: this.preferences.jsFileExt
    };
  }

  setCtx(answers) {
    let keywords = answers.keywords;
    keywords = keywords.match(/w+/) ? keywords.split(/,/) : [];
    console.log(keywords);
    keywords.unshift('aurelia-component');
    answers.keywords = keywords;

    console.log(answers);
    this.ctx = Object.assign(this.baseCtx, answers);
  }

  // TODO: check file not there!
  createIndex() {
    this.templateFile('index.js', '../index.js');
  }    

  create(name) {
    if (this.ctx.hasView) {
      this.componentFile('index.html', `${vmName}.html`);
    }

    this.componentFile('index.js', `${vmName}.${this.ctx.ext}`);

    this.componentFile('package.json_', 'package.json');
    this.componentFile('install.json');
    this.componentFile('Readme.md');
    this.componentFile('_gitignore', '.gitignore');

    this.createIndex();  
  }
}