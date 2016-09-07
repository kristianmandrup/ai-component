'use strict';

require('../../setup');

const { log } = require('../../utils'); 

const One = require('../../../lib/bundler/bundle/one').clazz;
const name = 'contacts';

describe('bundle', () => {
  describe('One', () => {
      describe('constructor', () => {
          const one = new One(name);

          it('should set name', () => {
              expect(one.name).to.equal(name);
          });
      });
  });
});