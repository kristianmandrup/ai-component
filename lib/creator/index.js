"use strict";

const Templator = require('./templator');

const { utils, Registry, Preferences} = require('ai-core');
const { log, io, ask, _ } = utils;
const { path, readJson } = io;

const Paths = require('./paths');

module.exports = class ComponentCreator {
  constructor(name, options = {}) {
    this.paths = new Paths(name, options.layout);
  }

  at(mountPath) {
    this.paths.mountPath = mountPath;
    return this;
  }

  get questionsPath() {
    return path.join(this.paths.layoutPath, './questions');
  }

  get questions() {
    require(this.questionsPath);
  }

  create(name) {
    if (name) this.named(name);
    const vmName = this.name; // or index ?

    if (io.hasFolder(this.destinationFolder)) {
      questions.push(askForAlternativeFolder(this.destinationFolder));
    }

    ask(questions).then(answers => {
      log.info('creating component:', vmName, 'at', this.destinationFolder);
      
      io.unlessPresent(this.destinationFolder, {test: io.isFolder }, (filePath) => {
        log.info('Creating folder', filePath);
        io.mkdirs(filePath);
      });
      if (this.validate()) {
        new Templator(this.name, this.destinationFolder, answers).create(vmName);
      }      
    });
  }

  validate() {
    if (this.destinationFolder.match(/\//)) return true;
    throw `Bad destinationFolder ${this.destinationFolder}`;    
  }
}