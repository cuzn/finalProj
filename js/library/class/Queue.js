/**
 * 队列事件
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    var G = require('global');

    /**
     * 队列，每次执行一个事件
     * @param  {Event list} eventList 事件的数组
     * @return {null}           
     */
    var Queue= function(eventList) {
    	var me = this;

    	me.done = false;
    	me.eventList = eventList || [];

    	me.addEvent = function(event) {
    		me.eventList.push(event)
    	}

    	me.run = function() {
    		//如果有第一个，而且第一个事件已经完成，去除
    		if(me.eventList[0] && me.eventList[0].isDone()){
    			me.eventList.shift();
    		}
    		//如果没有事件，队列结束
    		if(me.eventList.length == 0) {
    			me.setDone();
    			return;
    		}

    		var firstEvent = me.eventList[0];
    		firstEvent.run();
    	}

    	me.isDone = function() {
    		return me.done;
    	}

    	me.setDone = function() {
    		me.done =true;
    	}

    	
    }


    Queue.Event = function(duration , func) {
    	var me = this;
    	me.done = false;

        me.duration = duration || 1000
        me.runFunc = func || function() {}
        me.runTime = 0 //执行的次数
        me.startDate = new Date();
        me.nowDate = null

    	//需要重写
    	me.run = function() {
            me.nowDate = new Date();
            var runTime = Math.floor((me.nowDate.getTime() - me.startDate.getTime()) / me.duration)
            while(me.runTime < runTime && !me.done) {
                me.runTime++
                me.runFunc()
            }
        };

        me.setDuration = function(ms) {
            me.duration = ms
        }

        me.setFunc = function(func) {
            me.runFunc = func
        }

    	me.isDone = function() {
    		return me.done;
    	}

    	me.setDone = function(isDone) {
    		me.done = typeof isDone == 'undefined' ? true : isDone;
    	}
    }
    module.exports = Queue
})