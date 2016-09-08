
'use strict';

require('../../../setup');

const { log } = require('../../../utils'); 

const ComponentConfig = require('../../../../lib/bundler/component-config');

const UnInstall = require('../../../../lib/bundler/bundle/component/uninstall').UnInstall;
const configs = require('../../../configs');

const installConfig = configs.components.contact.config;

describe('bundle', () => {
  describe('Component - uninstall', () => {
    const componentConfig = new ComponentConfig(installConfig);
    const uninstall = new UnInstall(componentConfig);

    describe('constructor', () => {
      it('should set component', () => {
          expect(uninstall.component).to.equal(componentConfig);
      });
    });
  });
});      