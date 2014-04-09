/**
 * 文件描述
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    var G = require('global');
    var Obj = require('class/Obj')
    var Arrow = require('class/obj/Arrow')
    var Msg = require('class/obj/Message')
    var Queue = require('class/Queue')

    var Chess = function(chessInfo) {
    	var me = this;
        var parent = new Obj()
    	me.__proto__ = parent
        
        function init() {
            me.cell = null;
            me.name = chessInfo.name
            me.moral = chessInfo.moral
            me.life = chessInfo.life
            me.attack = chessInfo.attack
            me.attackType = chessInfo.attackType
            me.move = chessInfo.move
            me.index = chessInfo.index 
            me.isMe = false
            me.img = G.tool.img.get('card/' + me.name + '.png');
            me.attackBg = G.tool.img.get('card/attack.png');
            me.bloodBg = G.tool.img.get('card/blood.png');
            me.chessEnemyBorder =  G.tool.img.get('card/' + me.move + me.attackType +'/enemy.png')
            me.chessAbleBorder = G.tool.img.get('card/' + me.move + me.attackType +'/able.png')
            me.chessNormalBorder = G.tool.img.get('card/' + me.move + me.attackType +'/normal.png')
            me.isAttacked = true //刚开始下的时候不可以发动攻击
            me.isMoved = true
            me.alpha = 1

            if(G.sence.baseInfo.onTurn) {
                me.isMe = true
            }
        }

        me.setBlink = function(flag) {

        }

    	me.draw = function() {
    		G.draw(function() {
                G.ctx.globalAlpha = me.alpha

                var bgImg = null
                if(!me.isMe) {
                    bgImg = me.chessEnemyBorder
                } else {
                    if(!me.isAttacked || !me.isMoved) {
                        bgImg = me.chessAbleBorder
                    }else {
                        bgImg = me.chessNormalBorder
                    }
                }

                //border
                G.ctx.drawImage(
                    bgImg ,
                    0 , 0 ,
                    bgImg.width , bgImg.height ,
                    me.x , me.y , 
                    me.width , me.height);

                G.ctx.drawImage(
                    me.img ,
                    0 , 0 ,
                    me.img.width , me.img.height ,
                    me.x , me.y , 
                    me.width , me.height);
                 //画攻击还有生命值
                G.ctx.fillStyle = 'white';
                G.ctx.font="900 20px 微软雅黑 ";
                G.ctx.textBaseline="middle";
                G.ctx.textAlign="center";

                G.ctx.drawImage(
                    me.attackBg ,
                    0 , 0 ,
                    me.attackBg.width , me.attackBg.height ,
                    me.x  ,
                    me.y + me.height - me.attackBg.height , 
                    me.attackBg.width , me.attackBg.height);

                G.ctx.fillText(me.attack ,
                    me.x  + me.attackBg.width / 2 , 
                    me.y + me.height - me.attackBg.height/ 2);

                G.ctx.drawImage(
                    me.bloodBg ,
                    0 , 0 ,
                    me.bloodBg.width , me.bloodBg.height ,
                    me.x + me.width  - me.bloodBg.width, 
                    me.y + me.height - me.bloodBg.height , 
                    me.bloodBg.width , me.bloodBg.height);
                G.ctx.fillText(me.life ,
                    me.x + me.width - me.bloodBg.width / 2 , 
                    me.y + me.height - me.bloodBg.height /2);

    		});

            //画轨迹
            if(me.touchmoveFlag == true) {
                G.draw(me.drawPath());
                
            }
            
    	}

        me.isAbleAttackCell = function(cell) {
            if(Math.abs(me.cell.row - cell.row) <= 1 && 
                Math.abs(me.cell.col - cell.col) <= 1 &&
                Math.abs(me.cell.row - cell.row) != Math.abs(me.cell.col - cell.col)
                ){
                return true
            }
            return false
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

        me.setInfo = function(chessInfo) {
            me.name = chessInfo.name
            me.moral = chessInfo.moral
            me.life = chessInfo.life >= 0 ? chessInfo.life : 0
            me.attack = chessInfo.attack
            me.index = chessInfo.index
            me.move = chessInfo.move
            me.isDied = chessInfo.isDied

            if(me.isDied) {
                var waitEvent = new Queue.Event(500 , function() {
                    waitEvent.setDone()
                });
                var fadeEvent = new Queue.Event(10 , function() {
                    me.alpha -= 0.01
                    if (me.alpha <= 0){
                        fadeEvent.setDone();
                        me.cell.delChess()
                    }
                });
                G.sence.bindRunQueue(new Queue([waitEvent,fadeEvent]))

            }
        }
        me.getCell = function(){
            return me.cell;
        }

        me.touch = function(x , y) {
            G.sence.cellGroup.setAllEnable(false)
            me.touchmoveFlag = false;
            me.touch.x = x;
            me.touch.y = y;
            me.touch.oriX = me.x;
            me.touch.oriY = me.y;
            
            
        }

        me.touchmove = function(x , y) {
            if(!me.touchmoveFlag && !me.isMoved) {
                cellList = G.sence.cellGroup.getEnableMoveCellList(me.cell , me.move)
                G.sence.cellGroup.setAllEnable(true , cellList)
            }
            me.touchmoveFlag = true;
            me.touchmove.x = x;
            me.touchmove.y = y;
        }

        me.touchend = function(x , y) {
            //移动了
            if(me.touchmoveFlag ) {
                //接触到了Cell
                G.sence.getObjByXY(x , y , 'Cell' , function(cell){
                    //没有棋子，可以走，不是自己
                    if(!cell.chess && cell.isBlink && cell != me.cell) {
                            if(!me.isMe) {
                                Msg.msg.setMsg('这不是你的吧，囧！！')
                                Msg.msg.fade()
                            }else if(me.isMoved) { //已经移动了
                                Msg.msg.setMsg('该棋子不可以移动！')
                                Msg.msg.fade()
                            } else {
                                G.sence.action.oper('moveChess' , me , cell)
                            }
                    } 
                    //攻击事件
                    else if(cell.chess && !cell.chess.isMe) {
                        if(!me.isMe) {
                            Msg.msg.setMsg('这不是你的吧，囧！！')
                            Msg.msg.fade()
                        }else if(me.isAttacked){
                            Msg.msg.setMsg('已经攻击过一次了')
                            Msg.msg.fade()
                        } else if(!me.isAbleAttackCell(cell)){
                            Msg.msg.setMsg('不在攻击范围')
                            Msg.msg.fade()
                        }else {//可以攻击
                            G.sence.action.oper('chessAttack' , me , cell.chess)
                        }
                    }
                })
                //接触到了BaseInfo
                 G.sence.getObjByXY(x , y , 'BaseInfo' , function(baseInfo){
                    if(baseInfo.isMe || me.cell.row != 0) {
                        return false
                    } else { 
                        G.sence.action.oper('attackWall' , me)
                    }
                 })
            }else { //没有移动
                 G.sence.setCardDesc(chessName)
            }
            me.touchmoveFlag = false; 
            G.sence.cellGroup.setAllEnable(false)
        }

        me.attackEvent = function(x , y , chessInfo , func) {
            var oriX = me.x
            var oriY = me.y

            var backEvent =  new Queue.Event(20 , function() {
                    parent.x += x 
                    parent.y += y 
                    if(Math.abs(me.x - oriX) > 25 || Math.abs(me.y - oriY) > 25) {
                        console.log('backEvent done')
                        backEvent.setDone()
                    }
                });

            var returnEvent = new Queue.Event(10 , function() {
                    parent.x -= x 
                    parent.y -= y 
                    if(Math.abs(me.x - oriX) == 0 && Math.abs(me.y - oriY) == 0) {
                        console.log('returnEvent done')
                        returnEvent.setDone()
                    }
                });
            var forwardEvent = new Queue.Event(10 , function() {
                    parent.x -= x 
                    parent.y -= y 
                    if(Math.abs(me.x - oriX) > 15 || Math.abs(me.y - oriY) > 15) {
                        forwardEvent.x = me.x
                        forwardEvent.y = me.y
                        forwardEvent.setDone()
                        func && func(me)
                        console.log('forwardEvent done')
                    }
                });

            var shakeEvent = new Queue.Event(75 , function() {
                shakeEvent.flag = typeof shakeEvent.flag == 'undefined' ? 1 : -shakeEvent.flag
                if(shakeEvent.runTime >= 6){
                        shakeEvent.setDone()
                }
                parent.x = oriX + shakeEvent.flag * 5
            });
            shakeEvent.flag = 1
            shakeEvent.shakeTime = 1

            var endEvent = new Queue.Event(10 , function() {
                    var xFlag = oriX - me.x > 0 ? 1 : oriX - me.x  == 0 ? 0 : -1
                    var yFlag = oriY - me.y > 0 ? 1 : oriY - me.y  == 0 ? 0 : -1
                    parent.x += xFlag * 2
                    parent.y += yFlag * 2
                    if(Math.abs(me.x - oriX) === 0 && Math.abs(me.y - oriY) === 0) {
                        console.log('endEvent done')
                        endEvent.setDone()
                    }
                });

            var endEvent2 = new Queue.Event(20 , function() {
                    var xFlag = oriX - me.x > 0 ? 1 : oriX - me.x  == 0 ? 0 : -1
                    var yFlag = oriY - me.y > 0 ? 1 : oriY - me.y  == 0 ? 0 : -1

                    parent.x += xFlag
                    parent.y += yFlag
                    if(Math.abs(me.x - oriX) === 0 && Math.abs(me.y - oriY) === 0) {
                        console.log('endEvent2 done')
                        endEvent2.setDone()
                        me.setInfo(chessInfo)
                    }
                });

            G.sence.bindRunQueue(new Queue([
               backEvent,returnEvent ,  forwardEvent , endEvent , shakeEvent , endEvent2
            ]))
        }

        me.shakeEvent = function() {
            var oriX = me.x 
            var oriY = me.y
            var shakeEvent = new Queue.Event(75 , function() {
                shakeEvent.flag = typeof shakeEvent.flag == 'undefined' ? 1 : -shakeEvent.flag
                if(shakeEvent.runTime >= 6){
                        shakeEvent.setDone()
                }
                parent.x = oriX + shakeEvent.flag * 5
            });
            return shakeEvent;
        }
        me.shootEvent = function(x , y) {
           var arrow = new Arrow(me.x + me.width / 2 , 
            me.y + me.height/2 ,
            me.x + me.width / 2 - x * 3 , 
            me.y + me.height/2 - y * 3)

           G.sence.addObj(2 , arrow)
           var shootEvent =  new Queue.Event(10 , function() {
                if(Math.abs(arrow.endX - me.x - me.width/2) > me.width *1.5
                    ||Math.abs(arrow.endY - me.y - me.height/2) > me.height *1.5) {
                    shootEvent.setDone()
                    G.sence.delObj(arrow)
                }
                arrow.startX -= x
                arrow.startY -= x
                arrow.endX -=  x * 3
                arrow.endY -= y * 3
            });
            return shootEvent;

        }
        me.setInfoEvent = function(chessInfo) {
            var setInfoEvent = new Queue.Event(1 , function() {
                me.setInfo(chessInfo)
                setInfoEvent.setDone()
            }) 
            return setInfoEvent
        }

        me.attackChess = function(chess , chessInfos) { 
            var attackPos = 0 //上右下左

            var y = me.cell.row - chess.cell.row
            var x = me.cell.col - chess.cell.col
            if(me.attackType == 1 ) {
                me.attackEvent(x , y ,chessInfos[0])
                chess.attackEvent(-x , - y , chessInfos[1])
            }else {
                G.sence.bindRunQueue(new Queue([
                    me.shootEvent(x , y) , chess.shakeEvent() ,
                    me.setInfoEvent(chessInfos[0]),
                    chess.setInfoEvent(chessInfos[1])
                ]))
            }

        }
        init()
    }


    module.exports = Chess;
})