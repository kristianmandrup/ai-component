const programs = [ 
  'bundle', 
  'unbundle',
  'create',  
  'install', 
  'uninstall'
];

// export all program functions to aurelia-installer ;)
module.exports = programs.reduce((progs, modName) => {
  progs[modName] = require(`./${modName}`);
  return progs;
}, {});
