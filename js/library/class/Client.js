/**
 * 用于与服务器交流
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    var G = require('global');
    var Msg = require('class/obj/Message')

    var Client = function() {
    	var me = this;

        window.client = me;
    	me.socket = null;
    	me.conn = function() {
            var msg = new Msg('链接中……')
            msg.show(function() {} , function() {})
    		try {
			    me.socket = new WebSocket(G.conf.server.host);
			    me.socket.onopen = function(data){
                    msg.hide()
                    console.log('conn build')
                    me.send({type:'joinGame'})
                };
			    me.socket.onmessage = function(msg){
                    console.log('recv:' + msg.data)
                    var oper = JSON.parse(msg.data)
                    if(G.sence.oper) {
                        G.sence.oper(oper)
                    }else if(G.sence[oper.type + 'Oper']) {
                        console.log('fuck')
                        G.sence[oper.type + 'Oper'](oper)
                    }
                };
			    me.socket.onclose   = function(){ 
                    console.log("Lose Connection!");
                    msg.hide()
                    msg = new Msg('失去连接,重新连接？')
                    msg.show(function() {
                        location.reload() 
                        msg.hide()
                    })
                };
			 }catch(ex) { 
			 	console.log(ex); 
			 }
    	}

        me.send = function(obj){
            var msg = JSON.stringify(obj)
            console.log('send:' +msg)
            me.socket.send(msg)
        }

    }

    module.exports = Client;
})