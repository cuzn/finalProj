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
        console.log('del',obj)

        for(var layer in me.objList) {
          var layerObjList = me.objList[layer];

          for(var i in me.objList[layer]) {
            if(layerObjList[i] == obj) {
              //删除
              layerObjList.splice(i , 1);
              return obj;
            }
          }
        }
          console.error('删除对象找不到:' , obj);
      }

      me.setAfterDraw = function(func) {
        me.afterDraw = func;
      }

      me.setBefoeDraw = function(func) {
        me.beforeDraw = func;
      }

      me.lastTime = new Date().getTime();
      me.fps = 0;

   		me.draw = function() {
        var nowTime =  new Date().getTime();
        if(nowTime - me.lastTime > 1000) {
          me.lastTime = nowTime;
          me.setFps(me.fps)
          me.fps =0
        } else {
          me.fps ++;
        }

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

      //执行队列
      me.runQueueList = [];
      me.bindRunQueue = function(queue) {
        me.runQueueList.push(queue);
      }

      /**
       * 执行计算，动画，信息交流等各种队列，主要用于非触发形式的事件队列
       * @return {null} 
       */
      me.run = function() {
        var notFinishQueue = []; //未完成的队列
        var finishQueue = []; //完成的队列

        //每个队列分别进行执行
        var queue;
        while(queue = me.runQueueList.pop()) {
          queue.run(); //队列跑

          if(queue.isDone()) {
            finishQueue.push(queue);
          }else {
            notFinishQueue.push(queue)
          }
        }
         me.runQueueList = notFinishQueue;
         if(finishQueue.length > 0) 
          console.log('finishQueue' , finishQueue);
      }

      me.getObjByXY = function(x ,y , desc , func) {
        var objList = [];
        for(var layer in me.objList) {
          for(var i in me.objList[layer]) {
            var obj = me.objList[layer][i];
            var on = obj.on && obj.on(x , y);
            if(on) {
              if(desc){
                if(obj.desc == desc){
                  objList.push(obj);
                  if(func){
                    //可能出现两个的情况，暂时先不管
                    func(obj)
                  }
                }
              }else {
                objList.push(obj);
              }
            }
          }
        }
        if(objList.length > 0) {
          return objList;
        }else {
          return false
        }
      }

      me.bindTouchmove = null; //绑定事件，不管点到什么对象，都将触摸式事件用这个函数处理；
      me.bindTouch = null;
      me.bindTouchend = null;

      me.setBindTouchmove = function(func) {
        if(me.bindTouchmove && func) {
          console.error('重复的bindTouchmove');
        }
        me.bindTouchmove = func;
      }
      me.setBindTouch = function(func) {
        if(me.bindTouch && func) {
          console.error('重复的bindTouch');
        }
        me.bindTouch = func;
      }
      me.setBindTouchend = function(func) {
        if(me.bindTouchend && func) {
          console.error('重复的bindTouchend');
        }
        me.bindTouchend = func;
      }

      me.touch = function(e) {
        var touch = e.changedTouches[0];
        if(me.bindTouch) {
          me.bindTouch(touch.x,touch.y);
          return;
        }
        var touchObj = me.getObjByXY(touch.x,touch.y);
        //如果touch了一个，默认将接下来的touchmove交给它处理
        me.touch.obj = touchObj 
        touchObj && touchObj[0].touch(touch.x,touch.y);
      }

      me.touchend = function(e) {
        var touch = e.changedTouches[0];
        if(me.bindTouchend) {
          me.bindTouchend(touch.x,touch.y);
          return;
        }
        //如果有有touch到了一个物体，默认用那个物体来处理移动结束事件。
        var touchObj = me.touch.obj || me.getObjByXY(touch.x,touch.y);
        touchObj && touchObj[0].touchend(touch.x,touch.y);
      }

      me.touchmove = function(e) {
        var touch = e.changedTouches[0];
        if(me.bindTouchmove) {
          me.bindTouchmove(touch.x,touch.y);
          return;
        } 
        //如果有有touch到了一个物体，默认用那个物体来处理移动事件。
        var touchObj = me.touch.obj || me.getObjByXY(touch.x,touch.y);
        touchObj && touchObj[0].touchmove(touch.x ,touch.y);
      }

      //use for sence identify
      var identify = new Identify();
      me.addObj(0 , identify);

      me.setText = function(text) {
        identify.text = text;
      }
      me.setFps = function(fps) {
        identify.fps = fps
      }
   	}


   	
   	
    module.exports = Sence
})