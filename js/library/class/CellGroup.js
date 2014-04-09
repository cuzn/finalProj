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

        window.cellGroup = me
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

        me.getCell = function(cellInfo) {
            return me.cellList[cellInfo.row][cellInfo.col]
        }
        /**
         * 显示可以下棋子的格子
         * @return {[type]} [description]
         */
        me.setEnableChessCell = function(flag) {
            for(var col in me.cellList[4]) {
                var cell = me.cellList[4][col]
                if(!flag) {
                    cell.setBlink(flag)
                } else if(!cell.chess) {
                    cell.setBlink(flag)
                }
            }
        }

        me.getCellList = function() {
            var cellList = []
            for(var row in me.cellList){
                for(var col in  me.cellList[row]) {
                    cellList.push(me.cellList[row][col])
                }
            }
            return cellList
        }
        me.setAllEnable = function(flag , cellList) {
            cellList = cellList || me.getCellList()
            for(var i in cellList) {
                cellList[i].setBlink(flag)
            }
        }
        /**
         * 获取可以移动到的格子
         * @return {Array} Cell list
         */
        me.getEnableMoveCellList = function(cell , move) {
            var enableCellList = []
            for(var x = -move ;   x <= move;x ++) {
               for(var y = -move ; y <= move ; y ++) {
                    if(Math.abs(x) + Math.abs(y) > move ||
                        cell.row + x < 0|| cell.row + x > 4 ||
                        cell.col + y < 0 || cell.col + y > 4
                        ) {
                        continue;
                    }
                    var enableCell = me.cellList[cell.row + x][cell.col + y]
                    if(!enableCell.chess){
                        enableCellList.push(enableCell)
                    }
                }
            }
            return enableCellList
        }
    }

    module.exports = CellGroup;
})