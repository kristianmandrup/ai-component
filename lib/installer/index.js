const Install = require('./install');
const UnInstall = require('./uninstall');

module.exports = {
  install: function(target, mountPath) {
    new Install().named(target).at(mountPath).install(err => {
      if (err) throw err;
      console.log('install complete :)')
    });
  },
  uninstall: function(name) {
    new UnInstall().named(name).uninstall(err => {
      if (err) throw err;
      console.log('uninstall complete :)')
    });
  }
}