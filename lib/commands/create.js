const ComponentCreator = require('../creator');
const creator = new ComponentCreator();

module.exports = function create(name) {
  creator.create(name);  
}