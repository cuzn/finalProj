/**
 * 文件描述
 */
define(function(require, exports, module) {
    console.log('load screenTool')
    var G = require('global');

    /**
     * A simple timer
     */
    var Timer = function( duration , func) {
        var me  = this

        me.duration = duration || 1000
        me.runFunc = func || function() {}
        me.runTime = 0
        me.startDate = new Date();
        me.nowDate = null


        me.setDuration = function(ms) {
            me.duration = ms
        }

        me.setFunc = function(func) {
            me.runFunc = func
        }


        me.run = function() {
            var startMS = me.
            me.runFunc()
        }

        me.update = function() {
            var d = new Date();
            me.date = d;
        }
            
        me.getMS = function() {
            return me.date.getTime();
        }
            
        me.getS = function() {
            return Math.round(me.date.getTime() / 1000);
        }

    }


    

    module.exports = 
})