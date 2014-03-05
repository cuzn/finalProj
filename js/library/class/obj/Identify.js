define(function(require, exports, module) {
  	console.log('load sence class')
    var G = require('global')
    var Obj = require('class/Obj')

    var Identify = function() {
      var me = this;

      me.__proto__ = new Obj();

      me.text = 'Sence',
      me.draw = function() {
          G.ctx.save();
          G.ctx.fillStyle = 'white';
          G.ctx.font="9px Arial ";
          G.ctx.fillText(me.text,0,10);
          me.setRange(0 , 0  , G.ctx.measureText(me.text).width ,10);
          G.ctx.restore();
      }
      
   	}
   	
    module.exports = Identify
})