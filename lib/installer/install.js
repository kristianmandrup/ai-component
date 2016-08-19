const Downloader = require('./downloader');
const Configurer = require('./configurer');

module.exports = class InstallComponent {
  constructor(repoPath, mountPath) {    
    this.downloader = new Downloader(repoPath, mountPath);
    this.configurer = new Configurer();
  }

  install(done) {
    this.downloader.download((err, res) => {
      this.configurer.configure(this.name);
    })
  }
}