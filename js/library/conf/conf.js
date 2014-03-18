define(function(require, exports, module) {
  	console.log('load conf')
    var conf = {
    	objDrawRange : true , //是否画出边界，用于调试
    };

    conf.img = require('conf/img')
    conf.card = require('conf/card')
    conf.server = require('conf/server')

    module.exports = conf;

})