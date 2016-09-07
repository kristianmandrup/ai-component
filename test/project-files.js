const mock = require('mock-fs');
const configs = require('./configs');

const mockedFiles = {
  './installer.json': JSON.stringify(configs.project),
  './aurelia_project/aurelia.json': JSON.stringify(configs.aurelia),
  './src/component/contact/install.json': JSON.stringify(configs.components.contact) 
}

function mockFiles() {
  mock(mockedFiles);
}

global.mockFiles = mockFiles;
global.mockedFiles = mockedFiles;

console.log('mocking files...');
mockFiles();
