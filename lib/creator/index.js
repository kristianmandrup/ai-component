"use strict";

const Templator = require('./templator');

const { utils, Registry, Preferences} = require('ai-core');
const { log, io, ask, _ } = utils;
const { path, readJson } = io;

const Paths = require('./paths');
const askForAlternativeFolder = require('./questions').askForAlternativeFolder;

module.exports = class ComponentCreator {
  constructor(name, options = {}) {
    console.log('Creator', name, options)
    this.paths = new Paths(name, options.layout);
  }

  at(mountPath) {
    this.paths.mountPath = mountPath;
    return this;
  }

  get questionsPath() {
    return path.join(this.paths.relativeLayoutPath, './questions');
  }

  get questions() {
    return this._qs = this.qs || require('./' + this.questionsPath);
  }

  get name() {
    return this.paths.name;
  }

  get destinationFolder() {
    return this.paths.destinationFolder;
  }

  create() {
    const vmName = this.name; // or index ?
    this.questions;
    io.hasFolder(this.destinationFolder, res => {
      this._qs.unshift(askForAlternativeFolder(this.destinationFolder));
    });
    this.userInput();
  }

  userInput() {
    console.log('user input')
    
    ask(this.questions).then(answers => {
      log.info('creating component:', vmName, 'at', this.destinationFolder);
      
      io.unlessPresent(this.destinationFolder, {test: io.isFolder }, (filePath) => {
        log.info('Creating folder', filePath);
        io.mkdirs(filePath);
      });

      if (this.validate()) {
        console.log('validated destination', this.destinationFolder);        
        const templator = new Templator(this.name, this.destinationFolder, answers)
        console.log('run Templator');
        templator.create();
      }
    });
  }

  validate() {
    if (this.destinationFolder.match(/\//)) return true;
    throw `Bad destinationFolder ${this.destinationFolder}`;    
  }
}