const { utils, Registry, Preferences} = require('ai-core');
const { log, io, slug, ask, _ } = utils;
const { path, readJson } = io;

module.exports = class Paths {
  constructor(name, layout = 'simple', mountPath) {
    this.layout = layout;    
    this.registry = new Registry(); // TODO: should be instance
    this.appPath = this.registry.appPath || './src';
    this.componentsPath = this.registry.componentsPath || path.join(this.appPath, 'components');
    this.mountPath = mountPath || this.componentsPath;
    this.named(name);
    this.baseTemplatesPath = __dirname;
    this.custom = false;
    this.setBasePath();
  }

  setBasePath() {
    let customPath, customComponentPath;
    if (process.env.AI_HOME) {
      customComponentPath = path.join(process.env.AI_HOME, 'component');
      customPath = path.join(customComponentPath, 'templates', this.layout); 
    }
    if (!io.hasFolder(customPath)) {
      console.log('missing custom template folder:', customPath);
    } else {
      this.custom = true;
      this.baseTemplatesPath = customComponentPath;
    }
  }

  get layoutPath() {
    let providedLayoutPath = path.join(this.baseTemplatesPath, 'templates', this.layout);
    if (!io.hasFolder(providedLayoutPath)) {
      throw `missing provided template folder: ${providedLayoutPath}`;
    }

    return providedLayoutPath;
  }

  get relativeLayoutPath() {
    this.layoutPath;
    return path.join(this.baseTemplatesPath, 'templates', this.layout);
  }

  get fullMountPath() {
    return path.join(this.appPath, this.mountPath);
  }

  set destinationFolder(folder) {
    this._destinationFolder = io.path.join(this.fullMountPath, folder);
  } 
    
  get destinationFolder() {
    return this._destinationFolder;
  }    

  named(name) {
    this.name = slug(name);
    this.destinationFolder = this.name;
    return this;
  }
}