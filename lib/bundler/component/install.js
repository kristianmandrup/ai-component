module.exports = class InstallComponent {
  constructor(component) {
    this.component = component; 
  }

  resolve() {
    return this.resolveLocal() || this.resolveRemote() || this.resolveError();  
  }

  resolveLocal() {
    return this.component.filePath ? this.configure() : null; 
  } 

  resolveRemote() {
    return this.component.remoteURL ? this.install() : null;
  }

  install() {
    return new Install(this.component);
  } 

  configure() {
    return new Configure(this.component);
  }
}

