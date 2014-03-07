/**
 * 全局的变量
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    
    var global = {
    	ctx : null ,
    	c : null, 
        scale : null,
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

    console.log(global)

    module.exports = global
})