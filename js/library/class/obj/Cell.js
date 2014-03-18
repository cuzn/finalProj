/**
 * 文件描述
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    var G = require('global');
    var Obj = require('class/Obj');
    var Chess  = require('class/obj/Chess')

    /**
     * 棋的格子	
     * @param  {[int]} row 横
     * @param  {int} col  列
     * @return {[type]}     [description]
     */
    var Cell = function(row , col) {
    	var me = this;
    	me.__proto__ =  new Obj();
    	me.startX = 45;
    	me.startY = 205;

    	me.size = {width : 110 , height : 110}

    	var x = me.startX + col * me.size.width;
    	var y = me.startY + row * me.size.height;
    	me.setRange(x , y , me.size.width , me.size.height);
        me.setDesc('Cell');
    	me.chess = null;
    	me.addChess = function(chess) {
            if(typeof chess == 'string') {
    		   chess = new Chess(chess);
            }
            chess.cell = me;
    		chess.setRange(x , y , me.size.width , me.size.height);
    		G.sence.addObj(3 , chess);
    		me.chess = chess;
    	}

    	me.delChess = function() {
    		G.sence.delObj(me.chess);
    		me.chess = null;
    	}

    	me.draw = function() {
    		
    	}
    }

    module.exports = Cell;
})