const {log, utils, Registry, Preferences} = require('ai-core');
const { _, io } = utils;
const ejs = require('ejs');
const { path } = io; 

module.exports = class TemplateFile {
  constructor(destinationFolder, {templatePath, destinationPath, ctx}) {
    this.destinationFolder = destinationFolder
    this.templatePath = path.join('templates', 'component', templatePath);;
    this.destinationPath = destinationPath || path.basename(templatePath);
    this.data = ctx;
  }

  assemble() {
    try {      
      return ejs.render(this.template, this.data);
    } catch (e) {
      console.log(e);
      throw `Template error: ${fullPath}`;
    }
  }

  get template() {
    return io.readFile(this.fullTemplatePath, 'utf-8');
  }

  get fullTemplatePath() {
    return path.join(__dirname, this.templatePath);
  }
      
  get fileContent() {
    return this.assemble();
  }
  
  createFile() {
    try { 
      io.writeFile(this.destinationFilePath, this.fileContent);
    } catch (e) {
      throw `Template write error: ${this.templatePath} -> ${this.destinationPath}`;
    }
  }  

  get destinationFilePath() {
    return path.join(this.destinationFolder, this.destinationPath);
  } 

  templateFile() {         
    this.createFile();
  }

  create() {
    try {
      this.templateFile();
    } catch (e) {
      throw `ERROR: componentFile: ${this.templatePath}`;
    }
  }
}