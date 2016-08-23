const Base = require('./base');

class Install extends Base {
  constructor(config) {
    super(config);
  }

  get message() {
    return 'installing typings...';
  }

  onItem(typing) {
    new InstallTypings(typing).install(result => {
    })
  }

  // merge: "dtsSource" into
  // "transpiler": {
  //   "dtsSource": [
  //     "./node_modules/aurelia-ui-framework/**/*.d.ts"
  dtsSources() {
    // TODO
    this.config.dtsSource;
  }  
}

function install(config) {
  new Install(config).run();
}

module.exports = {
  install: install,
  Install: Install
}