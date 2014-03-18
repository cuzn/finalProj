define(function(require, exports, module) {
  	console.log('load sence class')
    var G = require('global')
    var Obj = require('class/Obj')

    var Identify = function() {
      var me = this;

      me.__proto__ = new Obj();

      me.text = 'Sence',
      me.fps = 0;

      me.draw = function() {
          G.ctx.save();
          G.ctx.fillStyle = 'white';
          G.ctx.font="30px Arial ";
          G.ctx.fillText(me.text,0,30);

          var fpsText = 'fps:' + me.fps;
          G.ctx.fillText(fpsText ,640 - G.ctx.measureText(fpsText).width - 20 , 30)
          me.setRange(0 , 0  , G.ctx.measureText(me.text).width ,30);
          G.ctx.restore();
      }
      
   	}
   	
    module.exports = Identify
})