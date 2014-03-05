define(function(require, exports, module) {
  	console.log('load ImgConf')
    var eventTool = {}

    eventTool.execByOrder = function(funcArr) {

        if(funcArr.length == 0) {
            console.log('execByOrder done')
            return;
        }
        var firstFunc = funcArr.shift();
        firstFunc(funcArr);
    }

    module.exports = eventTool

    //register touch event
    

})