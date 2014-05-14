define(function(require, exports, module) {
    console.log('load SoundConf')
    var sound = {};
    sound.pre = './sound/';

    sound.srcList = [
        //'sword.mp3',
        //'arrow.mp3',
        //'wall.mp3',
        //'alert.mp3',
        //'pu.mp3',
        //'time.mp3', 
        //'fade.mp3',
    ]

    //add the path pre
    for(var atr in sound.srcList) {
        sound.srcList[atr] = sound.pre + sound.srcList[atr];
    }

    module.exports = sound

})