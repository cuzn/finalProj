/**
 * 场景类，需要被继承，子类在 class/sence下
 */
define(function(require, exports, module) {
  	console.log('load sence class')
    var G = require('global');
    var Identify = require('class/obj/Identify');
    
   	var Sence = function() {
      var me = this;
   		me.objList = {};
      me.status = null;

      me.setAfterDraw = function(func) {
        me.afterDraw = func;
      }

      me.setBefoeDraw = function(func) {
        me.beforeDraw = func;
      }

   		me.draw = function() {
        if(me.beforeDraw) {
          me.beforeDraw();
        }
   			for(var atr in me.objList) {
          me.objList[atr].draw();
          me.objList[atr].drawRange();
   			}

        if(me.afterDraw) {
          me.afterDraw();
        }
   		}

      me.getObjByXY = function(x ,y) {
        var objList = [];
        for(var atr in me.objList) {
          var on = me.objList[atr].on && me.objList[atr].on(x , y);
          if(on) {
            console.log('obj ' + atr + ' is on')
            objList.push(me.objList[atr]);
          }
        }
        //return the top one;
        return objList.pop();
      }

      me.touchstart = function(e) {
        var touch = e.changedTouches[0];
        var touchObj = me.getObjByXY(touch.clientX,touch.clientY);
        touchObj && touchObj.touch(touch.clientX,touch.clientY);
      }

      me.touchend = function(e) {
        var touch = e.changedTouches[0];
        var touchObj = me.getObjByXY(touch.clientX,touch.clientY);
        touchObj && touchObj.touchend(touch.clientX,touch.clientY);
      }
      //use for sence identify
      me.objList['text'] = new Identify();

      me.setText = function(text) {
        me.objList['text'].text = text;
      }
   	}


   	
   	
    module.exports = Sence
})