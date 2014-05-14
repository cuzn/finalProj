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
        self.isDied = False
        self.attackType = card.attackType
        self.attackCount = 1


    def getInfo(self) :
        return {
            'name' : self.name,
            'moral' : self.moral,
            'life' : self.life,
            'attack' : self.attack,
            'index' : self.index, 
            'move': self.move,
            'isDied' : self.isDied,
            'attackType' : self.attackType
        }
    
    def attackChess(self , chess):
        if self.attackType == 1 and chess.attackType ==1:
            chess.delLife(self.attack)
            self.delLife(chess.attack)
        elif self.attackType == 1 and chess.attackType ==2:
            chess.delLife(self.attack)
            self.delLife(1)
        elif self.attackType == 2 and chess.attackType ==1:
            chess.delLife(self.attack)
            self.delLife(0)
        elif self.attackType == 2 and chess.attackType ==2:
            chess.delLife(self.attack)
            self.delLife(chess.attack)

        self.attackCount += 1
        

    def delLife(self , attack) :
        self.life -= attack 
        if self.life <= 0 :
            self.life = 0
            self.isDied = True 

    def attackWall(self , user) :
        self.delLife(user.attack)
        user.delLife(self.attack)
        self.attackCount += 1

    def reset(self) :
        self.attackCount = 1

