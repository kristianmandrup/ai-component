const {utils, aureliaFile} = require('ai-core');
const { io, log } = utils; 
const { mutateJsonFile, path } = io;
const { c } = log; 

module.exports = class ConfigureComponent {
  constructor(filePath) {
    this.filePath = filePath;
    this.name = path.basename(filePath);
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

  get bundler() {
    return this._bundler = new VendorLibraryBundler();
  }

  // install libraries listed in "libs"
  installLibs() {
    // TODO
  }


  // merge: "dtsSource" into
  // "transpiler": {
  //   "dtsSource": [
  //     "./node_modules/aurelia-ui-framework/**/*.d.ts"
  //   ]
  // },

  // See http://jsonpath.com/ for JSON navigator
  // $.phoneNumbers[?(@.type == 'iPhone')].number
  installDtsSources() {
    // TODO
    let dtsSources = this.config.dtsSource;
    // we need an Injector that can navigate via intelligent path
    // mergeAureliaConfig('transpiler.dtsSource', dtsSources);
  }

  // Even better:
  // https://github.com/dchester/jsonpath
  // var nodes = jp.apply(data, '$..author', function(value) { return value.toUpperCase() });
  // Runs the supplied function fn on each matching element, and replaces each matching element with the return value from the function. 

  installBundles() {
    let bundles = this.config.bundles;
    if (!bundles) return;

    console.log('installing bundles...');
    
    for (let name of bundles) {
      this.bundler.bundle(name)
    }    
  }

  get config() {
    return this._config = this._config || jsonfile.readFileSync(this.installConfig);  
  }

  installTypings() {
    if (!this.preferences.useTypeScript) return;

    let typings = this.config.typings;
    if (!typings) return;

    console.log('installing typings...');

    for (let typing of typings) {
      new InstallTypings(typing).install(result => {

      })
    } 
  }

  mergePackageDependencies() {
    console.log('configuring npm dependencies');
    let sourcePath = path.join(this.filePath, 'package.json');
    const mutator = createMutator({key: 'dependencies'});
    mutateJsonFile('./package.json', sourcePath, mutator);
  }
}

function createMutator(options) {
  // TODO: use ai-core merger!
  return function mutator(targetConfig, sourceConfig) {
    if (options.key) {
      let source = {}
      source[options.key] = sourceConfig[options.key]
      sourceConfig = source;
    }

    return sort(_.merge({}, targetConfig, sourceConfig));
  }
}
