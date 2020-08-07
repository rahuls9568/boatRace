class instruction extends Phaser.Scene
{
    constructor()
    {
        super("instruction");
    }

    // sfxFlag = true;
        // musicFlag = true;
    preload()
    {
        this.scene.bringToTop();
        this.load.image("menubg", "images/bg1.png");
        this.load.image("playBtn","images/playBtn.png");
        this.load.image('howToPlay','images/How.png');
        this.load.image('closeBtn','images/close.png');
        this.load.image('MUSICOnImg','images/icon_sound_music.png');
        this.load.image('MUSICOffImg','images/icon_sound_music_off.png');
    }

    create()
    {
        var bg = this.add.image(config.width/2,config.height/2,'menubg').setOrigin(0.5);
        
        var how = this.add.image(0,0,'howToPlay').setOrigin(0.5);
        var playBtn = this.add.image(config.width/2,0,'playBtn').setOrigin(0.5).setInteractive();
        var closeBtn = this.add.image(config.width/2,0,'closeBtn').setOrigin(0.5).setInteractive();

        this.agrid = new AlignGrid({scene:this,rows:21,cols:11});

		
		playBtn.on("pointerdown",function(pointer){
            game.scene.start("gameplay");
            playBtn.removeListener("pointerdown");
            closeBtn.removeListener("pointerdown");
        },this);
        closeBtn.on("pointerdown",function(pointer){
            game.scene.start("mainmenu");
            playBtn.removeListener("pointerdown");
            closeBtn.removeListener("pointerdown");
        },this);
        
        this.agrid.placeAtIndex(115,bg);
        Align.scaleToGameH(bg, 1, this);
        this.agrid.placeAtIndex(115,how);
        // Align.scaleToGameW(how,1,this);
        how.displayWidth = config.width*1.2;
        how.displayHeight = config.height*0.75;
        this.agrid.placeAtIndex(214,playBtn);
        Align.scaleToGameH(playBtn,0.1,this);
        this.agrid.placeAtIndex(65,closeBtn);
        Align.scaleToGameW(closeBtn,0.15,this);

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
}