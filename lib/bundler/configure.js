const {utils, aureliaFile} = require('ai-core');
const { io, log } = utils; 
const { mutateJsonFile, path } = io;
const { c } = log; 
const ComponentInstaller = require('./component/install');


module.exports = class ConfigureComponent {
  constructor({name, filePath}) {
    this.filePath = filePath;
    this.name = name || path.basename(filePath);
    this.preferences = new Preferences();
  }

  install() {
    console.log(c.info('Installing '), c.important(this.name));

    this.mergeAureliaConfig();
    this.mergePackageDependencies();
    this.installTypings();
    this.installBundles();
    this.installLibs();
    this.installDtsSources();
    this.registry.markAsBundled(this.name);

    log.success(this.name + '✓');
  }

  get installConfig() {
    return path.join(this.filePath, 'install.json');
  }

  mergeAureliaConfig() {
    console.log('configuring aurelia.json vendor bundles');    
    aureliaFile.mergeBundle(aureliaConfigFilePath, this.installConfig);
  }

  // install libraries listed in "libs"
  installLibs() {
    // TODO
  }

  get components() {
    return this.config.components;
  }

  // iterate components
  // for each location
  //  - configure
  // for each remoteLocation
  //  - install 
  installSubComponents() {
    for (let component of this.components) {
      this.resolveComponent(component);
    }
  }

  resolveComponent(component) {
    new ComponentInstaller(component).resolve();
  }

  // Even better:
  // https://github.com/dchester/jsonpath
  // var nodes = jp.apply(data, '$..author', function(value) { return value.toUpperCase() });
  // Runs the supplied function fn on each matching element, and replaces each matching element with the return value from the function. 

  get config() {
    return this._config = this._config || jsonfile.readFileSync(this.installConfig);  
  }
}
