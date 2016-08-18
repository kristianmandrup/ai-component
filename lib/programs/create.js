const component = require('../commands');
const program = require('commander');

function create(name) {
  return component.create(name);
}

module.exports = create;

program
  // `create [app|layout|plugin|manifest] <name>`
  .command('create [name] [layout]')
  .description('Create component')
  .action(create);