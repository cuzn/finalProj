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

    	me.addFunc = function(event) {
    		me.eventList.push(event)
    	}

    	me.run = function() {
    		//如果有第一个，而且第一个事件已经完成，去除
    		if(me.eventList[0] && me.eventList[0].isDone()){
    			me.eventList.shift();
    		}
    		//如果没有事件，队列结束
    		if(me.eventList.length == 0) {
    			me.done();
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


    Queue.Event = function() {
    	var me = this;
    	var me.done = false;

    	//需要重写
    	me.run = function() {};

    	me.isDone = function() {
    		return me.done;
    	}

    	me.setDone = function() {
    		me.done = true;
    	}
    }
    module.exports = Queue；
})