define(function(require, exports, module) {
  	console.log('load ImgConf')
    var img = {};
    img.pre = './img/';

    img.srcList = [
    	'1.jpg',
    	'2.jpg',
        'gameSence.jpg',
        'card/shanzei_b.png',
        'card/shanzei.png',
        'card/1_b.png',
        'card/1.png',
        'card/2_b.png',
        'card/2.png',
        'card/3_b.png',
        'card/3.png',
        'card/4_b.png',
        'card/4.png',
        'card/5_b.png',
        'card/5.png',
        'card/6_b.png',
        'card/6.png',
        'card/7_b.png',
        'card/7.png'
    ]

    //add the path pre
    for(var atr in img.srcList) {
    	img.srcList[atr] = img.pre + img.srcList[atr];
    }

    module.exports = img

})