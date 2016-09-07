const commitCmd = require('ai-core').command;
const bundler = require('./bundler');
const creator = require('./creator');

class Commander {
  constructor(name) {
    this.name = name;
  }

  bundle() {
    commitCmd(`component ${this.name} bundled`, () => { bundler.bundle(name) });
  }

  unbundle() {
    commitCmd(`component ${this.name} unbundled`, () => { bundler.unbundle(name) });
  }

  create() {
    commitCmd(`component ${this.name} created`, () => { creator.create(name, mountPath) });
  }

  install(target, mountPath) {
    installer.install(target, mountPath, (name) => {
      commitCmd(`component ${this.name} installed`);
    })
  }

  uninstall(name) {
    commitCmd(`component ${name} uninstalled`, () => { installer.uninstall(name) });
  }
}

function commander(...names) {
  return new Commander(...names);
}

module.exports = {
  instance: commander,
  clazz: Commander
}