define(function(require, exports, module) {
/**
 * 没有全部完成，待
 * @type {[type]}
 */
    var G = require('global');
    var Obj = require('class/Obj');

    var Button = function(img) {
        var me = this;

        me.__proto__ = new Obj();

        me.img = img || null
        me.txt = '确认'

        me.draw = function() {
            G.draw(function() {
                G.ctx.font = "20px Georgia";
                G.ctx.textBaseline="middle";
                G.ctx.textAlign="center";
                var txtX = me.x + me.width  / 2
                var txtY = me.y + me.height /2
                G.ctx.fillText(me.txt , txtX , txtY)
            });
        }

        me.tab = function(){}

        me.setTab = function(func) {
            me.tab = func
        }
        
        me.touch = function(x,y) {
            me.touchmove.tabFlag = true
            //设置触摸样式，未完成
        }

        me.touchmove = function(x,y) {
            //tab事件失效 ,移动出去了
            if(!me.on(x , y)) {
                me.touchmove.tabFlag = false
                //还原原始状态，未完成
            }
        }

        me.touchend = function() {
            if(me.touchmove.tabFlag) {
                me.tab();
            }
        }
    }

    module.exports = Button;
})