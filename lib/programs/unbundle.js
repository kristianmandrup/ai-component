const component = require('../commands');
const program = require('commander');
const util = require('./util');

function unbundle(names, mountPath) {
  names = util.normalize(names.split(','));
  return component.unbundle(...names);
}

module.exports = unbundle;

program
  // `install [app|skeleton|pwa] <names>` 
  .command('unbundle <names>')
  .description('Unbundle component(s)')
  .action(unbundle)

