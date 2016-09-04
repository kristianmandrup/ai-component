'use strict';

var chai = require('chai'),
    expect = chai.expect;

chai.should();

require('../../project-files');

const One = require('../../../lib/bundler/bundle/one.js');
const name = 'contacts';

Registry = class {
}

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