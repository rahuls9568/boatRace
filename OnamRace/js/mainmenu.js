class mainmenu extends Phaser.Scene
{
    constructor()
    {
        super("mainmenu");
    }

    preload()
    {
        // sfxFlag = true;
        // musicFlag = true;
        this.s1Loaded = false;
        this.s2Loaded = false;

        this.scene.bringToTop();
        this.load.image("menubg", "images/bg1.png");
        this.load.image("playBtn","images/playBtn.png");
        this.load.image("insBtn","images/htpBtn.png");
        this.load.image("shopBtn","images/shopBtn.png");
        // this.load.image("settingBtn","images/settingBtn.png");
        this.load.image("atrBtn","images/atrBtn.png");
        this.load.image("gameName","images/gameName.png");
        this.load.image('MUSICOnImg','images/icon_sound_music.png');
        this.load.image('MUSICOffImg','images/icon_sound_music_off.png');
        this.load.image('apLogo','images/ap-logo.jpg');

        this.load.audio('rowbgm',['audio/Background sound.mp3','audio/Background sound.ogg']);
        this.load.audio('rowIns',['audio/Boat instructions.mp3','audio/Boat instructions.ogg']);

        
        // this.sound.decodeAudio([
        //     {key:'rowbgm',data:['audio/Background sound.mp3','audio/Background sound.ogg']},
        //     {key:'rowIns',data:['audio/Boat instructions.mp3','audio/Boat instructions.ogg']}
        // ]);
        // this.sound.on('decodedall');
    }

    create()
    {
        // this.sound.decodeAudio(['rowbgm','rowIns']);

        SCROLL_SPEED = config.height/160;
        TEXT_SIZE = config.height/16;
        CAR_MOVE_SPEED = config.width/106.667;
        var sound = this.sound.add('rowIns',{
            mute:false,
            volume:1,
            rate:1,
            seek:0,
            loop:true,
            delay:0
        });
        sound.play();
        sound.stop();
        sound = this.sound.add('rowbgm',{
            mute:false,
            volume:1,
            rate:1,
            seek:0,
            loop:true,
            delay:0
        });
        sound.play();
        sound.stop();
	  
    	console.log("SCROLL_SPEED " + SCROLL_SPEED + "\nCAR_MOVE_SPEED  " + CAR_MOVE_SPEED + "\nTEXT_SIZE " + TEXT_SIZE);
        var bg = this.add.image(config.width/2,config.height/2,'menubg').setOrigin(0.5);

        var logo = this.add.image(0,0,'apLogo').setOrigin(0.5,0);
        var gname = this.add.image(config.width/2,0,'gameName').setOrigin(0.5);
        var playBtn = this.add.image(config.width/2,0,'playBtn').setOrigin(0.5).setInteractive();
        var insBtn = this.add.image(config.width/2,0,'insBtn').setOrigin(0.5).setInteractive()//.setVisible(false);
        var settingBtn = this.add.image(config.width/2,0,'atrBtn').setOrigin(0.5).setInteractive();
        var shopBtn = this.add.image(config.width/2,0,'shopBtn').setOrigin(0.5).setInteractive();
		//this.carImage = this.add.image(config.width/2,config.height/2 - 50,currentCar.menukey).setOrigin(0.5);
        this.agrid = new AlignGrid({scene:this,rows:21,cols:11});

		
		playBtn.on("pointerdown",function(pointer){
            // if (game.cache.isSoundDecoded('rowbgm') && game.cache.isSoundDecoded('rowIns'))
            // {
            // }
            this.hideAllObjects([logo,gname,playBtn,insBtn,settingBtn,shopBtn,musicOnBtn,musicOffBtn])
            //if(!eventInit)
                game.scene.start("loading");
            //else
                //game.scene.start("gameplay")
            playBtn.removeListener("pointerdown");
            insBtn.removeListener("pointerdown");
            settingBtn.removeListener("pointerdown");
            shopBtn.removeListener("pointerdown");
        },this);
		settingBtn.on("pointerdown",function(pointer){
            game.scene.start("about");
            playBtn.removeListener("pointerdown");
            insBtn.removeListener("pointerdown");
            settingBtn.removeListener("pointerdown");
            shopBtn.removeListener("pointerdown");
        },this)
		insBtn.on("pointerdown",function(pointer){
            game.scene.start("instruction");
            playBtn.removeListener("pointerdown");
            insBtn.removeListener("pointerdown");
            settingBtn.removeListener("pointerdown");
            shopBtn.removeListener("pointerdown");
        },this)
        shopBtn.on("pointerdown",function(pointer){
            game.scene.start("shop");
            playBtn.removeListener("pointerdown");
            insBtn.removeListener("pointerdown");
            settingBtn.removeListener("pointerdown");
            shopBtn.removeListener("pointerdown");
        },this)
        
        var pos = this.agrid.getPosByIndex(5);
        logo.setPosition(pos.x,0);
        Align.scaleToGameH(logo,0.15,this);
        this.agrid.placeAtIndex(115,bg);
        Align.scaleToGameH(bg, 1, this);
        if(bg.displayWidth/config.width < 1)
        {
            bg.displayWidth = config.width*1.2;
            bg.displayHeight = config.height*1;
        }
        this.agrid.placeAtIndex(71,gname);
        Align.scaleToGameW(gname,0.8,this);
        this.agrid.placeAtIndex(115,playBtn)
        Align.scaleToGameH(playBtn,0.1,this)
        this.agrid.placeAtIndex(148,insBtn)
        Align.scaleToGameH(insBtn,0.075,this)
        this.agrid.placeAtIndex(181,settingBtn)
        Align.scaleToGameH(settingBtn,0.075,this)
        this.agrid.placeAtIndex(214,shopBtn)
        Align.scaleToGameH(shopBtn,0.08,this)

        var musicOnBtn = this.add.image(config.width,0,'MUSICOnImg').setOrigin(1,0).setInteractive();
        var musicOffBtn = this.add.image(config.width,0,'MUSICOffImg').setOrigin(1,0).setInteractive();
        musicOnBtn.on("pointerdown",function(pointer){
            musicOffBtn.setVisible(true);
            musicOnBtn.setVisible(false);
            musicFlag = false;
            this.sound.pauseAll();
        },this)
        musicOffBtn.on("pointerdown",function(pointer){
            musicOffBtn.setVisible(false);
            musicOnBtn.setVisible(true);
            musicFlag = true;
            this.sound.resumeAll();
        },this)
        //this.agrid.placeAtIndex(10,musicOnBtn);
        Align.scaleToGameH(musicOnBtn,0.075,this);
        //this.agrid.placeAtIndex(10,musicOffBtn);
        Align.scaleToGameH(musicOffBtn,0.075,this);

        if(musicFlag)
        {
            //console.log("music true");
            musicOnBtn.setVisible(true);
            musicOffBtn.setVisible(false);
        }
        else
        {
            // console.log("music false");
            musicOnBtn.setVisible(false);
            musicOffBtn.setVisible(true);
        }
	    
        //this.agrid.showNumbers();

    }
    
    hideAllObjects(array)
    {
        for(var i = 0; i < array.length; i++)
        {
            array[i].setVisible(false);
        }
    }
	
	
}
