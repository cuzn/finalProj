define(function(require, exports, module) {
    console.log('load screenTool')
    var G = require('global');
    var Obj = require('class/Obj');

    var RemainTime = function(isMe) {
        var me = this;
        me.__proto__ = new Obj();

        function init() {
            me.remainTime = 60
            me.isMe = isMe
        }

        me.draw = function() {
            if(me.remainTime <= 10){
                G.draw(function() {
                    var y = 0
                    var x = 140
                    if(me.isMe) {
                        y = 790
                    }else {
                        y = 140
                    }
                    G.ctx.fillStyle="black";
                    G.ctx.textBaseline="middle";
                    G.ctx.textAlign="center";
                    G.ctx.font = "50px Georgia";
                    G.ctx.fillText(me.remainTime, x , y)
                })
            }
        }

        init()
    }

    module.exports = RemainTime;
})