define(function(require, exports, module) {
  	console.log('LoadSence ')
    var Sence = require('class/Sence');
    var G = require('global');

    var GameSence = function() {
    	var me = this;
    	me.__proto__ = new Sence();

    	me.objList['text'].text =  'welcome GameSence';



    }
	
	
    module.exports = GameSence
})