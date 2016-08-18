const Bundler = require('../bundler').bundle;

module.exports = function create(mountPath, names) {
  const bundler = new Bundler().at(mountPath);

  for (let name of names) {
    bundler.bundle(name);
  }  
}