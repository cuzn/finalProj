/**
 * 文件描述
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    var G = require('global');

    var CardGroup = function() {
    	var me = this;

    	me.cardList = [];
    	me.cardDist = 80;
    	me.senceLayer = 3; //卡牌在第二组

    	me.addCard = function(card) {
    		me.cardList.push(card);
    		G.sence.addObj(me.senceLayer ,card);
    	}

    	me.delCard = function(card) {
    		for(var i in me.cardList) {
            	if(me.cardList[i] == card) {
	              //删除
	              me.cardList.splice(i , 1);
	              G.sence.delObj(card);
	              return card;
            	}
          }
    	}

    	me.calcPos = function() {
    		var num = me.cardList.length;
    		var flag = num % 2 ;
			var firstCardX = G.tool.screen.realWinSize.width / 2 - ((num / 2) - 0.5) * me.cardDist 

    		for(var i in me.cardList) {
    			var centerX = firstCardX + me.cardDist * i;
    			me.cardList[i].setCenterX(centerX);
    		}
    	}
    }

    module.exports = CardGroup;
})