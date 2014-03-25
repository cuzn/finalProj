#!/usr/bin/python  
#-*-coding:utf-8-*- 
import ConfigParser

#server的配置
configFile = "./conf/server.ini"
config = ConfigParser.ConfigParser()
config.readfp(open(configFile , "rb"));

#卡牌的配置
card = ConfigParser.ConfigParser()
card.readfp(open('conf/card.ini' , "rb"));
