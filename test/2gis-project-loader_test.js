/*
 * 2gis-project-loader
 * https://github.com/wenqer/2gis-project-loader
 *
 * Copyright (c) 2013 Iaroslav Voloshchuk
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var 2gis-project-loader = require('../lib/2gis-project-loader.js');

describe('2gis-project-loader module', function(){
  describe('#awesome()', function(){
    it('should return a hello', function(){
      2gis-project-loader.awesome('livia').should.equal("hello livia");
    });
  });
});
