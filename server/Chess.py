#!/usr/bin/python  
#-*-coding:utf-8-*- 
import conf

class Chess():
    """卡牌类"""
    def __init__(self, card):
        self.name = card.name
        self.moral = card.moral
        self.life = card.life
        self.attack = card.attack
        self.index = card.index
        self.move = card.move

    def getInfo(self) :
        return {
            'name' : self.name,
            'moral' : self.moral,
            'life' : self.life,
            'attack' : self.attack,
            'index' : self.index，
            'move': self.move
        }
    
    