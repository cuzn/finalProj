define(function(require, exports, module) {
  	console.log('load ImgConf')
    var img = {};
    img.pre = './img/';

    img.srcList = [
    	'1.jpg',
    	'2.jpg',
        'gameSence.jpg',
        'card/shanzei.png',
        'card/shanzei_s.png',
        'card/shanzei_b.png'
    ]

    //add the path pre
    for(var atr in img.srcList) {
    	img.srcList[atr] = img.pre + img.srcList[atr];
    }

    module.exports = img

})