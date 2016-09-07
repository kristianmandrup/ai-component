const {inspect} = require('util');

module.exports = {
  log: function(obj) {
    console.log('inspect:', inspect(obj));
  }
}