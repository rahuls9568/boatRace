PauseEvent = function(){};
ResumeEvent = function(){};
document.addEventListener("focus", function() {
    //this is important as sometimes the system take a while
    //to get focus properly
    setTimeout(function() {
        ResumeEvent();
    }, 300);
});
//tell the game/app when the document loses the focus
document.addEventListener("blur", function() {
    PauseEvent();
});

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
    scene: [mainmenu, gameplay, gameover, instruction, settings, about, shop],
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
    audio: {
        disableWebAudio: true,
    },
};

var Boats = [{
    name : "redboat",
    deadPath:"images/RedBoat_7.png",
    playImg : "images/redboatSheet.png",
    deadKey:"redBoatdead",
    gamekey : "redboatImg",
    animkey:"redBoatRowing",
    frameDetails:{
        frameWidth:112.166,
        frameHeight:573
    },
    body:{
        type:'rectangle',
        width:50,
        height:450,
    }
},{
    name : "blueboat",
    deadPath:"images/BlueBoat_7.png",
    playImg : "images/blueboatSheet.png",
    deadKey:"blueBoatdead",
    gamekey : "blueboatImg",
    animkey:"blueBoatRowing",
    frameDetails:{
        frameWidth:111,
        frameHeight:572
    },
    body:{
        type:'rectangle',
        width:50,
        height:450,
    }
},{
    name : "orangeboat",
    deadPath:"images/OrangeBoat_7.png",
    playImg : "images/orangeboatSheet.png",
    deadKey:"orangeBoatdead",
    gamekey : "orangeboatImg",
    animkey:"orangeBoatRowing",
    frameDetails:{
        frameWidth:111.166,
        frameHeight:573
    },
    body:{
        type:'rectangle',
        width:50,
        height:450,
    }
},{
    name : "greenboat",
    deadPath:"images/GreenBoat_7.png",
    playImg : "images/greenboatSheet.png",
    deadKey:"greenBoatdead",
    gamekey : "greenboatImg",
    animkey:"greenBoatRowing",
    frameDetails:{
        frameWidth:110,
        frameHeight:572
    },
    body:{
        type:'rectangle',
        width:50,
        height:450,
    }
}]

var Crowd = [{
    name:"crowd1",
    playImg:"images/crowd1.png",
    gamekey:"crowd1Img",
    isFacingRight:false,
    origin:{x:0,y:0.5},
    scalePerc:0.2,
},{
    name:"crowd2",
    playImg:"images/crowd2.png",
    gamekey:"crowd2Img",
    isFacingRight:false,
    origin:{x:0,y:0.5},
    scalePerc:0.2,
},{
    name:"crowd3",
    playImg:"images/crowd3.png",
    gamekey:"crowd3Img",
    isFacingRight:true,
    origin:{x:1,y:0.5},
    scalePerc:0.2,
},{
    name:"crowd4",
    playImg:"images/crowd4.png",
    gamekey:"crowd4Img",
    isFacingRight:true,
    origin:{x:1,y:0.5},
    scalePerc:0.2,
},{
    name:"crowd5",
    playImg:"images/crowd5.png",
    gamekey:"crowd5Img",
    isFacingRight:null,
    origin:{x:0.5,y:0.5},
    scalePerc:0.2,
},{
    name:"crowd6",
    playImg:"images/crowd6.png",
    gamekey:"crowd6Img",
    isFacingRight:true,
    origin:{x:1,y:0.5},
    scalePerc:0.2,
},{
    name:"crowd7",
    playImg:"images/crowd7.png",
    gamekey:"crowd7Img",
    isFacingRight:false,
    origin:{x:0,y:0.5},
    scalePerc:0.1,
}]

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
}/*,{
    name:"obs7",
    imgPath :"images/obstacle7.png",
    gamekey:"obs7Img",
}*/,{
    name:"obs8",
    imgPath :"images/obstacle8.png",
    gamekey:"obs8Img",
},{
    name:"obs9",
    imgPath :"images/obstacle9.png",
    gamekey:"obs9Img",
}]

var CAR_MOVE_SPEED = 3, SCROLL_SPEED = 4;
var ENEMY_SPAWN_TIME = 3000;
var CURR_SPEED = 0;
var CURR_SPAWN_TIME = 0;
var isMoveRight = false, isMoveLeft = false;
var CURR_MOVE_SPEED = 0;
var TEXT_SIZE = 40;

var sfxFlag=true, musicFlag=true;
var currentBoat = Boats[0];
var scoreManager = new Score();
game = new Phaser.Game(config);