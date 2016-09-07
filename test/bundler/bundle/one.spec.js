'use strict';

var chai = require('chai'),
    expect = chai.expect;

chai.should();

require('../../project-files');

const One = require('../../../lib/bundler/bundle/one.js');
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