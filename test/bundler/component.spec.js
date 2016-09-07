'use strict';

require('../setup');

const Component = require('../../lib/bundler/component.js');

describe('bundler', () => {
  describe('Component', () => {
      describe('constructor', () => {
          const config = {}
          const component = new Component(config);

          it('should set config', () => {
              expect(component.config).to.equal(config);
          });
      });
  });
});