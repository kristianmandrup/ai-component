
'use strict';

require('../../../setup');

const { log } = require('../../../utils'); 

const ComponentConfig = require('../../../../lib/bundler/component-config');

const children = require('../../../../lib/bundler/bundle/component/children');
const configs = require('../../../configs');

const installConfig = configs.components.contact.config;

console.log('children', children);

describe('bundle', () => {
  describe('Component - children', () => {
    const componentConfig = new ComponentConfig(installConfig);
    
    describe('install', () => {
      const install = children.install(componentConfig);
      console.log('install', install, componentConfig);


      it('should set config', () => {
          expect(install.config).to.equal(componentConfig);
      });  

      describe('onItem(componentConfig)', () => {
        it('should install single component', () => {
            expect(install.onItem(componentConfig)).to.equal(true);
        });  
      });               
      
      describe('run', () => {
        it('should install all components of config', () => {
            expect(install.run()).to.equal(true);
        });  
      });               
    });    

    describe('uninstall', () => {
      const uninstall = children.uninstall(componentConfig);

      it('should set config', () => {
          expect(uninstall.config).to.equal(componentConfig);
      });

      describe('onItem(componentConfig)', () => {
        it('should uninstall single component', () => {
            expect(uninstall.onItem(componentConfig)).to.equal(true);
        });  
      });               

      describe('run', () => {
        it('should uninstall component', () => {
            expect(uninstall.run()).to.equal(true);
        });  
      });            
    });    
  });
});