#!/usr/bin/python  
#-*-coding:utf-8-*- 

from ClientHandler import ClientHandler
from GameQueue import gameQueue

class MenuHandler(ClientHandler):
    """用户在等待界面还有menu界面的处理类"""
    def __init__(self):
        ClientHandler.__init__(self)
        self.desc = 'MenuHandler'


    def joinGameOper(self , oper):
        gameQueue.joinGame(self.client)
