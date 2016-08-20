const { Registry, utils } = require('ai-core');
const { io, log, repo } = utils;
const { path } = io;

module.exports = class Downloader {
  constructor(paths) {
    this.registry = new Registry();
    this.paths = paths;
    this.destinationPath = paths.destinationPath;
    this.repository = paths.repository;
  }
  
  get name() {
    return this.paths.name;
  }

  download(done) {
    if (!this.repository.match(/\//)) {
      let gitAccount = this.registry.gitAccount;
      if (gitAccount) {
        console.log('using default git account:', gitAccount);
        this.repository = path.join(gitAccount, this.name);
        return this.download(done);
      } else {
        throw `Repo naming error ${this.repository}, must be one of the allowed forms, such as: <account>/<repo name>`;
      }
    }

    let componentEntry = this.registry.component(this.name);
    console.log('componentEntry', componentEntry, this.name, this.registry.components)
    if (componentEntry) {
      throw `Component ${this.name} already registered at: ${componentEntry.location}`;
    }

    // log.info('downloading git repo from', this.repository, 'to', this.destinationPath);
    repo(this.repository, this.destinationPath).clone((err, data) => {
      if (err) throw err;
      // this.registry.install(this.name, this.destinationPath);
      done(null, this.installationPath);
    });    
  }
}
