const installer = require('../installer');

module.exports = function create(mountPath, name) {
  installer.install(name, mountPath);  
}