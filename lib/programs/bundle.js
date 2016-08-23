const component = require('../commands');
const program = require('commander');
const util = require('./util');

function bundle(names, mountPath) {
  names = util.normalize(names.split(','));
  return component.bundle(...names);
}

module.exports = bundle;

program
  // `install [app|skeleton|pwa] <names>` 
  .command('bundle <names>')
  .description('Bundle component(s)')
  .action(bundle)

