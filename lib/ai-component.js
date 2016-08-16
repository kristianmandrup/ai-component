const Commander = require('./commander');

module.exports = function(...names) {
  return new Commander(...names);
}


