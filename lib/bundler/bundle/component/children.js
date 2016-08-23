class Base {
  constructor(config) {
    this.config = config;
  }

  run(config) {
    console.log();
    for (let component of config.components) {
      onItem(component);
    }
  }
}

class Install extends Base {
  constructor(config) {
    super(config);
    this.message = 'installing child components...';
  }
  
  onItem(component) {
    component.install(component); 
  }
}

class UnInstall extends Base {
  constructor(config) {
    super(config);
    this.message = 'uninstalling child components...';
  }
  
  onItem(component) {
    component.uninstall(component); 
  }
}

function install(config) {
  new Install(config).run();
}

function uninstall(config) {
  new UnInstall(config).run();
}

module.exports = {
  install: install,
  uninstall: uninstall
}