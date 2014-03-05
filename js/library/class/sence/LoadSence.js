define(function(require, exports, module) {
  	console.log('LoadSence ')
    var Sence = require('class/Sence');
    var G = require('global');
    var GameSence = require('class/sence/GameSence');

    var LoadSence = function() {
    	var me = this;
    	me.__proto__ = new Sence();


    	//just for indentify
    	me.objList['text'].text = 'welcome LoadSence';

    	me.setAfterDraw(function() {
    		if (me.status == 'load done') {
    			G.sence = new GameSence;
    		};
    	});
    }
	
	
    module.exports = LoadSence
})