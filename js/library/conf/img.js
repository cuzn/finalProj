define(function(require, exports, module) {
  	console.log('load ImgConf')
    var img = {};
    img.pre = './img/';

    img.srcList = [
    	'1.jpg',
    	'2.jpg',
        'gameSence.jpg',
        'site_me.png',
        'site_enemy.png',
        'blood_box.png',
        'moral_box.png',
        'moral.png',
        'moral_empty.png',
        'card_store.png',
        'end_turn.png',
        'chess_enemy_border.png',
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
        'card/7.png',
        'card/8_b.png',
        'card/8.png',
        'card/9_b.png',
        'card/9.png',
        'card/10_b.png',
        'card/10.png',
        'card/11_b.png',
        'card/11.png',
        'card/12_b.png',
        'card/12.png',
        'card/13_b.png',
        'card/13.png',
        'card/14_b.png',
        'card/14.png',
        'card/15_b.png',
        'card/15.png',
        'card/16_b.png',
        'card/16.png',
        'card/17_b.png',
        'card/17.png',
        'card/18_b.png',
        'card/18.png',
        'card/19_b.png',
        'card/19.png',
        'card/20_b.png',
        'card/20.png',
        'card/11/enemy.png',
        'card/11/able.png',
        'card/11/normal.png',
        'card/12/enemy.png',
        'card/12/able.png',
        'card/12/normal.png',
        'card/21/enemy.png',
        'card/21/able.png',
        'card/21/normal.png',
        'card/22/enemy.png',
        'card/22/able.png',
        'card/22/normal.png',
        'card/attack.png',
        'card/blood.png',
    ]

    //add the path pre
    for(var atr in img.srcList) {
    	img.srcList[atr] = img.pre + img.srcList[atr];
    }

    module.exports = img

})