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


    var GameSence = function() {
    	var me = this;
    	me.__proto__ = new Sence();

    	me.setText('welcome GameSence');

        me.baseInfo = null;
        me.enemybaseInfo = null;

        me.chessDict = {}
        //测试用的背景图片
        var bgImg = G.tool.img.get('gameSence.jpg')
        me.addObj( 5 , new Bg(bgImg) );

        


        me.init = function() {
            me.initCell();
            me.initConn();
            me.action = new Action()
        }


        me.client = null;
        me.initConn = function() {
            me.client = new Client();
            me.client.conn();
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
            me.addObj(2 , me.baseInfo)
            me.addObj(2 , me.enemybaseInfo)
        }

        me.backToMenu = function() {
            console.log('back to menu')
        }

        me.beginOper = function(oper) {
            me.initBaseInfo(oper)
            me.initCardGroup(oper)
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
            cell.addChess(chess)

        }

    }
	
	
    module.exports = GameSence
})