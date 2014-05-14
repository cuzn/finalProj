define(function(require, exports, module) {
  	console.log('LoadSence ')
    var Sence = require('class/Sence');
    var G = require('global');
    var Bg = require('class/obj/Bg');
    var Card = require('class/obj/Card');
    var CardGroup = require('class/CardGroup');
    var CellGroup = require('class/CellGroup');
    var Client = require('class/Client');
    var BaseInfo = require('class/obj/BaseInfo')
    var Msg = require('class/obj/Message')
    var Action = require('class/Action')
    var Chess = require('class/obj/Chess')
    var EndTurn = require('class/obj/EndTurn')
    var RemainTime = require('class/obj/RemainTime')
    var Queue = require('class/Queue')

    var GameSence = function() {
    	var me = this;
    	me.__proto__ = new Sence();

    	me.setText('GameSence');

        me.baseInfo = null;
        me.enemybaseInfo = null;

        me.chessDict = {}
       
        me.init = function() {
            me.initBg();
            me.initCell();
            me.initConn();
            me.action = new Action()
        }


        me.client = null;
        me.initConn = function() {
            me.client = new Client();
            me.client.conn();
        }

        me.initBg = function() {
            //测试用的背景图片
            var bgImg = G.tool.img.get('gameSence.jpg')
            me.addObj( 5 , new Bg(bgImg) );
        }

        /**
         * 设置点击卡牌后的卡牌介绍
         * @param  {string} cardName 卡牌名
         */
        me.setCardDesc = function(originCardInfo) {
            var cardDesc = new Card(originCardInfo);
            var scale = 1.9
            var width = cardDesc.normalSize.width * scale;
            var x =  G.tool.screen.realWinSize.width / 2 - width / 2 
            var y =  G.tool.screen.realWinSize.height - cardDesc.normalSize.height * scale - 200 ;
            cardDesc.setXYScale( x , y ,scale);

            if(me.cardDesc) {
                me.delObj(me.cardDesc)
            }

            me.setBindTouchmove(function() {});
            me.setBindTouch(function(x , y ) {});
            me.setBindTouchend(function(x , y) {
                G.sence.delObj(me.cardDesc);
                me.cardDesc = null;
                //还原触摸事件
                me.setBindTouch(null);
                me.setBindTouchend(null);
                me.setBindTouchmove(null); 
            })
            
           
            me.cardDesc = cardDesc
            G.sence.addObj(2 ,cardDesc);
        }


        me.initCardGroup = function(oper) {
            var cardGroup = new CardGroup();
            me.cardGroup = cardGroup;

            var MyInfo = oper.me
            for(var index in MyInfo.cardDict) {
                var card = new Card(MyInfo.cardDict[index] , index)
                card.setXYScale(0 , 840 , 1)
                cardGroup.addCard(card)
            }
            
            cardGroup.calcPos();
        }
        
        me.initCell = function() {
            me.cellGroup = new CellGroup();
            me.cellGroup.initCell();
        }

        me.initBaseInfo = function(info) {
            me.baseInfo = new BaseInfo(info.me , true)
            me.enemybaseInfo = new BaseInfo(info.enemy , false)
            me.addObj(4 , me.baseInfo)
            me.addObj(4 , me.enemybaseInfo)
        }

        me.backToMenu = function() {
            console.log('back to menu')
        }

        me.oper = function(oper) {
            console.log('bingo')
            if(me[oper.type + 'Oper']) {
                me[oper.type + 'Oper'](oper)
            }
            if(oper.me){
                me.baseInfo.formInfo(oper.me)
            }
            if(oper.enemy){
                me.enemybaseInfo.formInfo(oper.enemy)
            }
        }
        me.beginOper = function(oper) {
            me.initBaseInfo(oper)
            me.initCardGroup(oper)
            var endTurn = new EndTurn()
            me.addObj(1 , endTurn)
            if(me.baseInfo.onTurn){
                Msg.msg.setMsg('游戏开始，你先手')
            } else {
                Msg.msg.setMsg('游戏开始，你后手')
            }
            me.setRemainTime(me.baseInfo.onTurn)
            Msg.msg.fade()
        }

        me.endTurnOper = function(oper) {
            var msg = ''
            if(me.baseInfo.onTurn) {
                msg = '回合结束'
            }else {
                msg = '你的回合'
                //加卡片
                if(oper.card){
                    var card = new Card(oper.card)
                    me.cardGroup.addCard(card)
                    me.cardGroup.calcPos()
                } else if(me.baseInfo.remainCardNum == 0){
                    msg += ',卡牌库没牌鸟~~'
                } else {
                    msg += ',手牌已满鸟~~'
                }

                //重置棋子状态
                for (var index in me.chessDict) {
                    me.chessDict[index].isMoved = false
                    me.chessDict[index].isAttacked = false;
                    me.chessDict[index].attackCount = 1
                    me.chessDict[index].isAttackedWall = false

                }
            }
            Msg.msg.setMsg(msg)
            Msg.msg.fade()

            me.setRemainTime(!me.baseInfo.onTurn)
            
        }

        me.setRemainTime = function(isMe) {
            //设置倒计时
            var remainTime = new RemainTime(isMe)
            G.sence.addObj(2 , remainTime)

            var countTimeEvent = new Queue.Event(1000 , function() {
                //var timeSound = G.tool.sound.get('time.mp3')
                //timeSound.loop = true
                if(remainTime.remainTime == 0 || remainTime.isMe != me.baseInfo.onTurn) {
                    //timeSound.pause()
                    countTimeEvent.setDone()
                    if(remainTime.isMe && me.baseInfo.onTurn) {
                        G.sence.action.oper('endTurn')
                    }
                    G.sence.delObj(remainTime)
                }else if(remainTime.remainTime == 10) {
                    //timeSound.play()
                }
                remainTime.remainTime --
            });

             G.sence.bindRunQueue(new Queue([countTimeEvent]))
        }

        me.overOper = function(oper) {
            var msg = ''
            if(oper.reslut == 'win' && oper.reason == '') {
                msg = 'You Win!'
            } else if(oper.reslut == 'lose') {
                msg = 'You Lose!'
            } else if(oper.reslut = 'win' && oper.reason == 'quit'){
                msg = '对方退出，你赢下了这场游戏'
            }

            var info = new Msg(msg)
            info.show(function() {
                me.backToMenu()
            });
        }

        me.addChessOper = function(oper) {
            var chess = new Chess(oper.chess)
            var cell = me.cellGroup.getCell(oper.cell)
            me.chessDict[chess.index] = chess
            cell.addChess(chess)
            //G.playSound('pu.mp3')
        }

        me.moveChessOper = function(oper) {
            var cell = me.cellGroup.getCell(oper.cell)
            var chess = me.chessDict[oper.chess.index]
            chess.isMoved = true
            cell.addChess(chess)
            //G.playSound('pu.mp3') 
        }

        me.chessAttackOper = function(oper) {
            var chess1 = me.chessDict[oper.chesses[0].index]
            var chess2 = me.chessDict[oper.chesses[1].index]
            
            chess1.attackChess(chess2 , oper.chesses)
        }

        me.attackWallOper = function(oper) {
            var chess = me.chessDict[oper.chess.index]
            var baseInfo = G.sence.baseInfo
            var attackPos = -1
            if(G.sence.baseInfo.onTurn) {
                baseInfo = G.sence.enemybaseInfo
                attackPos = 1
            }
            chess.attackEvent(0 , attackPos , oper.chess , baseInfo.chessAttack , function() {
                //G.playSound('wall.mp3')
            })
        }

    }
	
	
    module.exports = GameSence
})