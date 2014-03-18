#!/usr/bin/python  
#-*-coding:utf-8-*- 
import hashlib
import threading,random
import base64,struct
import json

class Client():
    """客户端的处理"""
    def __init__(self , socket , addr):
        self.ip , self.port = addr;
        self.socket = socket;
        self.isHand = False;
        self.path = '/'
        self.index = self.getIndex()
        self.gameUser = None

    def joinGame(self , gameUser):
        if self.gameUser :
            print 'error repeat gameUser'
        self.gameUser = gameUser

    def breakGame(self ):
        self.gameUser = None

    def send(self , msg):
        self.socket.send(self.parseSendData(msg));

    def sendJson(self , dict) :
        self.send(json.dump(dict))

    def recv(self , data):
        if not self.isHand :
            return self.hand(data);

        msg = self.parseRecvData(data)
        try :
            oper = json.loads(msg)
            print oper
            gameUser.handle(oper) 
        except Exception ,e :
            print e
        


    def getIndex(self):
        return self.ip + ':' + str(self.port)

    def hand(self , data):
        print 'hand with ' , self.ip , ':' ,self.port;
        if data.find('\r\n\r\n') != -1:
            headers = {}
            header, data = data.split('\r\n\r\n', 1)
            for line in header.split("\r\n")[1:]:
                key, value = line.split(": ", 1)
                headers[key] = value

            token = self.generateToken(headers["Sec-WebSocket-Key"])
            headers["Location"] = "ws://%s%s" %(headers["Host"], self.path)
            handshake = '\
HTTP/1.1 101 Web Socket Protocol Handshake\r\n\
Upgrade: WebSocket\r\n\
Connection: Upgrade\r\n\
Sec-WebSocket-Accept:%s\r\n\
Sec-WebSocket-Origin: %s\r\n\
Sec-WebSocket-Location: %s\r\n\r\n\
' %(token , headers['Origin'], headers['Location']);
            print handshake
            self.socket.send(handshake)
            self.isHand = True
            return True
        else :
            print '错误的head'



    def generateToken(self, key):
        sha1 = hashlib.sha1()
        sha1.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
        sha1Res = sha1.digest();
        return base64.b64encode(sha1Res)



    def parseRecvData(self , data) :
        code_length = ord(data[1]) & 127
        if code_length == 126:
            masks = data[4:8]
            data = data[8:]
        elif code_length == 127:
            masks = data[10:14]
            data = data[14:]
        else:
            masks = data[2:6]
            data = data[6:]
        
        raw_str = ""
        i = 0
        for d in data:
            raw_str += chr(ord(d) ^ ord(masks[i%4]))
            i += 1
            
        return raw_str


    def parseSendData(self , data) :
        if(data == False):
            return False
        else:
            data = str(data)
            
        token = "\x81"
        length = len(data)
        if length < 126:
            token += struct.pack("B", length)
        elif length <= 0xFFFF:
            token += struct.pack("!BH", 126, length)
        else:
            token += struct.pack("!BQ", 127, length)
        data = '%s%s' % (token,data)

        
        return data
  
        

