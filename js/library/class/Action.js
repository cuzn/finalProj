/**
 * 用于构造请求给后台
 */
define(function(require, exports, module) {
    console.log('load screenTool')
    var G = require('global');
    var Msg = require('class/obj/Message')

    var Action = function() {
        var me  = this;

        me.isTurn = function(){
            return G.sence.baseInfo.onTurn
        }

        me.oper = function() {
            if(me.isTurn()) {
                var args = []
                for(var i in arguments) {
                    args.push(arguments[i])
                }
                var funcName = args.shift() + 'Oper'
                //有这个方法
                if(me[funcName]){
                    return me[funcName].apply(me[funcName] , args)
                }
            } else {
                Msg.msg.setMsg('不是你的回合')
                Msg.msg.fade()
                return false
            }
        }
        
        me.addCardOper = function(card , cell) {
            var msg = {
                type : 'addCard' ,
                cardIndex : card.index,
                cell : {
                    row : cell.row,
                    col : cell.col,
                }
            }

            G.sence.client.send(msg)
            return true
        }
    }

    module.exports = Action;
})