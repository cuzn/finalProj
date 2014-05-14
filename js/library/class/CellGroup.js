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
            console.log('sdf')
            var enableCellList = []
            if(move == 0) {
                return enableCellList
            }
            
            var checkCellList = [
                me.getCellByRC(cell.row + 1 , cell.col),
                me.getCellByRC(cell.row - 1 , cell.col),
                me.getCellByRC(cell.row  , cell.col + 1),
                me.getCellByRC(cell.row  , cell.col - 1),
            ]

            for(var i in checkCellList) {
                //有这个格子，而且格子没有棋子
                if(checkCellList[i] && !checkCellList[i].chess) {
                    //检测下一步可以走的
                    enableCellList = enableCellList
                        .concat(me.getEnableMoveCellList(checkCellList[i] , move-1))
                        .concat([checkCellList[i]])
                }
            }

            return me.uniqueCellList(enableCellList) 
        }

        me.getCellByRC = function(row , col) {
            return me.cellList[row] && me.cellList[row][col] 
        }

        me.uniqueCellList = function(cellList) {
            var hashArray = []
            var retArr = []

            for(var i in cellList) {
                var index = cellList[i].row * 10 + cellList[i].col
                if(!hashArray[index]) {
                    retArr.push(cellList[i])
                    hashArray[index] = true
                }
            }

            return retArr
        }
    }

    module.exports = CellGroup;
})