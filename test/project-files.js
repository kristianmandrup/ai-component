const mock = require('mock-fs');
const configs = require('./configs');

const mockedFiles = {
  './installer.json': JSON.stringify(configs.project),
  './package.json': JSON.stringify(configs.package),
  './aurelia_project/aurelia.json': JSON.stringify(configs.aurelia),
  'src/components/contact/install.json': JSON.stringify(configs.components.contact.config), 
  'src/components/contact/package.json': JSON.stringify(configs.components.contact.package)
}

function mockFiles() {
  mock(mockedFiles);
}

global.mockFiles = mockFiles;
global.mockedFiles = mockedFiles;

console.log('mocking files...');
mockFiles();
