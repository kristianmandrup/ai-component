'use strict';

require('../../../setup');

const { log } = require('../../../utils'); 

const Install = require('../../../../lib/bundler/bundle/packages/install').Install;
const configs = require('../../../configs');

const config = configs.components.contact.config;
const filePath = './src/components/contact'
const srcPath = 'src/components/contact/package.json'
const targetPath = './package.json';

const projectDeps = require('./helper');

describe('bundle', () => {
  describe('Configurer', () => {
    const install = new Install(config, filePath);

    describe('constructor', () => {
      it('should set config', () => {
          expect(install.config).to.equal(config);
      });

      it('should set filePath', () => {
          expect(install.filePath).to.equal(filePath);
      });

      it('should set sourcePath', () => {
          expect(install.sourcePath).to.equal(srcPath);
      });

      it('should set targetPath', () => {
          expect(install.targetPath).to.equal(targetPath);
      });
    });   

    describe('install', () => {
        const installed = install.run();
        const deps = projectDeps();

        // console.log('updated project package', mockedPack);
        // log(project.package);

        it('should merge component package dependencies with project dependencies', () => {
            expect(deps.bootstrap).to.equal("^3.3.7");
        });    
    });
  });
});  
