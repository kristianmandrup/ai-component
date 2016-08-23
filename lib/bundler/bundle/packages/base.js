const { utils } = require('ai-core');
const { mutateJsonFile } = utils.io;

module.exports = class Base {
  constructor(filePath, config) {
    this.config = config;
    this.sourcePath = path.join(this.filePath, 'package.json');
    this.targetPath = './package.json';    
  }

  get message() {
    throw 'Not implemented';
  }

  get mutator() {
    return this.createMutator('dependencies');
  }

  install() {
    console.log(this.message);    
    mutateJsonFile(this.targetPath, this.sourcePath, this.mutator);
  }
}
