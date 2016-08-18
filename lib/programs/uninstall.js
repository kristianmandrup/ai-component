const component = require('../commands');
const program = require('commander');

function uninstall(mountPath, ...names) {
  return component.uninstall(mountPath, ...names);
}

module.exports = uninstall;

program
  // `uninstall [app|typings|lib|component|plugin|addon] <names>`
  .command('uninstall <names> [mountPath]')
  .description('Uninstall component')
  .action(uninstall)
