/**
 * 图片加载及获取工具
 */
define(function(require, exports, module) {
  	console.log('load imgTool')
    
    var imgTool = {
        imgObjList : {},
        get : function(atr) {
            return this.imgObjList[atr];
        }
    };
    /**
    *
    **/
    imgTool.loadImg = function(imgList , oneDoneFunc) {
    	var imgObjList = {}

    	for(var atr in imgList) {
    		var img = new Image();

    		img.onload = oneDoneFunc;
    		img.src = imgList[atr];
            imgObjList[atr] = img
    	}

        imgTool.imgObjList = imgObjList
    }

    module.exports = imgTool
})