const UnBundler = require('../bundler').unbundle;

module.exports = function create(mountPath, names) {
  const unbundler = new UnBundler().at(mountPath);

  for (let name of names) {
    unbundler.unbundle(name);
  }  
}