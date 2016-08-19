const Downloader = require('./downloader');
const Configurer = require('./configurer');
const PathMaker = require('./path-maker');
const util = require('util');

module.exports = class InstallComponent {
  constructor(repoPath, mountPath) {
    this.paths = new PathMaker(repoPath, mountPath);    
    this.downloader = new Downloader(this.paths);
    this.configurer = new Configurer(this.paths);
  }

  install(destinationPath) {
    this.downloader.download((err, data) => {
      if (err) throw err;
      this.configurer.configure();
    })
  }
}