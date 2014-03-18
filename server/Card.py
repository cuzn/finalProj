#!/usr/bin/python  
#-*-coding:utf-8-*- 
import conf

class Card():
    """卡牌类"""
    def __init__(self, cardName):
        self.name = cardName
        self.moral = conf.card.getint(cardName , 'moral') #发动需要的士气