/**
 * 文件描述
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    var G = require('global');
    var Obj = require('class/Obj')

    var Chess = function(chessInfo) {
    	var me = this;
    	me.__proto__ = new Obj();
        me.cell = null;

        me.name = chessInfo.name
        me.moral = chessInfo.moral
        me.life = chessInfo.life
        me.attack = chessInfo.attack
        me.move = chessInfo.move
        me.index = chessInfo.index

    	me.img = G.tool.img.get('card/' + me.name + '.png'); //下了之后的样子
        me.setDesc('Chess');


    	me.draw = function() {
    		G.draw(function() {
    			G.ctx.drawImage(
    				me.img ,
    				0 , 0 ,
    				me.img.width , me.img.height ,
    			   	me.x , me.y , 
    			   	me.width , me.height);

                 //画攻击还有生命值
                  G.ctx.fillStyle = 'black';
                  G.ctx.font="900 20px 微软雅黑 ";
                  G.ctx.fillText(me.attack ,me.x + 10, me.y + me.height);
                  G.ctx.fillText(me.life ,me.x + me.width - 30  , me.y + me.height);

    		});

            //画轨迹
            if(me.touchmoveFlag == true) {
                G.draw(me.drawPath());
                
            }
            
    	}

        me.drawPath = function() {
            var startX = me.x + me.width / 2;
            var startY = me.y + me.height / 2;
            //var bezier1 = {x :  Math.randomNe(me.width / 2) , y : Math.randomNe(me.height / 2)}
            //var bezier2 = {x : Math.randomNe(me.width / 2)  , y : Math.randomNe(me.height /2)}

            var my_gradient=G.ctx.createLinearGradient(startX,startY,me.touchmove.x,me.touchmove.y);
            my_gradient.addColorStop(0,"orange");
            my_gradient.addColorStop(1,"red");
            G.ctx.lineWidth = 15;
            G.ctx.lineCap = 'round';
            G.ctx.strokeStyle = my_gradient

            var func = function() {
                    G.ctx.beginPath();
                    G.ctx.moveTo(startX,startY);
                    // G.ctx.bezierCurveTo(
                    //     startX + bezier1.x , startY + bezier1.y,
                    //     me.touchmove.x + bezier2.x, me.touchmove.y + bezier2.y ,
                    //     me.touchmove.x,me.touchmove.y
                    //     );
                    G.ctx.lineTo(me.touchmove.x , me.touchmove.y);
                    G.ctx.stroke();
            }

            
            return func;
        }


        me.getCell = function(){
            return me.cell;
        }

        me.touch = function(x , y) {
            me.touchmoveFlag = false;
            me.touch.x = x;
            me.touch.y = y;
            me.touch.oriX = me.x;
            me.touch.oriY = me.y;
            cellList = G.sence.cellGroup.getEnableMoveCellList(me.cell , me.move)
            for(var i in cellList) {
                cellList[i].setBlink(true)
            }
        }

        me.touchmove = function(x , y) {
            me.touchmoveFlag = true;
            me.touchmove.x = x;
            me.touchmove.y = y;

        }

        me.touchend = function(x , y) {
            //移动了
            if(me.touchmoveFlag ) {
                var onObjList = G.sence.getObjByXY(x , y);
                for(var i in onObjList){
                    //是格子
                    if(onObjList[i].desc == 'Cell' && onObjList[i] != me.cell) {
                        me.cell.delChess(me);
                        onObjList[i].addChess(me);
                        break;
                    }
                }
            }else { //没有移动
                 G.sence.setCardDesc(chessName)
            }
            me.touchmoveFlag = false;
        }
    }


    module.exports = Chess;
})