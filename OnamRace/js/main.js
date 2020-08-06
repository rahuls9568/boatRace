var config;
var game;
var isCenterable = true;
var isMobile = navigator.userAgent.indexOf("Mobile");
if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
}
var w = 320;
var h = 640;
if (isMobile != -1) {
    isCenterable = false;
    w = window.innerWidth;
    h = window.innerHeight;
}
var config = {
    type: Phaser.AUTO,
    width: w,
    height: h,
    parent: 'phaser-game',
    scene: [mainmenu, gameplay, gameover, instruction, settings],
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scale: {
        parent: 'phaser-game',
        autoCenter: isCenterable?Phaser.Scale.CENTER_BOTH:Phaser.Scale.NO_CENTER,
        width: w,
        height: h
    },
};

var Boats = [{
    name : "redboat",
    playImg : "images/redboatSheet.png",
    gamekey : "redboatImg",
    animkey:"redBoatRowing",
    frameDetails:{
        frameWidth:112.166,
        frameHeight:573
    }
},{
    name : "blueboat",
    playImg : "images/blueboatSheet.png",
    gamekey : "blueboatImg",
    animkey:"blueBoatRowing",
    frameDetails:{
        frameWidth:111,
        frameHeight:572
    }
},{
    name : "orangeboat",
    playImg : "images/orangeboatSheet.png",
    gamekey : "orangeboatImg",
    animkey:"orangeBoatRowing",
    frameDetails:{
        frameWidth:111.166,
        frameHeight:573
    }
},{
    name : "greenboat",
    playImg : "images/greenboatSheet.png",
    gamekey : "greenboatImg",
    animkey:"greenBoatRowing",
    frameDetails:{
        frameWidth:110,
        frameHeight:572
    }
}]

var Crowd = [{
    name:"crowd1",
    playImg:"images/crowd1.png",
    gamekey:"crowd1Img",
    isFacingRight:false,
    origin:{x:0,y:0.5},
},{
    name:"crowd2",
    playImg:"images/crowd2.png",
    gamekey:"crowd2Img",
    isFacingRight:false,
    origin:{x:0,y:0.5},
},{
    name:"crowd3",
    playImg:"images/crowd3.png",
    gamekey:"crowd3Img",
    isFacingRight:true,
    origin:{x:1,y:0.5},
},{
    name:"crowd4",
    playImg:"images/crowd4.png",
    gamekey:"crowd4Img",
    isFacingRight:true,
    origin:{x:1,y:0.5},
},]

var Obstacles = [{
    name:"obs1",
    imgPath :"images/obstacle1.png",
    gamekey:"obs1Img",
},{
    name:"obs2",
    imgPath :"images/obstacle2.png",
    gamekey:"obs2Img",
},{
    name:"obs3",
    imgPath :"images/obstacle3.png",
    gamekey:"obs3Img",
},{
    name:"obs4",
    imgPath :"images/obstacle4.png",
    gamekey:"obs4Img",
},{
    name:"obs5",
    imgPath :"images/obstacle5.png",
    gamekey:"obs5Img",
},{
    name:"obs6",
    imgPath :"images/obstacle6.png",
    gamekey:"obs6Img",
},{
    name:"7",
    imgPath :"images/obstacle7.png",
    gamekey:"obs7Img",
},{
    name:"obs8",
    imgPath :"images/obstacle8.png",
    gamekey:"obs8Img",
},{
    name:"obs9",
    imgPath :"images/obstacle9.png",
    gamekey:"obs9Img",
}]

var sfxFlag=true, musicFlag=true;
var currentBoat = Boats[0];
var scoreManager = new Score();
game = new Phaser.Game(config);