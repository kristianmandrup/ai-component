
'use strict';

require('../../../setup');

const { log } = require('../../../utils'); 

const ComponentConfig = require('../../../../lib/bundler/component');

const UnInstall = require('../../../../lib/bundler/bundle/component/uninstall').UnInstall;
const configs = require('../../../configs');

const config = configs.components.contact.config;
const projectDeps = require('./helper');

describe('bundle', () => {
  describe('Component - uninstall', () => {
    const component = new ComponentConfig(name);
    const uninstall = new UnInstall(component);

    describe('constructor', () => {
      it('should set component', () => {
          expect(uninstall.component).to.equal(component);
      });
    });
  });
});      