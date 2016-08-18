"use strict";

// const slug = require('slug');
const Templator = require('./templator');
const questions = require('./questions');

const { utils, Registry, Preferences} = require('ai-core');
const { log, io, slug, classify, ask, _ } = utils;
const { path, readJson } = io;

const inquirer = require('inquirer');

module.exports = class ComponentCreator {
  constructor(componentsPath) {
    this.registry = new Registry();
    this.componentsPath = componentsPath || this.registry.componentsPath;
  }

  at(mountPath) {
    this._mountPath = mountPath;
    return this;
  }

  get appPath() {
    return this.registry.appPath;
  }

  get mountPath() {
    return this._mountPath || this.componentsPath;
  }

  get fullMountPath() {
    return path.join(this.appPath, this.mountPath);
  }

  named(name) {
    this.name = slug(name);
    this.className = classify(this.name);
    this.destinationFolder = io.path.join(this.fullMountPath, this.name);
    return this;
  }

  create(name) {
    if (name) this.named(name);
    const vmName = this.name; // or index ?
 
    inquirer.prompt(questions).then(answers => {
      console.log('creating component:', vmName, 'at', this.destinationFolder);

      io.unlessPresent(this.destinationFolder, {test: io.isFolder }, (filePath) => {
        log.info('Creating folder', filePath);
        io.mkdirs(filePath);
      });
      new Templator(this.destinationFolder, answers).create(vmName);
    });
  }
}