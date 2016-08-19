const { Registry, utils } = require('ai-core');
const { io, log, repo } = utils;
const { path } = io;

const hosts = {
  gitlab: 'gitlab.com',
  github: 'github.com'
}

function repoName(repoPath) {
  return /([^\\\/]+)$/.exec(repoPath)[1];
}


module.exports = class Downloader {
  constructor(repoPath, mountPath) {
    this.registry = new Registry();
    this.componentsPath = this.registry.componentsPath;
    this.named(repoPath);
    this.at(mountPath); 
  }
  
  // such as kristianmandrup/
  named(name) {
    const hostName = name.match(/:/) ? name.split(':')[0] : 'github';
  
    console.log('named', name, hostName);
    this.repository = this.repoUrl(name, hostName);
    this.name = repoName(name).replace('.git', '');
    return this;
  }

  repoUrl(repo, hostName) {
    const path = ['https:/', hosts[hostName], repo].join('/');
    return `${path}.git`;
  }

  at(mountPath) {
    this._mountPath = mountPath;
    return this; 
  }

  get mountPath() {
    return this._mountPath || this.componentsPath; 
  }

  get appPath() {
    return this.registry.appPath;
  }

  get destinationPath() {
    return path.join(this.appPath, this.mountPath, this.name);
  }

  download(done) {
    if (!this.repository.match(/\//)) {
      let gitAccount = this.registry.gitAccount;
      if (gitAccount) {
        console.log('using default git account:', gitAccount);
        this.repository = path.join(gitAccount, this.name);
        return this.install(done);
      } else {
        throw `Repo naming error ${this.repository}, must be one of the allowed forms, such as: <account>/<repo name>`;
      }
    }

    log.info('downloading git repo from', this.repository, 'to', this.destinationPath);
    repo(this.repository, this.destinationPath).clone((err, data) => {
      if (err) throw err;
      // this.registry.install(this.name, this.destinationPath);
      done();
    });    
  }
}
