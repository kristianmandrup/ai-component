'use strict';

require('../setup');

const { log } = require('../utils'); 

const Component = require('../../lib/bundler/component.js');
const configs = require('../configs');
const vendorLibs = require('ai-lib').registries.vendor;

describe('bundler', () => {
  describe('Component', () => {
    const installConfig = configs.components.contact.config;
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

    describe('#expandedBundleDeps', () => {
      const deps = component.expandedBundleDeps;
      it('should return expanded bundle dependencies (from vendor libs) for bundles entry in install.json config', () => {
        expect(deps[0]).to.equal('jquery');
        expect(deps[1].name).to.equal('bootstrap');
      });
    });      

    describe('#expandedDependencies', () => {
      const deps = component.expandedDependencies;
      log(component.expandedDependencies);

      it('should return expanded bundle dependencies combined with dependencies list from install.json config', () => {
        expect(deps.length).to.equal(4);
        expect(deps[0].name).to.equal('nprogress');
        expect(deps[1].name).to.equal('bootstrap');
        expect(deps[2]).to.equal('jquery');
        expect(deps[3].name).to.equal('bootstrap');
      });
    });      

    describe('#uniqueDependencies', () => {
      const deps = component.uniqueDependencies;
      log(deps);

      it('should return combined dependencies without duplicate bootstrap', () => {
        expect(deps.length).to.equal(3);
        expect(deps[0].name).to.equal('nprogress');
        expect(deps[1].name).to.equal('bootstrap');
        expect(deps[2]).to.equal('jquery');        
      });
    });          
  });
});