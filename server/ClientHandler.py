#!/usr/bin/python  
#-*-coding:utf-8-*- 

class ClientHandler():
    """用于处理client的数据的类，一般通过继承扩展"""
    def __init__(self ):
        self.desc = None #用于标记处理类的描述
        self.client = None 

    #处理的方法,用于客户端调用方法
    #oper json对象
    def handle(self , oper) :
        methodName = oper['type'] + 'Oper'
        method =  getattr(self , methodName , None)
        if method :
            method(oper)
        else :
            self.client.log('unknow oper');

    def setClient(self , client) :
        self.client = client