'use strict';

require('../../../setup');

const { log } = require('../../../utils'); 

const Install = require('../../../../lib/bundler/bundle/packages/install').Install;
const UnInstall = require('../../../../lib/bundler/bundle/packages/uninstall').UnInstall;
const configs = require('../../../configs');

const config = configs.components.contact.config;
const filePath = './src/components/contact'
const srcPath = 'src/components/contact/package.json'
const targetPath = './package.json';
const projectDeps = require('./helper');

describe('bundle', () => {
  beforeEach(() => {
    new Install(config, filePath).run();
  })

  describe('packages - uninstall', () => {
    const uninstall = new UnInstall(config, filePath);

    describe('constructor', () => {
      it('should set config', () => {
          expect(uninstall.config).to.equal(config);
      });

      it('should set filePath', () => {
          expect(uninstall.filePath).to.equal(filePath);
      });
    });   

    describe('uninstall', () => {
        let deps = projectDeps();
        // console.log('updated project package', mockedPack);
        // log(project.package);

        it('should remove have added component dependencies to project', () => {
          expect(deps.bootstrap).to.eql("^3.3.7");
        })

        it('should remove all component dependencies from project dependencies', () => {
            const installed = uninstall.run();
            deps = projectDeps();
            log(deps);
            
            expect(deps.bootstrap).to.equal(undefined);
            expect(deps.jquery).to.equal(undefined);
        });    
    });
  });
});  
