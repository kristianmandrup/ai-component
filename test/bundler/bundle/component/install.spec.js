
'use strict';

require('../../../setup');

const { log } = require('../../../utils'); 

const ComponentConfig = require('../../../../lib/bundler/component');

const Install = require('../../../../lib/bundler/bundle/component/install').Install;
const configs = require('../../../configs');

const config = configs.components.contact.config;
const projectDeps = require('./helper');

describe('bundle', () => {
  describe('Component - uninstall', () => {
    const component = new ComponentConfig(name);
    const install = new Install(component);

    describe('constructor', () => {
      it('should set component', () => {
          expect(install.component).to.equal(component);
      });
    });
  });
});      