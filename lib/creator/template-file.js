module.exports = class TemplateFile {
  constructor(templatePath, destinationPath, data) {
    this.templatePath = path.join('templates', 'component', templatePath);;
    this.destinationPath = destinationPath || path.basename(templatePath);
    this.data = data;
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
    return this.assemble(this.templatePath, data);
  }

  get destFolder() {
    return path.dirname(this.destinationPath);;
  } 
  
  createFile() {
    try { 
      io.writeFile(this.destinationPath, this.fileContent);
    } catch (e) {
      throw `Template write error: ${this.templatePath} -> ${this.destinationPath}`;
    }
  }  

  get destinationFilePath() {
    return path.join(this.destinationFolder, this.fullDestinationPath);
  } 

  templateFile() {         
    this.createFile(this.templatePath, this.destinationFilePath, this.ctx)
  }

  create() {
    try {
      this.templateFile();
    } catch (e) {
      throw `ERROR: componentFile: ${this.templatePath}`;
    }
  }
}