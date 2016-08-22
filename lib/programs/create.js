const component = require('../commands');
const program = require('commander');

function create(name, layout, mountPath) {
  return component.create(name, {layout: layout, mountPath: mountPath});
}

module.exports = create;

program
  // `create [app|layout|plugin|manifest] <name>`
  .command('create [name] [layout] [mountPath]')
  .description('Create component')
  .action(create);