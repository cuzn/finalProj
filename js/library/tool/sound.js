/**
 * 图片加载及获取工具
 */
define(function(require, exports, module) {
    console.log('load soundTool')
    var conf = require('conf/conf')

    var soundTool = {
        soundObjList : {},
        get : function(atr) {
            if(this.soundObjList[atr]) {
                return this.soundObjList[atr];
            }else {
                console.error('unfind :' +atr)
            }
        }
    }; 
    /**
    *
    **/
    soundTool.loadsound = function(soundList , oneDoneFunc) {
        var soundObjList = {}

        for(var atr in soundList) {
            var sound = document.createElement('audio');
            sound.oncanplaythrough = oneDoneFunc;
            sound.src = soundList[atr];
            soundTool.soundObjList[this.getAtr(soundList[atr])] = sound
        }  

    }

    soundTool.getAtr = function(src) {
        return src.split(conf.sound.pre)[1]
    }
    module.exports = soundTool
})