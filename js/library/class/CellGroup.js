/**
 * 文件描述
 */
define(function(require, exports, module) {
  	console.log('load screenTool')
    var G = require('global');
    var Cell = require('class/obj/Cell')

    var CellGroup = function() {
    	var me = this;
    	me.size = {row : 5 , col : 5}
    	me.cellList = [];


    	me.initCell = function() {
    		for(var row = 0 ; row < me.size.row ; row++) {
    			me.cellList[row] = [];
    			for(var col = 0 ; col < me.size.col ; col++) {
    				var cell = new Cell(row , col);
    				me.cellList[row][col] = cell;
    				G.sence.addObj(4,cell);
    			}
    		}
    	}


    }

    module.exports = CellGroup;
})