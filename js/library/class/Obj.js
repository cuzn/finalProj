/**
 * 对象基类，需要被继承，子类在class/obj下
 * @param  {[type]} require [description]
 * @param  {[type]} exports [description]
 * @param  {[type]} module  [description]
 * @return {[type]}         [description]
 */
define(function(require, exports, module) {
  	console.log('load sence class')
    var G = require('global')
    var conf = require('conf/conf')

    var Obj = function() {
      var me = this;

      me.x = 0;
      me.y = 0;
      me.width = 0;
      me.height = 0;

      me.setRange = function(x , y , width , height) {
        me.x = x;
        me.y = y;
        me.width = width;
        me.height = height;
      }

      me.on = function(x , y) {
        if(me.width && me.height && me.x <= x && me.x + me.width >= x
          && me.y <= y && me.y + me.height >= y
          ){
          return true;
        }else {
          return false;
        }
      }

      me.drawRange = function() {
        if(!conf.objDrawRange) {
          return
        }
        G.ctx.save();
        G.ctx.strokeStyle  = '#c0ff00';
        G.ctx.lineWidth = 1;
        G.ctx.strokeRect(me.x , me.y , me.width , me.height);
        G.ctx.restore();
      }
      me.touch = function(x , y) {
        console.log('obj touched')
      }

       me.touchend = function(x , y) {
        console.log('obj touchend')
      }
    }
   	
   	
    module.exports = Obj
})