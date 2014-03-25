#!/usr/bin/python  
#-*-coding:utf-8-*- 
from GameHandler import GameHandler

class Game():
    """游戏的控制类"""
    def __init__(self , queue):
        print 'new Game'
        self.gameHandlerList = []
        self.gameQueue = queue

    def addClient(self,client):
        if len(self.gameHandlerList) >= 2:
            return False

        client.log('join game')
        gameHandler  = GameHandler()
        client.setHandler(gameHandler)
        gameHandler.game = self
        self.gameHandlerList.append(gameHandler)
        return True

    def delClient(self):
        self.gameHandlerList = []


    def begin(self):
        self.gameHandlerList[0].enemy = self.gameHandlerList[1]
        self.gameHandlerList[0].onTurn = True
        self.gameHandlerList[1].enemy = self.gameHandlerList[0]
        self.gameHandlerList[1].onTurn = False

        self.gameHandlerList[0].begin()
        self.gameHandlerList[1].begin()

    def isFull(self ):
        return len(self.gameHandlerList) >= 2

    def getDiffUser(self , user) :
        if self.gameHandlerList[0] is user :
            return self.gameHandlerList[1]
        else :
            return self.gameHandlerList[0]

    def overForOneQuit(self , quitUser) :
        if(self.isFull()) : 
            winUser = self.getDiffUser(quitUser)
            winUser.win(1)
            self.over()
        else :
            self.gameQueue.newGame()

    def over(self) :
        self.gameQueue.delGame(self)


    def transformCell(self , cell) :
        return {
            'row' : 4 - cell['row'],
            'col' : 4 - cell['col']
        }

    def addCardOper(self , oper , user) :
        diffUser = self.getDiffUser(user)
        card = user.cardDict[oper['cardIndex']]
        del user.cardDict[oper['cardIndex']]
        chess = card.getChess()

        msg = {
            'type' : 'addChess',
            'chess' : chess.getInfo()
        }

        msg['cell'] = oper['cell']

        user.client.sendJson(msg)
        msg['cell'] = self.transformCell(oper['cell'])
        diffUser.client.sendJson(msg)

