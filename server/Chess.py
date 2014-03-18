#!/usr/bin/python  
#-*-coding:utf-8-*- 
import conf

class Chess():
    """卡牌类"""
    def __init__(self, chessName):
        self.chessName = chessName
        self.moral = conf.card.getint(chessName , 'moral') #发动需要的士气
        self.life = conf.card.getint(chessName , 'life') #发动需要的士气
        self.attack = conf.card.getint(chessName , 'attack') #发动需要的士气
