const questions = require('./questions');

module.exports = class ConflictResolver {
  constructor(paths) {
    this.paths = paths;
  }

  get name() {
    return this.paths.name;
  }

  get componentEntry() {
    return this.registry.component(this.name);
  }

  renameDestination(done) {
    log.info(`Component folder ${this.name} already exists at ${this.paths.fullMountPath}. Please rename.`)
    ask([questions.nameFolder]).then(answers => {
      this.paths.folderName = answers.folderName;
      if (!this.pathConflict()) {
        done();
      }
    })
  }

  renameEntry(done) {
    log.info(`Component named ${this.name} already registered. Please rename.`)
    ask([questions.nameEntry]).then(answers => {
      this.paths.entryName = answers.entryName;
      if (!this.pathConflict()) {
        done();
      }
    })
  }

  entryConflict() {
    return this.componentEntry();
  }

  pathConflict() {
    io.unlessFolderPresent(this.destinationPath, this.renameDestination())
  }
}



