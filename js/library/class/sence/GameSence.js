define(function(require, exports, module) {
  	console.log('LoadSence ')
    var Sence = require('class/Sence');
    var G = require('global');
    var Bg = require('class/obj/Bg');
    var Card = require('class/obj/Card');
    var CardGroup = require('class/CardGroup');
    var CellGroup = require('class/CellGroup');
    var Client = require('class/Client')


    var GameSence = function() {
    	var me = this;
    	me.__proto__ = new Sence();

    	me.setText('welcome GameSence');


        var bgImg = G.tool.img.get('gameSence.jpg')
        me.addObj( 5 , new Bg(bgImg) );

        


        me.init = function() {
            me.initCardGroup();
            me.initCell();
            me.initConn();
        }


        me.client = null;
        me.initConn = function() {
            me.client = new Client();
            console.log(me.client)
            me.client.conn();
        }
        /**
         * 设置点击卡牌后的卡牌介绍
         * @param  {string} cardName 卡牌名
         */
        me.setCardDesc = function(cardName) {
            var cardDesc = new Card(cardName);
            var scale = 1.9
            var width = cardDesc.normalSize.width * scale;
            var x =  G.tool.screen.realWinSize.width / 2 - width / 2 
            var y =  G.tool.screen.realWinSize.height - cardDesc.normalSize.height * scale - 200 ;
            cardDesc.setXYScale( x , y ,scale);

            if(me.cardDesc) {
                me.delObj(me.cardDesc)
            }

            me.setBindTouchmove(function() {

            });
            me.setBindTouch(function(x , y ) {
               
            });

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


        me.initCardGroup = function() {
            var cardGroup = new CardGroup();
            me.cardGroup = cardGroup;
            var card1 = new Card('shanzei');
            card1.setXYScale(100 , 840 , 1);

            var card2 = new Card('shanzei');
            card2.setXYScale(180 , 840 , 1);

            var card3 = new Card('shanzei');
            card3.setXYScale(260 , 840 , 1);

            var card4 = new Card('shanzei');
            card4.setXYScale(340 , 840 , 1);

            var card5 = new Card('shanzei');
            card5.setXYScale(420 , 840 , 1);

            cardGroup.addCard(card1)
            cardGroup.addCard(card2)
            cardGroup.addCard(card3)
            cardGroup.addCard(card4)
            cardGroup.addCard(card5)

            cardGroup.calcPos();
        }
        
        me.initCell = function() {
            me.cellGroup = new CellGroup();
            me.cellGroup.initCell();
        }


        
    }
	
	
    module.exports = GameSence
})