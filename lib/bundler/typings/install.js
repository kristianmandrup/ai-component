module.exports = class Install {
  constructor(config) {
    this.config = config;
  }

  get typings() {
    return this.config.typings;
  }

  install() {
    if (!this.preferences.useTypeScript) return;


    if (!this.typings) return;

    console.log('installing typings...');

    for (let typing of this.typings) {
      new InstallTypings(typing).install(result => {

      })
    } 
  }

  // merge: "dtsSource" into
  // "transpiler": {
  //   "dtsSource": [
  //     "./node_modules/aurelia-ui-framework/**/*.d.ts"
  //   ]
  // },

  // See http://jsonpath.com/ for JSON navigator
  // $.phoneNumbers[?(@.type == 'iPhone')].number
  dtsSources() {
    // TODO
    this.config.dtsSource;
    // we need an Injector that can navigate via intelligent path
    // mergeAureliaConfig('transpiler.dtsSource', dtsSources);
  }  
}