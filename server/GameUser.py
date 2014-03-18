#!/usr/bin/python  
#-*-coding:utf-8-*- 
import random
import conf

class GameUser():
    """游戏用户类"""
    def __init__(self, client , turn):
        self.client = client
        self.life = 30 #生命值
        self.moral = 1 #士气值
        self.cardDict = {} #卡牌列表
        self.chessDict = {} #棋子列表
        self.cardSuffix = 0
        self.chessSuffix = 0
        self.onTurn = turn #是否到你出手
        client.joinGame(self)
        self.addCard(3)


    """处理返回的json"""
    def handle(self , json) :
        pass

    def addCard(self , num = 1):
        cardList = conf.card.sections()
        for i in range(num) :
            cardName = random.choice(cardList)
            card = Card(cardName)
            self.cardDict[self.genCardIndex()] = card
    
    def changeTurn() :
        pass



    def begin(self , turn) :
        msg = {
            'type' : 'begin',
            'turn' : turn,
            'cardList' : [],
        }
        for index in self.cardDict:
            msg['cardList'].append({
                'index' : index,
                'name' : self.cardDict[index].name
                })
        self.client.sendJson(msg)

    def genCardIndex(self) :
        self.cardSuffix ++
        return self.client.getIndex() + str(cardSuffix)

    def genChessIndex(self) :
        self.chessSuffix ++
        return self.client.getIndex() + str(chessSuffix)

    def useCard(self , index) :
        pass
