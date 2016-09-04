const bundler = require('../bundler');

module.exports = function bundle(...names) {
  // console.log('bundle:', names)
  bundler.bundle(...names); 
}