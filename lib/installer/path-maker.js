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

module.exports = class PathMaker {
  constructor(repoPath, mountPath) {
    this.registry = new Registry();
    this.componentsPath = this.registry.componentsPath;
    this.named(repoPath);
    this.at(mountPath);     
  }

  // such as kristianmandrup/
  named(name) {
    const hostName = name.match(/:/) ? name.split(':')[0] : 'github';
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
}

