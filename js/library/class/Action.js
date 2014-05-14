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
                } else {
                    console.error(' 错误的action:' + funcName)
                    return false
                }
            } else {
                Msg.msg.setMsg('不是你的回合')
                Msg.msg.fade()
                return false
            }
        }

        me.endTurnOper = function() {
            var msg = {
                type : 'endTurn'
            }
            G.sence.client.send(msg)
            return true
        }
        //添加卡牌到下面
        me.addCardOper = function(card , cell) {
            if(!G.sence.baseInfo.delMoral(card.moral)){
                console.log('test')
                return false
            }
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
        //移动棋子
        me.moveChessOper = function(chess , cell) {
            var delMoral = 1
            //后退
            if(chess.cell.row < cell.row) {
                delMoral = 2
            }
            if(!G.sence.baseInfo.delMoral(delMoral)){
                return false
            }
            
            var msg = {
                type : 'moveChess' ,
                chessIndex : chess.index,
                cell : {
                    row : cell.row,
                    col : cell.col,
                },
                delMoral : delMoral
            }

            G.sence.client.send(msg)
            return true
        }

        //棋子攻击
        me.chessAttackOper = function(chess1 , chess2) {
            if(!G.sence.baseInfo.delMoral(chess1.attackCount)){
                return false
            }

            var msg = {
                type : 'chessAttack',
                chesses : [
                    chess1.index , 
                    chess2.index
                ]
            }
            G.sence.client.send(msg)
            return true
        }

        me.attackWallOper = function(chess) {
            if(chess.isAttackedWall) {
                Msg.msg.setMsg('一回合只能攻击一次城墙')
                Msg.msg.fade()
                return false
            }
            if(!G.sence.baseInfo.delMoral(chess.attackCount)){
                return false
            }

            chess.isAttackedWall = true
            var msg = {
                type : 'attackWall',
                chessIndex : chess.index
            }
            G.sence.client.send(msg)
            return true
        }
    }

    module.exports = Action;
})