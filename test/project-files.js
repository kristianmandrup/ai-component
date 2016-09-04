const mock = require('mock-fs');
const configs = require('./configs');

mock({
  './': {
    'installer.json': configs.project,
    'src/component/contact': {
      'install.json': configs.components.contact 
    }
  }
});