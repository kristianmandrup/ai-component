const ComponentCreator = require('../creator');
const creator = new ComponentCreator();

module.exports = function create(name, layout, mountPath) {
  creator.create(name, {layout: layout, mountPath: mountPath});  
}