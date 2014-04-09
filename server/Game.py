#!/usr/bin/python  
#-*-coding:utf-8-*- 
from GameHandler import GameHandler

class Game():
    """游戏的控制类"""
    def __init__(self , queue):
        print 'new Game'
        self.gameHandlerList = []
        self.gameQueue = queue
        self.round = 1
        self.step = 0

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


    def formUserInfo(self , user , msg) :
        diffUser = self.getDiffUser(user)
        msg['me'] = user.getBaseInfo()
        msg['enemy'] = diffUser.getBaseInfo()


    def sendMsg(self , user , msg):
        self.formUserInfo(user , msg)
        user.client.sendJson(msg)


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
        self.gameHandlerList[0].client.setHandler(None)
        self.gameHandlerList[1].client.setHandler(None)
        self.gameQueue.delGame(self)


    def transformCell(self , cell) :
        return {
            'row' : 4 - cell['row'],
            'col' : 4 - cell['col']
        }

    def endTurnOper(self , oper , user) :
        self.step += 1
        self.round = self.step / 2 + 1
        diffUser = self.getDiffUser(user)
        user.changeTurn(self.round)
        diffUser.changeTurn(self.round)
        
        msg = {
            'type' : 'endTurn'
        }
        self.sendMsg(user , msg)
        #要加卡片
        cardList = diffUser.addCard()
        if len(cardList) == 0 : #卡牌已经满了
            msg['card'] = False
        else :
            msg['card'] = cardList[0].getInfo()
        self.sendMsg(diffUser , msg)

    def addCardOper(self , oper , user) :
        diffUser = self.getDiffUser(user)
        card = user.cardDict[oper['cardIndex']]
        del user.cardDict[oper['cardIndex']]
        chess = card.getChess()
        user.chessDict[chess.index] = chess
        user.moral = user.moral - card.moral
        msg = {
            'type' : 'addChess',
            'chess' : chess.getInfo()
        }

        msg['cell'] = oper['cell']

        self.sendMsg(user , msg)
        msg['cell'] = self.transformCell(oper['cell'])
        self.sendMsg(diffUser , msg)

    def moveChessOper(self , oper , user) :
        diffUser = self.getDiffUser(user)
        chess = user.chessDict[oper['chessIndex']]
        user.moral -= 1

        msg = {
            'type' : 'moveChess',
            'chess' : chess.getInfo(),
        }

        msg['cell'] = oper['cell']

        self.sendMsg(user , msg)
        msg['cell'] = self.transformCell(oper['cell'])
        self.sendMsg(diffUser , msg)

    def chessAttackOper(self , oper , user) :
        diffUser = self.getDiffUser(user)
        chess1 = user.chessDict[oper['chesses'][0]]
        chess2 = diffUser.chessDict[oper['chesses'][1]]

        chess1.attackChess(chess2)
        if chess1.isDied :
            del user.chessDict[chess1.index]
            print chess1.index , ' died'
        if chess2.isDied :
            del diffUser.chessDict[chess2.index]
            print chess2.index , ' died'
        msg = {
            'type' : 'chessAttack',
            'chesses' : [
                chess1.getInfo(),
                chess2.getInfo()
            ]
        }

        self.sendMsg(user , msg)
        self.sendMsg(diffUser , msg)


    def attackWallOper(self , oper, user) :
        print oper
        diffUser = self.getDiffUser(user)
        chess = user.chessDict[oper['chessIndex']]

        chess.attackWall(diffUser)
        if diffUser.isDied :
            self.over()

        msg = {
            'type' : 'attackWall',
            'chess' : chess.getInfo()
        }
        self.sendMsg(user , msg)
        self.sendMsg(diffUser , msg)

