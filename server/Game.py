#!/usr/bin/python  
#-*-coding:utf-8-*- 
import GameUser
class Game():
    """游戏的控制类"""
    def __init__(self, client1 , client2):
        self.userList = []
        self.userList.append(GameUser(client1 , True))#先手
        self.userList.append(GameUser(client2 , False)) #后手

    def over(self , winer) :
        self.user1.




