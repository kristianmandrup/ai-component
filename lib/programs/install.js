const component = require('../commands');
const program = require('commander');
const util = require('./util');

function install(names, mountPath) {
  names = util.normalize(names.split(','));
  return component.install(mountPath, ...names);
}

module.exports = install;

program
  // `install [app|skeleton|pwa] <names>` 
  .command('install <names> [mountPath]')
  .description('Install component')
  .action(install)

