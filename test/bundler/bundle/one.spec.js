'use strict';

require('../../setup');

const { log } = require('../../utils'); 

const One = require('../../../lib/bundler/bundle/one').clazz;
const name = 'contacts';

describe('bundle', () => {
  describe('One', () => {
    const one = new One(name);
    
    describe('constructor', () => {
      it('should set name', () => {
          expect(one.name).to.equal(name);
      });
    });

    // describe('bundle', () => {
    //   const bundled = one.bundle();

    //   it('should bundle component', () => {
    //       expect(bundled).to.be(true);
    //   });
    // });

    // describe('configure', () => {
    //   const configured = one.configure();

    //   it('should configure component', () => {
    //       expect(configured).to.be(true);
    //   });
    // });                
  });
});