require('../setup');

const InstallConfig = require('../../lib/bundler/install-config.js');

describe('bundler', () => {
  describe('InstallConfig', () => {
      describe('unknown component', () => {
          const name = 'contacts'
          const installConfig = new InstallConfig(name);          

          describe('constructor', () => {

            it('should set name', () => {
                expect(installConfig.name).to.equal(name);
            });

            it('should not find srcPath', () => {
                expect(installConfig.srcPath).to.equal(undefined);
            });          

            it('should not find installPath', () => {
                expect(installConfig.installPath).to.equal(undefined);
            });
          })          

          describe('#validateRegistration', () => {
            it('should throw', () => {
                expect(installConfig.validateRegistration).to.throw();
            });
          });          
                    
          describe('#object', () => {                    
            it('validate should throw', () => {
                expect(installConfig.object).withParams(true).to.throw(Error);
            });          

            it('should throw since missing install path', () => {
                expect(installConfig.object).to.throw(Error);
            });          
          });                    
      });
  });
});
