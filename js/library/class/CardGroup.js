/**
 * 文件描述
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    var G = require('global');

    var CardGroup = function() {
    	var me = this;

    	me.cardDict = {};
    	me.cardDist = 80;
    	me.senceLayer = 3; //卡牌在第二组
        me.cardY = 840

    	me.addCard = function(card) {
    		me.cardDict[card.index] = card;
            card.setRange( 0 ,me.cardY)
    		G.sence.addObj(me.senceLayer ,card);
    	}

    	me.delCard = function(card) {
    		for(var i in me.cardDict) {
            	if(me.cardDict[i] == card) {
	              //删除
	              delete me.cardDict[i];
	              G.sence.delObj(card);
	              return card;
            	}
          }
    	}

    	me.calcPos = function() {
    		var num = JSON.getLen(me.cardDict);
    		var flag = num % 2 ;
			var firstCardX = G.tool.screen.realWinSize.width / 2 - ((num / 2) - 0.5) * me.cardDist 

            var i = 0;
    		for(var index in me.cardDict) {
    			var centerX = firstCardX + me.cardDist * i;
    			me.cardDict[index].setCenterX(centerX);
                i++
    		}
    	}
    }

    module.exports = CardGroup;
})