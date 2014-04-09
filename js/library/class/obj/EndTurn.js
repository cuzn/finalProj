/**
 * 文件描述
 */
define(function(require, exports, module) {
    console.log('load screenTool')
    var G = require('global');
    var Obj = require('class/Obj');
    var Queue = require('class/Queue')

    var EndTurn = function() {
        var me = this
        me.__proto__ = new Obj()
        init()
        function init() {
            me.img = G.tool.img.get('end_turn.png')
            me.arrowWidth = 30
            me.spend = false
            me.setRange( 640 -me.arrowWidth ,430 ,me.img.width , me.img.height)
        }


        me.draw = function() {
            G.draw(function() {
                G.ctx.drawImage(me.img , 0 ,0 , 
                    me.img.width , me.img.height , 
                    me.x , me.y ,
                    me.img.width  ,me.img.height)
            });
        }

        me.touch = function(x , y) {

        }

        me.touchend = function(x , y) {
            //没有展开
            if(!me.spend){
                G.sence.setBindTouch(me.touch)
                G.sence.setBindTouchmove(me.touch)
                G.sence.setBindTouchend(me.touchend)
                var event = new Queue.Event(10 , function() {
                    if(640 - me.img.width < me.x) {
                        me.setRange(me.x - 7)
                    } else {
                        me.spend = true
                        event.setDone()
                    }
                })

                G.sence.bindRunQueue(new Queue([event]))
            } else {
                //点击到了回合结束
                if(x > me.x + me.arrowWidth &&
                    y > me.y && y < me.y + me.img.height
                ) {
                    console.log('touch endturn')
                    G.sence.action.oper('endTurn')
                }

                var event = new Queue.Event(10 , function() {
                    if(me.x < 640 - me.arrowWidth) {
                        me.setRange(me.x + 7)
                    } else {
                        me.spend = false
                        G.sence.setBindTouch(null)
                        G.sence.setBindTouchmove(null)
                        G.sence.setBindTouchend(null)
                        event.setDone()
                    }
                })

                G.sence.bindRunQueue(new Queue([event]))
            }
        }
    }

    module.exports = EndTurn
})