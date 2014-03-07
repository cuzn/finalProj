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

      /**
       * 添加对象
       * @param  {Obj} obj   对象
       * @param  {int} layer 第几层,0层为最顶层，最后画
       * @return {null}       
       */
      me.addObj = function(layer , obj) {
        if(! me.objList[layer]) {
          console.log(obj , layer);
          me.objList[layer] = [];
        }

        me.objList[layer].push(obj);
      }

      /**
       * 在对象列表中删除一个对象
       * @param  {Obj} obj 要删除的对象
       * @return {Obj}     被删除的对象
       */
      me.delObj = function(obj) {
        for(var layer = 0 ; layer < me.objList.length ; layer++) {
          var layerObjList = me.objList[layer];
          for(var i = 0 ; i < layerObjList.length ; i++) {
            if(layerObjList[i] == obj) {
              //删除
              layerObjList.splice(i , 1);
              return obj;
            }
          }

          console.error('删除对象找不到:' , obj);
        }


      }

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
        var drawList = [];
   			for(var layer in me.objList) {
          for(var i in me.objList[layer]) {
            drawList.push(me.objList[layer][i]);
          }
   			}

        var tmp ;
        while(tmp = drawList.pop()) {
          tmp.draw();
          tmp.drawRange();
        }
        
        if(me.afterDraw) {
          me.afterDraw();
        }
   		}

      me.getObjByXY = function(x ,y) {
        var objList = [];
        for(var layer in me.objList) {
          for(var i in me.objList[layer]) {
            var obj = me.objList[layer][i];
            var on = obj.on && obj.on(x , y);
            if(on) {
              console.log('obj ：' + obj.desc + ' is on')
              objList.push(obj);
            }
          }
         
        }
        //return the top one;
        if(objList.length > 0) {
          return objList[0];
        }else {
          return false
        }
      }

      me.touchstart = function(e) {
        var touch = e.changedTouches[0];
        var realPos = G.tool.screen.getRealPos(touch.clientX,touch.clientY)
        console.log(realPos , touch.clientX,touch.clientY);
        var touchObj = me.getObjByXY(realPos.x,realPos.y);
        console.log(touchObj)
        touchObj && touchObj.touch(realPos.x,realPos.y);
      }

      me.touchend = function(e) {
        var touch = e.changedTouches[0];
        var realPos = G.tool.screen.getRealPos(touch.clientX,touch.clientY)
        var touchObj = me.getObjByXY(realPos.x,realPos.y);
        touchObj && touchObj.touchend(realPos.x,realPos.y);
      }


      //use for sence identify
      var identify = new Identify();
      me.addObj(0 , identify);

      me.setText = function(text) {
        identify.text = text;
      }
   	}


   	
   	
    module.exports = Sence
})