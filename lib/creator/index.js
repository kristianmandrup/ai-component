"use strict";

// const slug = require('slug');
const Templator = require('./templator');
const questions = require('./questions');

const { utils, Registry, Preferences} = require('ai-core');
const { log, io, ask, _ } = utils;
const { path, readJson } = io;

const inquirer = require('inquirer');
const Paths = require('./paths');

module.exports = class ComponentCreator {
  constructor(componentsPath) {
    this.paths = new Paths();
  }

  at(mountPath) {
    this.paths.mountPath = mountPath;
    return this;
  }

  create(name) {
    if (name) this.named(name);
    const vmName = this.name; // or index ?
 
    inquirer.prompt(questions).then(answers => {
      log.info('creating component:', vmName, 'at', this.destinationFolder);

      io.unlessPresent(this.destinationFolder, {test: io.isFolder }, (filePath) => {
        log.info('Creating folder', filePath);
        io.mkdirs(filePath);
      });

      if (!this.destinationFolder.match(/\//)) {
        throw `Bad destinationFolder ${this.destinationFolder}`;
      }
      new Templator(this.name, this.destinationFolder, answers).create(vmName);
    });
  }
}