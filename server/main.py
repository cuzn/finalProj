#!/usr/bin/python  
#-*-coding:utf-8-*- 
import socket , select , ConfigParser , string, sys , time
from Client import Client
from conf import config
from MenuHandler import MenuHandler

class main():
    """"采用了select模型，单进程，单线程"""
    def __init__(self):
        self.host = config.get('server','ip')
        self.port = string.atoi(config.get('server' , 'port'))
        self.server = socket.socket()
        self.server.bind((self.host , self.port))
        self.server.listen(5)
        self.inputs = [self.server]
        self.clientList = {}

    def run(self) :
        while True :
            #采用select模型
            #rs : 就绪读
            #ws : 就绪写
            #es : 就绪的错误信息
            rs , ws ,es = select.select(self.inputs , [] ,[])
            for r in rs : 
                if r is self.server:
                    conn , addr = self.server.accept()
                    print 'get conn from ' , addr
                    client = Client(conn , addr)
                    self.clientList[self.getIndex(addr)] = client
                    menuHandler = MenuHandler()
                    client.setHandler(menuHandler)
                    self.inputs.append(conn)
                else :
                    try :
                        clientIndex = self.getIndex(r.getpeername())
                        client = self.clientList[clientIndex]
                        if not client:
                            print 'error , can not find the client :' ,clientIndex
                        data = r.recv(2048)
                        disconnected = False
                        if not data :
                            disconnected = True
                        else :
                            client.recv(data)

                    except Exception ,e:
                        print e
                        disconnected = True

                    if disconnected:
                        print r.getpeername() , 'disconnected'
                        client = self.clientList[self.getIndex(r.getpeername())] 
                        client.disconnect()
                        del self.clientList[self.getIndex(r.getpeername())] 
                        self.inputs.remove(r)


    def getIndex(self , addr):
        return addr[0] + ':' + str(addr[1])

    



if __name__ == "__main__":
    #sys.stdout = open(time.strftime('%Y-%m-%d_%H', time.localtime()) , 'a')
    main = main()
    main.run()
