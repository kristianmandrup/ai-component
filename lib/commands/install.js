const Installer = require('../installer').install;

module.exports = function create(mountPath, names) {
  const installer = new Installer().at(mountPath);

  for (let name of names) {
    installer.install(name);
  }  
}