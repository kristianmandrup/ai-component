const Base = require('./base');

class UnInstall extends Base {
  constructor(config) {
    super(config);
  }

  get message() {
    return 'installing typings...';
  }

  onItem(typing) {
    new InstallTypings(typing).uninstall(result => {
    })
  }
}

function uninstall(config) {
  new UnInstall(config).run();
}

module.exports = {
  uninstall: uninstall,
  UnInstall: UnInstall
}
