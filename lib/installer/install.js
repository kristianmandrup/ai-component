const Download = require('./download');
const Configurer = require('./configurer');

module.exports = class InstallComponent {
  constructor() {
    this.download = new Download();
    this.configurer = new Configurer();
  }

  install(done) {
    this.download((err, res) => {
      if (this.autoBundle)
        this.configurer.configure(this.name);
    })
  }
}