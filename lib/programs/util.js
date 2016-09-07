const _ = require('lodash');

exports.normalize = function(names) {
  names = typeof names === 'string' ? names.split(',') : names; 
  names = names.map(name => _.trim(name));
  return _.flatten(names);
}