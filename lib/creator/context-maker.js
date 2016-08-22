const { utils, Registry, Preferences} = require('ai-core');
const { classify } = utils;
const util = require('util'); 

module.exports = class ContextMaker {
  constructor(name, ctx) {
    this.name = name;
    this.registry = new Registry();
    this.preferences = new Preferences();
    this.className = classify(name);
    this.setCtx(ctx);
  }

  validate(data) {
    if (data.className) return true;
  }

  get baseCtx() {
    return {
      name: this.name,
      className: this.className,
      repoName: this.name,
      account: this.registry.gitAccount,
      ext: this.preferences.jsFileExt || 'js'
    };
  }

  setCtx(ctx) {
    let keywords = ctx.keywords;
    keywords = keywords.match(/w+/) ? keywords.split(/,/) : [];
    keywords.unshift('aurelia-component');
    ctx.keywords = keywords;
    this.ctx = Object.assign({}, this.baseCtx, ctx);
  }
}  