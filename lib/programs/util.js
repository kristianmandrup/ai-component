const _ = require('lodash');

exports.normalize = function(names) {
  names = names.split(',');
  names = names.map(name => _.trim(name));
  return _.flatten(names);
}