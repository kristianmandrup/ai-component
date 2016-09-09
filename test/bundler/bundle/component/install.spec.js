
'use strict';

require('../../../setup');

const { log } = require('../../../utils'); 

const ComponentConfig = require('../../../../lib/bundler/component-config');

const Install = require('../../../../lib/bundler/bundle/component/install').Install;
const configs = require('../../../configs');

const installConfig = configs.components.contact.config;

describe('bundle', () => {
  describe('Component - install', () => {
    const componentConfig = new ComponentConfig(installConfig);
    const install = new Install(componentConfig);

    describe('#constructor', () => {
      it('should set component', () => {
          expect(install.component).to.equal(componentConfig);
      });
    });

    describe('#resolveLocal', () => {
      it('should resolve', () => {
          // expect(install.resolveLocal()).to.equal(true);
      });
    });      

    describe('#resolveRemote', () => {
      it('should not resolve', () => {
          // expect(install.resolveRemote()).to.equal(true);
      });
    });      

    describe('#resolve', () => {
      it('should resolve via local', () => {
          // expect(install.resolve()).to.equal(true);
      });
    });      
  });
});      