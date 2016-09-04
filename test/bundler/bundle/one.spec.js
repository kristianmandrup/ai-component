'use strict';

var chai = require('chai'),
    expect = chai.expect;

chai.should();

const One = require('../../../lib/bundler/bundle/one.js');
const name = 'contacts';

describe('bundle', () => {
  describe('One', () => {
      describe('#create()', () => {
          const one = new One(name);

          it('should return a hello', () => {
              expect(one.name).to.equal(name);
          });
      });
  });
});