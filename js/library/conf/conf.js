define(function(require, exports, module) {
  	console.log('load conf')
    var conf = {
    	objDrawRange : false , //是否画出边界，用于调试
    };

    conf.img = require('conf/img')
    conf.card = require('conf/card')
    conf.server = require('conf/server')
    conf.sound = require('conf/sound')

    module.exports = conf;

})