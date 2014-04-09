/**
 * 文件描述
 */
define(function(require, exports, module) {
    console.log('load screenTool')
    var G = require('global');

    var Obj = require('class/Obj');

    var Arrow = function(startX ,startY , endX , endY) {
        var me = this;

        me.__proto__ = new Obj();

        function init() {
            me.startX = startX
            me.startY = startY
            me.endX = endX
            me.endY = endY
        }

        me.setXY = function(startX ,startY , endX , endY) {
            me.startX = startX
            me.startY = startY
            me.endX = endX
            me.endY = endY
        }

        me.draw = function() {
            G.draw(function(){
                var my_gradient=G.ctx.createLinearGradient(me.startX,me.startY,me.endX,me.endY);
                my_gradient.addColorStop(0,"white");
                my_gradient.addColorStop(1,"red");
                G.ctx.lineWidth = 5;
                G.ctx.lineCap = 'round';
                G.ctx.strokeStyle = my_gradient

                G.ctx.beginPath();
                G.ctx.moveTo(me.startX,me.startY);
                G.ctx.lineTo(me.endX , me.endY);
                G.ctx.stroke();
            })
        }
        init()
    }

    module.exports = Arrow
})