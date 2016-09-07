const unbundle = require('../bundler').unbundle;

module.exports = function(names) {
  const unbundler = unbundle.instance();

  for (let name of names) {
    unbundler.unbundle(name);
  }  
}