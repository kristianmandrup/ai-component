'use strict';

require('../../setup');

const { log } = require('../../utils'); 

const Configurer = require('../../../lib/bundler/bundle/configurer').clazz;
const configs = require('../../configs');
const name = 'contact';
const filePath = undefined;
const installConfigPath = undefined;
const config = configs.components.contact.config;

describe('bundle', () => {
  describe('Configurer', () => {
    const configurer = new Configurer(name);

    describe('constructor', () => {
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

    // describe('configure', () => {
    //   configurer.configure();

    //   it('should set component registry entry to be bundled', () => {
    //       expect(configurer.componentRegistry.isBundled(name)).to.be(true);
    //   });
    // });
    
  });
});