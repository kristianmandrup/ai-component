/*
 * ai-component
 * https://github.com/kristianmandrup/ai-component
 *
 * Copyright (c) 2016, Kristian Mandrup
 * Licensed under the MIT license.
 */
require('./setup');
const { Registry } = require('ai-core');

const aic = require('../lib/index.js');

describe('ai-component', () => {
  describe('dummy registry', () => {
    it('should have a dummy test registry', () => {
        expect(new Registry().config.name).to.equal('my-dummy-project');
    })        
  })
});
