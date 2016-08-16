/*
 * ai-component
 * https://github.com/kristianmandrup/ai-component
 *
 * Copyright (c) 2016, Kristian Mandrup
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai'),
    expect = chai.expect;

chai.should();

var ai-component = require('../lib/ai-component.js');

describe('ai-component module', function() {
    describe('#awesome()', function() {
        it('should return a hello', function() {
            expect(ai-component.awesome('livia')).to.equal('hello livia');
        });
    });
});
