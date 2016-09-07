const { utils } = require('ai-core');
const { mutateJsonFile, path } = utils.io;

module.exports = class Base {
  constructor(config, filePath) {
    this.config = config;
    this.filePath = filePath;
    this.sourcePath = path.join(this.filePath, 'package.json');
    this.targetPath = './package.json';    
  }

  get message() {
    throw 'Not implemented';
  }

  get mutator() {
    return this.createMutator('dependencies');
  }

  run() {
    console.log(this.message);    
    mutateJsonFile(this.targetPath, this.sourcePath, this.mutator);
  }
}
