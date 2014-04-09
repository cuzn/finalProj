/**
 * 图片加载及获取工具
 */
define(function(require, exports, module) {
  	console.log('load imgTool')
    var conf = require('conf/conf')

    var imgTool = {
        imgObjList : {},
        get : function(atr) {
            if(this.imgObjList[atr]) {
                return this.imgObjList[atr];
            }else {
                console.error('unfind :' +atr)
            }
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
            imgTool.imgObjList[this.getAtr(imgList[atr])] = img
    	}  

    }

    imgTool.getAtr = function(src) {
        return src.split(conf.img.pre)[1]
    }
    module.exports = imgTool
})