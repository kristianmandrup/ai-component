#!/usr/bin/env node

const program = require('commander');
 
program
  .version('0.0.1')

require('../lib/programs');

program.parse(process.argv);

