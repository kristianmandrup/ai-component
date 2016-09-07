'use strict';

require('../setup');

const Component = require('../../lib/bundler/component.js');
const configs = require('../configs');
const vendorLibs = require('ai-lib').registries.vendor;

describe('bundler', () => {
  describe('Component', () => {
    const installConfig = configs.components.contact;
    const component = new Component(installConfig);

    describe('constructor', () => {
      it('should set config', () => {
          expect(component.config).to.equal(installConfig);
      });

      it('should set dependencies', () => {
          expect(component.dependencies).to.eql(installConfig.dependencies || []);
      });

      it('should set bundles', () => {
          expect(component.bundles).to.eql(installConfig.bundles || []);
      });

      it('should set prepend', () => {
          expect(component.prepend).to.eql(installConfig.prepend || []);
      });
    });

    describe('#vendorLibs', () => {
      it('should get registered vendor libs from registry', () => {
          expect(component.vendorLibs).to.equal(vendorLibs);
      });
    });      
  });
});