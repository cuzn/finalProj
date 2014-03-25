
/**
 * 没有全部完成，待
 */
define(function(require, exports, module) {
    var G = require('global');
    var Obj = require('class/Obj');
    var Button = require('class/obj/Button')
    var Queue = require('class/Queue')

    var Message = function(msg) {
        var me = this;
        me.__proto__ = new Obj();
        me.msg = msg || '' //用于提示的语句
        me.cancleButt = new Button();
        me.confirmButt = new Button();
        me.blankWidth = 300
        me.balnkHeight = 200
        me.buttWidth = 100
        me.buttHeight = 40
        me.alpha = 1;


        me.init = function() {
            var screenSzie =  G.tool.screen.realWinSize 
            var blankX = screenSzie.width / 2 - me.blankWidth / 2
            var blankY = screenSzie.height / 2 - me.balnkHeight / 2

            me.confirmButt.txt = '确认'
            me.cancleButt.txt = '取消'
           

            me.setRange(blankX , blankY , me.blankWidth , me.balnkHeight)
           
        }

        me.init();
        //初始化
        me.draw = function() {
            G.draw(function() {
                G.ctx.globalAlpha = me.alpha
                G.ctx.textBaseline="middle";
                G.ctx.textAlign="center";
                G.ctx.font = "20px Georgia";
                G.ctx.fillText(me.msg , me.x + me.width / 2 , me.y + me.height / 2 - 20)
                if(!me.cancleButt.isHide) {
                    me.cancleButt.draw()
                    me.cancleButt.drawRange()
                }
                if(!me.confirmButt.isHide) {
                    me.confirmButt.draw()
                    me.confirmButt.drawRange()
                }
            });
            
        }

        me.setMsg = function(msg) {
            me.msg = msg
        }

        me.show = function(confirmFunc , cancleFunc) {
            var twoButt = false
            //两个按钮
            if(confirmFunc && cancleFunc) {
                twoButt = true
            } 
            //有确认按钮
            if (confirmFunc) {
                me.confirmButt.setTab(confirmFunc)
                if(twoButt) {
                     me.confirmButt.setRange( me.x + 30 ,
                        me.y + me.balnkHeight - me.buttHeight - 20 ,
                        me.buttWidth , me.buttHeight)
                } else {
                    me.confirmButt.setRange(me.x + (me.blankWidth- me.buttWidth) / 2 ,
                        me.y + me.balnkHeight - me.buttHeight - 20 ,
                        me.buttWidth , me.buttHeight)
                }
            } else {
                me.confirmButt.setHide(true)
            }
            //有取消按钮
            if (cancleFunc) {
                me.cancleButt.setTab(cancleFunc)
                if(twoButt) {   
                    me.cancleButt.setRange( me.x + me.width - me.buttWidth - 30 ,
                        me.y + me.balnkHeight - me.buttHeight - 20 ,
                        me.buttWidth , me.buttHeight)
                }else {
                    me.cancleButt.setRange( me.x + (me.blankWidth- me.buttWidth) / 2 ,
                        me.y + me.balnkHeight - me.buttHeight - 20 ,
                        me.buttWidth , me.buttHeight)
                }
            } else {
                me.cancleButt.setHide(true)
            }

            G.sence.addObj(0 , me)
            G.sence.setBindTouch(me.touch);
            G.sence.setBindTouchmove(me.touchmove);
            G.sence.setBindTouchend(me.touchend);
        }

        me.hide = function() {
            G.sence.delObj(me)
            G.sence.setBindTouch(null);
            G.sence.setBindTouchmove(null);
            G.sence.setBindTouchend(null);
        }


        me.fade = function(func) {
            me.show()
            me.alpha = 1
            var event = new Queue.Event(200 , function() {
                me.alpha -= 0.1
                if(me.alpha <= 0) {
                    me.hide()
                    event.setDone()
                    func && func() //如果有设置结束函数，执行结束函数
                }
            })

            G.sence.bindRunQueue(new Queue([event]))
        }

        //将触摸事件转给按钮
        me.touch = function(x,y) {
            me.touch.butt = false
           if(me.cancleButt.on(x , y)){
                me.cancleButt.touch(x , y)
                me.touch.butt = me.cancleButt
           }
           if(me.confirmButt.on(x , y)){
                me.confirmButt.touch(x , y)
                me.touch.butt = me.confirmButt
           }
        }

        me.touchmove = function(x,y) {
           if(me.touch.butt){
                me.touch.butt.touchmove(x , y)
           }
        }

        me.touchend = function(x , y) {
            if(me.touch.butt){
                console.log('on butt')
                me.touch.butt.touchend(x , y)
           }
           me.touch.butt = null
        }
    }

    Message.msg = new Message()
    module.exports = Message;
})