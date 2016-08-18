const UnInstaller = require('../installer').uninstall;

module.exports = function create(mountPath, names) {
  const uninstaller = new UnInstaller().at(mountPath);

  for (let name of names) {
    uninstaller.install(name);
  }  
}