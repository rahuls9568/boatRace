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
        this.load.image("insBtn","images/instBtn.png");
        this.load.image("settingBtn","images/settingBtn.png");
        this.load.image("gameName","images/gameName.png");
    }

    create()
    {
        var bg = this.add.image(config.width/2,config.height/2,'menubg').setOrigin(0.5);
        
        
        var playBtn = this.add.image(config.width/2,0,'playBtn').setOrigin(0.5).setInteractive();

        this.agrid = new AlignGrid({scene:this,rows:21,cols:11});

		
		playBtn.on("pointerdown",function(pointer){
            game.scene.start("gameplay");
            playBtn.removeListener("pointerdown");
        },this);
        
        this.agrid.placeAtIndex(115,bg);
        Align.scaleToGameH(bg, 1, this);
        this.agrid.placeAtIndex(214,playBtn)
        Align.scaleToGameH(playBtn,0.1,this)
	    
        //this.agrid.showNumbers();

	}
}