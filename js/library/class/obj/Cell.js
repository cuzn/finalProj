/**
 * 文件描述
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    var G = require('global');
    var Obj = require('class/Obj');
    var Chess  = require('class/obj/Chess')
    var Queue = require('class/Queue')

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
        me.isBlink = false;
        me.row = row
        me.col = col
        me.blinkAlpha = 0
        me.blinkColor = '#ccc'
        me.blinkFlag = true

    	me.size = {width : 110 , height : 110}

    	var x = me.startX + col * me.size.width;
    	var y = me.startY + row * me.size.height;
    	me.setRange(x , y , me.size.width , me.size.height);
        me.setDesc('Cell');
    	me.chess = null;


        //每隔半秒修改一下颜色
        me.blinkEvent = new Queue.Event(50 , function(){
            if(me.blinkFlag) {
                me.blinkAlpha = me.blinkAlpha + 0.01
            }else { 
                me.blinkAlpha = me.blinkAlpha - 0.01
            }
            if(me.blinkAlpha >= 0.3) {
                me.blinkAlpha = 0.3
               me.blinkFlag = false
            }
            if(me.blinkAlpha <= 0) {
                me.blinkAlpha = 0
                me.blinkFlag = true
            }
        });



    	me.addChess = function(chess) {
            chess.cell = me;
    		chess.setRange(me.x , me.y , me.size.width , me.size.height);
    		G.sence.addObj(3 , chess);
    		me.chess = chess;
    	}

    	me.delChess = function() {
    		G.sence.delObj(me.chess);
    		me.chess = null;
    	}

        //设置Cell为闪烁状态
        me.setBlink = function(isBlink) {
            me.blinkEvent.setDone(false)
            me.isBlink = typeof isBlink == 'undefined' ? true : isBlink
            if(me.isBlink ) {
                G.sence.bindRunQueue(new Queue([me.blinkEvent]))
            } else {
                me.blinkEvent.setDone(true)
            }
        }
    	me.draw = function() {
    		if(me.isBlink) {
                G.draw(function() {
                    G.ctx.fillStyle = me.blinkColor
                    G.ctx.globalAlpha = me.blinkAlpha
                    G.ctx.fillRect(me.x,me.y,me.width,me.height);
                })
            }
    	}
    }

    module.exports = Cell;
})