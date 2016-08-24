const bundler = require('../bundler');

module.exports = function bundle(...names) {
  console.log('bundle:', names)
  for (let name of names)
    bundler.bundle(name); 
}