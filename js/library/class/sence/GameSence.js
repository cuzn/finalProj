define(function(require, exports, module) {
  	console.log('LoadSence ')
    var Sence = require('class/Sence');
    var G = require('global');
    var Bg = require('class/obj/Bg')


    var GameSence = function() {
    	var me = this;
    	me.__proto__ = new Sence();

    	me.setText('welcome GameSence');

        
        var bgImg = G.tool.img.get('gameSence.jpg')
        me.addObj( 4 , new Bg(bgImg) );
        
    }
	
	
    module.exports = GameSence
})