define(function(require, exports, module) {
  	console.log('load screenTool')
    var G = require('global');
    var Obj = require('class/Obj');

    var Bg = function(img) {
    	var me = this;

    	me.__proto__ = new Obj();

    	me.img = img;

    	me.draw = function() {
    		G.draw(function() {
    			G.ctx.drawImage(me.img , 0 ,0 , me.img.width , me.img.height , 0 , 0 ,640 ,960)
    		});
    	}

    	me.setImg = function(img) {
    		me.img = img;
    	}
    }

    module.exports = Bg;
})