/**
 * 屏幕适应用的工具
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    
    var screenTool = {
    	realWinSize : {width : 640 , height : 960},
    	scale : {}
    };

    screenTool.getWindowSize = function(){
    	var winWidth ;
    	var winHeight;
    	//获取窗口宽度 
		if (window.innerWidth) {
			winWidth = window.innerWidth; 
		}else if ((document.body) && (document.body.clientWidth)) {
			winWidth = document.body.clientWidth; 
		}
		//获取窗口高度 
		if (window.innerHeight) {
			winHeight = window.innerHeight; 
		} 
		else if ((document.body) && (document.body.clientHeight)) {
			winHeight = document.body.clientHeight; 
		}
		//通过深入Document内部对body进行检测，获取窗口大小 
		if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) { 
			winHeight = document.documentElement.clientHeight; 
			winWidth = document.documentElement.clientWidth; 
		}

		return {width: winWidth , height : winHeight};
	}

	screenTool.initScale = function() {
		var winSize = screenTool.getWindowSize();
		var realWinSize = screenTool.realWinSize;
        var scaleWidth = winSize.width / realWinSize.width;
        var scaleHeight = winSize.height / realWinSize.height;
        screenTool.scale =  {width : scaleWidth , height : scaleHeight};
		return  screenTool.scale
	}


	screenTool.getRealPos = function(x , y) {
		var realX , realY;
		realX = x / screenTool.scale.width;
		realY = y / screenTool.scale.height;

		return {x : realX , y : realY}
	}

	screenTool.transTouchEvent = function(e) {
		return {
			changedTouches : screenTool.transTouches(e.changedTouches),
			touches : screenTool.transTouches(e.touches)
		}
	}

	screenTool.transTouches = function(touches) {
		var ret = [];

		for(var i in touches) {
			var touch = {}

			realPos = screenTool.getRealPos(touches[i].clientX , touches[i].clientY);
			touch = realPos;
			touch.identifier = touches[i].identifier
			ret.push(touch);
		}
		return ret;
	}
    module.exports = screenTool
})