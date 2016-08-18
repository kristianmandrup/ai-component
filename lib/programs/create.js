const component = require('../commands');
const program = require('commander');

function create(names) {
  return component.create(names);
}

module.exports = create;

program
  // `create [app|layout|plugin|manifest] <name>`
  .command('create [name] [layout]')
  .description('Create component')
  .action(create);