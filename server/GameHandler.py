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
        self.life = 30 #生命值
        self.moral = 1 #士气值
        self.cardDict = {} #卡牌列表
        self.chessDict = {} #棋子列表
        self.cardSuffix = 0
        self.chessSuffix = 0
        self.onTurn = False#是否到你出手
        self.enemy = None
        self.game = None


    def addCard(self , num = 1):
        cardList = conf.card.sections()
        for i in range(num) :
            cardName = random.choice(cardList)
            cardIndex = self.genCardIndex()
            card = Card(cardName , cardIndex)
            self.cardDict[cardIndex] = card
    

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

    #开始游戏
    def begin(self) :
        self.addCard(3)
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
            'onTurn' : self.onTurn
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

