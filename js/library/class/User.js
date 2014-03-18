/**
 *  人物类
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    var G = require('global');

    var User = function() {
    	var me = this;

    	me.life = 30; //生命值，0就over了
    	me.morale = 1; //士气值，影响你该轮能做多少事情

    	/**
    	 * 扣生命值时使用
    	 * @param  {int} num 减少的生命值
    	 */
    	me.delLife = function(num) {
    		me.life -= num;
    		if(me.life <= 0) {
    			me.die();
    		} else {

    		}
    	}

    	/**
    	 * 死的时候调用
    	 */
    	me.die = function() {

    	}
    }


    module.exports = 
})