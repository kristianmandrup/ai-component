const ComponentCreator = require('../creator');


module.exports = function create(name, {layout, mountPath}) {
  const creator = new ComponentCreator(name, {layout: layout, mountPath: mountPath});
  creator.create();  
}