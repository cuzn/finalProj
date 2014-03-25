/**
 * 全局的变量
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    
    var global = {
    	ctx : null ,
    	c : null, 
        scale : null,
        conf : require('conf/conf'),
    	tool : {
    		img : require('tool/img'),
    		event : require('tool/event'),
    		screen : require('tool/screen')
    	},
    	draw : function(func) {
    		this.ctx.save();
    		func();
    		this.ctx.restore();
    	}
    };

    /**
     * 生成一个正整数
     * @param  {int} x 100 生成0-100
     * @return {int}   随机数
     */
    Math.randomInt = function(x) {
        return Math.floor(Math.random() * (x + 1))
    }

    /**
     * 生成一个整数，可能是负数
     * @param  {[type]} x [description]
     * @return {[type]}   [description]
     */
    Math.randomNe = function(x) {
        var random = Math.randomInt(x);
        if(Math.random() > 0.5) {
            random = -random;
        }

        return random;
    }
    /**
     * 获取对象的长度
     * @param  {Object} obj   对象
     * @param  {bool} withP 是否要统计继承下来的属性，默认是true
     * @return {int}       长度
     */ 
    JSON.getLen = function(obj , withP) {
      withP = typeof withP === 'undefined' ? true : withP;
      
      var len = 0
      for(var index in obj) {
        if(!withP) {
          //不是自己的属性，不增加
          if(!obj.hasOwnProperty(index)){
            break;
          }
        }
        len++
      }
      return  len
    }


    module.exports = global
})