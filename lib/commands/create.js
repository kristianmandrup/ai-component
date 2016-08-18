const ComponentCreator = require('../creator');
const creator = new ComponentCreator();

module.exports = function create(names) {
  for (let name of names) {
    creator.create(name);
  }  
}