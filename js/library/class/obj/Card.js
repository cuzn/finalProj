/**
 * 文件描述
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    var G = require('global');
    var Obj = require('class/Obj')
    var Cell = require('class/obj/Cell')
    var Msg = require('class/obj/Message')

    /**
     * 卡牌类
     * @param  {string} me.name 卡牌名
     * @return {[type]}          [description]
     */
    var Card = function(cardInfo , index) {
    	var me = this;
    	me.__proto__ = new Obj();


        me.scale = 1; //100*148
        me.normalSize = {width : 100 , height : 148}
        me.touchFlag = false; //标志是否被触摸到了
        me.index = index
        me.name = cardInfo.name
        me.type = cardInfo.type
        me.moral = cardInfo.moral
        me.attack = cardInfo.attack
        me.originCardInfo = cardInfo
        
        me.setDesc(me.name);
    	me.img = G.tool.img.get('card/' + me.name + '.png'); //下了之后的样子
    	me.imgB = G.tool.img.get('card/' + me.name + '_b.png'); //卡牌状


    	me.setXYScale = function(x ,y ,scale) {
    		me.scale = scale || me.scale;
    		width = me.normalSize.width * me.scale;
    		height =  me.normalSize.height * me.scale;

    		me.setRange(x ,y ,width ,height);
    	}

        //设置中心坐标
        me.setCenterX = function(x) {
            me.setRange((x - me.width / 2) , 840);
        } 

    	me.draw = function() {
    		G.draw(function() {
    			G.ctx.drawImage(
    				me.imgB ,
    				0 , 0 ,
    				me.imgB.width , me.imgB.height ,
    			   	me.x , me.y , 
    			   	me.width , me.height);
    		});
    	}

        me.touch = function(x , y) {
            me.touchmoveFlag = false;
            me.touch.x = x;
            me.touch.y = y;
            me.touch.oriX = me.x;
            me.touch.oriY = me.y;
            G.sence.cellGroup.setEnableChessCell(true)
        }

        me.touchmove = function(x , y) {
            if(me.touchmoveFlag != true) {
                G.sence.cardGroup.delCard(me);
                G.sence.addObj(2 , me);
                G.sence.cardGroup.calcPos();
            }
            me.touchmoveFlag = true;
            var nowX = me.touch.oriX + x - me.touch.x ;
            var nowY = me.touch.oriY + y - me.touch.y ;
            me.setRange(nowX , nowY)
        }

        me.touchend = function(x , y) {
            //移动了
            if(me.touchmoveFlag ) {
                G.sence.delObj(me);
                var onObjList = G.sence.getObjByXY(x , y);
                var addChess = false;
                for(var i in onObjList){
                    //是格子
                    if(onObjList[i].desc == 'Cell') {
                        if(!onObjList[i].chess && onObjList[i].isBlink) {
                            if(G.sence.action.oper('addCard' , me , onObjList[i])) {
                                addChess = true;
                            }
                            //onObjList[i].addChess(me.name);
                            break;
                        }else {
                            Msg.msg.setMsg('不能在此处下')
                            Msg.msg.fade()
                        }
                    }
                }
                //如果把卡牌放到了格子中，不返回卡牌组里
                if(!addChess){
                    G.sence.cardGroup.addCard(me);
                }
                G.sence.cardGroup.calcPos();
            }else { //没有移动
                 G.sence.setCardDesc(me.originCardInfo)
            }
            me.touchmoveFlag = false;
            G.sence.cellGroup.setEnableChessCell(false)
        }
       

    }

    module.exports = Card;
})