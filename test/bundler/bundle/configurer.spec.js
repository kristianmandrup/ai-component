'use strict';

require('../../setup');

const { log } = require('../../utils'); 

const Configurer = require('../../../lib/bundler/bundle/configurer').clazz;
const configs = require('../../configs');
const name = 'contact'
const filePath = undefined
const installConfigPath = undefined
const config = configs.components.contact.config;

describe('bundle', () => {
  describe('Configurer', () => {
    describe('constructor', () => {
      const configurer = new Configurer(name);

      it('should set name', () => {
          expect(configurer.name).to.equal(name);
      });

      it('should set filePath', () => {
          expect(configurer.filePath).to.equal(filePath);
      });

      it('should set installConfigPath', () => {
          expect(configurer.installConfigPath).to.equal(installConfigPath);
      });

      it('should set config', () => {
          expect(configurer.config).to.equal(config);
      });
      
    });
  });
});