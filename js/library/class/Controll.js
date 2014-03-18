/**
 *  控制对战双方的状态
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    var G = require('global');

    var Controll = function(user1 , user2) {
    	var me = this;

    	me.user = {user1 : user1 , user2 : user2};

    	


    }

    module.exports = Controll;
})