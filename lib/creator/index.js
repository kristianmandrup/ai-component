"use strict";

const Templator = require('./templator');

const { utils, Registry, Preferences} = require('ai-core');
const { log, io, ask, _ } = utils;
const { path, readJson } = io;

const Paths = require('./paths');
const askForAlternativeFolder = require('./questions').askForAlternativeFolder;

module.exports = class ComponentCreator {
  constructor(name, {layout, mountPath}) {
    this.paths = new Paths(name, layout);
  }

  at(mountPath) {
    this.paths.mountPath = mountPath;
    return this;
  }

  get questionsPath() {
    return this.paths.relativeLayoutPath + '/questions';
  }

  get questions() {
    return this._qs = this.qs || require(this.questionsPath);
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
    ask(this.questions).then(answers => {      
      if (answers.folderName)
        this.paths.destinationFolder = answers.folderName;

      log.info('creating component:', this.name, 'at', this.destinationFolder);

      if (!io.hasFolder(this.destinationFolder)) {
        log.info('Creating folder:', this.destinationFolder);
        io.mkdirs(this.destinationFolder);
      };

      if (this.validate()) {
        console.log('templator', this.paths)        
        const templator = new Templator(this.paths, answers)
        console.log('go')
        templator.create();
      } 
    });
  }

  validate() {
    if (this.destinationFolder.match(/\//)) return true;
    throw `Bad destinationFolder ${this.destinationFolder}`;    
  }
}