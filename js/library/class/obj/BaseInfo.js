/**
 * 存放基本信息
 */
define(function(require, exports, module) {
    var G = require('global');
    var Obj = require('class/Obj')
    var Msg = require('class/obj/Message')
    var Queue = require('class/Queue')

    var BaseInfo = function(info , isMe) {
        var me = this;
        me.__proto__ = new Obj();

        function init() {
            me.life = info.life;
            me.moral = info.moral;
            me.onTurn = info.onTurn;
            me.cardNum = info.cardNum
            me.isMe = isMe
            me.attackShake = 0 //被攻击时的震动
            me.setDesc('BaseInfo')

            if(!me.isMe) {
                me.setRange(0 , 0  , 640 , 200)
            } else {
                me.setRange(0 , 760  , 640 , 960)
            }
        }
        
        me.chessAttack = function(chess) {
            var nowLife = me.life - chess.attack
            me.attackShake = 1;
            var shakeEvent = new Queue.Event(50 , function() {
                if(shakeEvent.runTime >= 5){
                    shakeEvent.setDone()
                    me.setLife(nowLife)
                    me.attackShake = 0
                }
                me.attackShake = -me.attackShake
            });
            G.sence.bindRunQueue(new Queue([shakeEvent]))
        }

        me.setLife = function(life){
            if(life <= 0) {
                me.life = 0
                me.die()
            }else {
                me.life = life
            }
        }

        me.die = function() {
            var msg = new Msg()
            msg.setMsg('YOU LOOSE!!! 重新开始？')
            if(!me.isMe){
                msg.setMsg('YOU WIN!!! 重新开始？')
            }
            msg.show(function() {
                location.reload()
                msg.hide()
            })

        } 
        me.formInfo = function(info){
            me.moral = info.moral;
            me.onTurn = info.onTurn;
            me.cardNum = info.cardNum
        }
        me.draw = function() {
            if(me.isMe) {
                G.draw(function() {
                    //画site
                    siteImg =  G.tool.img.get('site_me.png');
                    G.ctx.drawImage(siteImg , 0 , 0 , 
                        siteImg.width , siteImg.height ,
                        285 + me.attackShake * 15 , 770 ,
                        siteImg.width , siteImg.height  )

                    //画血槽
                    bloodImg =  G.tool.img.get('blood_box.png');
                    G.ctx.drawImage(bloodImg , 0 , 0 , 
                        bloodImg.width , bloodImg.height ,
                        330, 820 ,
                        bloodImg.width , bloodImg.height  )
                    //写上血量
                    G.ctx.fillStyle="white";
                    G.ctx.textBaseline="middle";
                    G.ctx.textAlign="center";
                    G.ctx.font = "20px Georgia";
                    G.ctx.fillText(me.life, 345 , 835)
                    //士气槽
                    moralBoxImg = G.tool.img.get('moral_box.png');
                    moralImg = G.tool.img.get('moral.png');
                    moralEmtpyImg = G.tool.img.get('moral_empty.png');
                    G.ctx.drawImage(moralBoxImg , 0 , 0 , 
                        moralBoxImg.width , moralBoxImg.height ,
                        370 , 806 ,
                        moralBoxImg.width , moralBoxImg.height  )

                    var moralDist = 20
                    var moralX = 410
                    var moralY = 817
                    for(var i = 1 ; i <= 9 ;i++) {
                        moralX += moralDist 
                        var img = moralImg
                        if(i > me.moral) {
                            img =  moralEmtpyImg
                        }
                        G.ctx.drawImage(img , 0 , 0 , 
                            img.width , img.height ,
                            moralX , moralY ,
                            img.width , img.height  )
                    }

                    //牌库
                    var cardStoreImg = G.tool.img.get('card_store.png');
                    G.ctx.drawImage(cardStoreImg , 0 , 0 , 
                        cardStoreImg.width , cardStoreImg.height ,
                        610, 300 ,
                        cardStoreImg.width , cardStoreImg.height  )

                    var txt = me.life + ':' + me.moral + ':' + me.onTurn;
                    G.ctx.font = "20px Georgia";
                    G.ctx.fillText(txt , 100 , 200)
                });
            } else {
                G.draw(function() {
                    //画site
                    siteImg =  G.tool.img.get('site_enemy.png');
                    G.ctx.drawImage(siteImg , 0 , 0 , 
                        siteImg.width , siteImg.height ,
                        285 + me.attackShake * 15 , 120 ,
                        siteImg.width , siteImg.height  )
                    //画血槽
                    bloodImg =  G.tool.img.get('blood_box.png');
                    G.ctx.drawImage(bloodImg , 0 , 0 , 
                        bloodImg.width , bloodImg.height ,
                        330, 170 ,
                        bloodImg.width , bloodImg.height  )
                    //写上血量
                    G.ctx.fillStyle="white";
                    G.ctx.textBaseline="middle";
                    G.ctx.textAlign="center";
                    G.ctx.font = "20px Georgia";
                    G.ctx.fillText(me.life, 345 , 185)
                    //士气槽
                    moralBoxImg = G.tool.img.get('moral_box.png');
                    moralImg = G.tool.img.get('moral.png');
                    moralEmtpyImg = G.tool.img.get('moral_empty.png');
                    G.ctx.drawImage(moralBoxImg , 0 , 0 , 
                        moralBoxImg.width , moralBoxImg.height ,
                        370 , 120 ,
                        moralBoxImg.width , moralBoxImg.height  )
                    var moralDist = 20
                    var moralX = 410
                    var moralY = 131
                    for(var i = 1 ; i <= 9 ;i++) {
                        moralX += moralDist 
                        var img = moralImg
                        if(i > me.moral) {
                            img =  moralEmtpyImg
                        }
                        G.ctx.drawImage(img , 0 , 0 , 
                            img.width , img.height ,
                            moralX , moralY ,
                            img.width , img.height  )
                    }

                    //牌库
                    var cardStoreImg = G.tool.img.get('card_store.png');
                    G.ctx.drawImage(cardStoreImg , 0 , 0 , 
                        cardStoreImg.width , cardStoreImg.height ,
                        610, 574 ,
                        cardStoreImg.width , cardStoreImg.height  )

                    var txt = me.life + ':' + me.moral + ':' + me.onTurn;
                    G.ctx.font = "20px Georgia";
                    G.ctx.fillText(txt , 100 , 574)
                });
            }
        }

        me.delMoral = function(moral) {
            if(me.moral < moral) {
                Msg.msg.setMsg('士气不足')
                Msg.msg.fade()
                console.log('士气不足')
                return false;
            }

            return true
        }
        init()   
    }


    module.exports = BaseInfo;
})