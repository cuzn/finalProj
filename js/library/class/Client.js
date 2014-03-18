/**
 * 用于与服务器交流
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    var G = require('global');

    var Client = function() {
    	var me = this;

        window.client = me;
    	me.socket = null;
    	me.conn = function() {
    		try {
			    me.socket = new WebSocket(G.conf.server.host);
			    me.socket.onopen = function(msg){ 
                    console.log(msg);
                };
			    me.socket.onmessage = function(msg){ 
                    console.log(msg); 
                };
			    me.socket.onclose   = function(msg){ 
                    console.log("Lose Connection!"); 
                };
			 }catch(ex) { 
			 	console.log(ex); 
			 }
    	}

    }

    module.exports = Client;
})