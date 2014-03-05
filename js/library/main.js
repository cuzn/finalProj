define(function(require, exports, module) {
    var imgTool = require('tool/img');
    var conf = require('conf/conf')
    var eventTool = require('tool/event');
    var screenTool = require('tool/screen')
    var G = require('global');
    var LoadSence = require('class/sence/LoadSence');

    var main = {}
    main.init = function() {
        var funcList = [
            this.adjustScreen,
            this.initScence,
            this.initEvent,
            this.loadImg,
            this.loadSound,
            this.runGame,
        ];
        console.log('event order exec');
        eventTool.execByOrder(funcList)
        
    }

    //not finish
    main.adjustScreen = function(funcList) {
        console.log('adjustScreen')
        eventTool.execByOrder(funcList)
    }


    main.initScence = function(funcList) {
        var dom = document.getElementById('gameCont');
        G.c = dom;
        G.ctx = dom.getContext("2d");
        G.sence = new LoadSence();
        console.log('initScence')
        eventTool.execByOrder(funcList)
    }

    main.initEvent = function(funcList) {
        document.addEventListener('touchstart' , function(e){
            console.log('touchStart')
            e.preventDefault();
            if(G.sence.touchstart)
                G.sence.touchstart(e);
        });

        document.addEventListener('touchmove' , function(e){
            e.preventDefault();
            if(G.sence.touchmove)
                G.sence.touchmove(e);
        });

        document.addEventListener('touchend' , function(e){
            console.log('touchEnd')
            e.preventDefault();
            if(G.sence.touchend)
                G.sence.touchend(e);
        });
        eventTool.execByOrder(funcList)
    }

    main.loadImg = function(funcList) {
        console.log('load img')
        var imgSrcList = conf.img.srcList;
        var allNum = imgSrcList.length;
        var loadNum = 0;
        G.sence.setText('begin to load images:'+  loadNum+ '/' + allNum);

        var oneDoneFunc = function() {
            loadNum ++;
            G.sence.setText('begin to load images:'+  loadNum+ '/' + allNum);
            //load done
            if(loadNum >= allNum) {
               eventTool.execByOrder(funcList)
            }
        }
        imgTool.loadImg(imgSrcList , oneDoneFunc)


    }

    main.loadSound = function(funcList) {
        G.sence.setText('begin to load sounds');
        console.log('loadSound');

        G.sence.setText('all done , begin fight');
        G.sence.status = 'load done'
        eventTool.execByOrder(funcList)
    }

    main.runGame = function () {
        G.ctx.fillRect(0 , 0 , G.c.width ,G.c.height)
        
        G.sence.draw();
        setTimeout(main.runGame, 30);
    }
    
    module.exports = main
})