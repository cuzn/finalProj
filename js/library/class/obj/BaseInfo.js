/**
 * 存放基本信息
 */
define(function(require, exports, module) {
    var G = require('global');
    var Obj = require('class/Obj')

    var BaseInfo = function(info , isMe) {
        var me = this;
        me.__proto__ = new Obj();
        me.life = info.life;
        me.moral = info.moral;
        me.onTurn = info.onTurn;
        me.isMe = isMe

        me.draw = function() {
            if(me.isMe) {
                G.draw(function() {
                    var txt = me.life + ':' + me.moral + ':' + me.onTurn;
                    G.ctx.font = "20px Georgia";
                    G.ctx.fillText(txt , 100 , 200)
                });
            } else {
                G.draw(function() {
                    var txt = me.life + ':' + me.moral + ':' + me.onTurn;
                    G.ctx.font = "20px Georgia";
                    G.ctx.fillText(txt , 100 , 300)
                });
            }
        }
    }


    module.exports = BaseInfo;
})