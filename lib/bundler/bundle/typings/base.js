const { Preferences } = require('ai-core');

module.exports = class Base {
  constructor(config) {
    this.config = config;
    this.preferences = new Preferences();
  }

  get typings() {
    return this.config.typings;
  }

  valid() {
    return this.preferences.useTypeScript && this.typings;
  }  

  run() {
    if (!this.valid()) return;
    console.log(this.message);
    for (let typing of this.typings) {
      this.onItem(typing);
    } 
  }
}
