define(function(require, exports, module) {
  	console.log('load conf')
    var conf = {};

    conf.img = require('conf/img')
    conf.objDrawRange = true;

    module.exports = conf;

})