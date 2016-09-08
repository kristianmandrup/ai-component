
'use strict';

require('../../../setup');

const { log } = require('../../../utils'); 

const ComponentConfig = require('../../../../lib/bundler/component-config');

const Install = require('../../../../lib/bundler/bundle/component/install').Install;
const configs = require('../../../configs');

const installConfig = configs.components.contact.config;

describe('bundle', () => {
  describe('Component - uninstall', () => {
    const componentConfig = new ComponentConfig(installConfig);
    const install = new Install(componentConfig);

    describe('constructor', () => {
      it('should set component', () => {
          expect(install.component).to.equal(componentConfig);
      });
    });
  });
});      