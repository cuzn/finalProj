#!/usr/bin/python  
#-*-coding:utf-8-*- 
import random
import conf
from ClientHandler import ClientHandler
from Card import Card

class GameHandler(ClientHandler):
    """游戏处理类"""
    def __init__(self):
        ClientHandler.__init__(self)
        self.desc = 'GameHandler'
        self.life = 5 #生命值
        self.moral = 1 #士气值
        self.cardDict = {} #卡牌列表
        self.cardMaxNum = 6
        self.chessDict = {} #棋子列表
        self.cardSuffix = 0
        self.chessSuffix = 0
        self.onTurn = False#是否到你出手
        self.enemy = None
        self.game = None
        self.attack = 1
        self.isDied = False
        self.remainCardNum = 33

    def delLife(self , attack) :
        self.life -= attack 
        if self.life < 0 :
            self.life = 0
            self.isDied = True 

    def addCard(self , num = 1):
        cardList = conf.card.sections()
        addCardList = []
        for i in range(num) :
            if len(self.cardDict) >= self.cardMaxNum or self.remainCardNum == 0:
                break
            cardName = random.choice(cardList)
            cardIndex = self.genCardIndex()
            card = Card(cardName , cardIndex)
            self.cardDict[cardIndex] = card
            addCardList.append(card)
            self.remainCardNum -= 1
        return addCardList

    #处理的方法,重写，将操作传给Game对象处理
    #oper json对象
    def handle(self , oper) :
        if not self.onTurn:
            self.client.log('it is not your turn')
            return
        methodName = oper['type'] + 'Oper'
        method =  getattr(self.game , methodName , None)
        if method :
            method(oper , self)
        else :
            self.client.log('unknow oper')
    

    def changeTurn(self , round):
        if self.onTurn == True :
            self.onTurn = False
        else :
            #士气计算
            if round > 9 :
                self.moral = 9
            else :
                self.moral = round
            self.onTurn = True
            #棋子回复
            for index in self.chessDict:
                self.chessDict[index].reset()





    #开始游戏
    def begin(self) :
        msg = {
            'type' : 'begin',
        }
        myBaseInfo = self.getBaseInfo()
        myBaseInfo['cardDict'] = self.getCardDictInfo()
        enemyBaseInfo = self.enemy.getBaseInfo()

        msg['me']  = myBaseInfo
        msg['enemy'] = enemyBaseInfo

        self.client.sendJson(msg)

    def disconnect(self) :
        self.game.overForOneQuit(self)

    def getCardDictInfo(self) :
        cardDictInfo = {}
        for index in self.cardDict:
            cardDictInfo[index] ={
                'type' : self.cardDict[index].type,
                'name' : self.cardDict[index].name,
                'moral' : self.cardDict[index].moral,
                'attack' : self.cardDict[index].attack
            }
        return cardDictInfo

    def getBaseInfo(self) :
        info = {
            'life' : self.life,
            'moral' : self.moral,
            'cardNum' : len(self.cardDict),
            'chessNum' : len(self.chessDict),
            'onTurn' : self.onTurn,
            'attack' : self.attack,
            'isDied' : self.isDied,
            'remainCardNum' : self.remainCardNum
        }

        return info

    def win(self , type) :
        msg = {
            'type' : 'over',
            'result' : 'win',
            'reason' : ''
        }
        if type == 1 :
            msg['reason'] = 'quit'
        self.client.sendJson(msg)

    ###########################
    # 提供接口给敌人
    ###
    #############################
    # 公用
    ###
    def genCardIndex(self) :
        self.cardSuffix += 1
        return self.client.getIndex() + str(self.cardSuffix)

    def genChessIndex(self) :
        self.chessSuffix += 1
        return self.client.getIndex() + str(self.chessSuffix)

