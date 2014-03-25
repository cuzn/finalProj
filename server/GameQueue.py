#!/usr/bin/python  
#-*-coding:utf-8-*- 

from Game import Game

class GameQueue():
    """游戏列表"""
    def __init__(self):
        self.gameList = []
        self.tmpGame = Game(self)
        print 'init GameQueue'

    #client加入游戏
    def joinGame(self , client):
        self.tmpGame.addClient(client)
        client.log('wait for user')
        if self.tmpGame.isFull() :
            self.tmpGame.begin()
            #开始游戏
            self.gameList.append(self.tmpGame)
            self.tmpGame = Game(self) #新建临时游戏

    #结束游戏
    def delGame(self , game) : 
        try :
            self.gameList.remove(game)
        except :
            pass


    def newGame(self) :
        self.tmpGame = Game(self)

gameQueue = GameQueue()