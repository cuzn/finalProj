#!/usr/bin/python  
#-*-coding:utf-8-*- 
import conf
from Chess import Chess
class Card():
    """卡牌类"""
    def __init__(self, cardName , index):
        self.name = cardName
        self.moral = conf.card.getint(cardName , 'moral') #发动需要的士气
        self.life = conf.card.getint(cardName , 'life') #生命值
        self.attack = conf.card.getint(cardName , 'attack') #攻击值
        self.type = conf.card.getint(cardName , 'type') #类型
        self.move = conf.card.getint(cardName , 'move')#可移动距离
        self.index = index
    
    def getChess(self) :
        return Chess(self)