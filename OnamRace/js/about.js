class about extends Phaser.Scene
{
    constructor()
    {
        super("about");
    }

    preload()
    {
        this.scene.bringToTop();
        this.load.image("menubg", "images/bg1.png");
        this.load.image("playBtn","images/playBtn.png");
        this.load.image('about','images/About.png')
        this.load.image('closeBtn','images/close.png');
    }

    create()
    {
        var bg = this.add.image(config.width/2,config.height/2,'menubg').setOrigin(0.5);
        
        var how = this.add.image(0,0,'about').setOrigin(0.5);
        var playBtn = this.add.image(config.width/2,0,'playBtn').setOrigin(0.5).setInteractive();
        var closeBtn = this.add.image(config.width/2,0,'closeBtn').setOrigin(0.5).setInteractive();
        
        this.agrid = new AlignGrid({scene:this,rows:21,cols:11});
        
        closeBtn.on("pointerdown",function(pointer){
            game.scene.start("mainmenu");
            playBtn.removeListener("pointerdown");
            closeBtn.removeListener("pointerdown");
        },this);
        playBtn.on("pointerdown",function(pointer){
            game.scene.start("gameplay");
            playBtn.removeListener("pointerdown");
            closeBtn.removeListener("pointerdown");
        },this);
        
        this.agrid.placeAtIndex(115,bg);
        Align.scaleToGameH(bg, 1, this);
        this.agrid.placeAtIndex(115,how);
        // Align.scaleToGameW(how,1,this);
        how.displayWidth = config.width*1.2;
        how.displayHeight = config.height*0.75;
        this.agrid.placeAtIndex(214,playBtn)
        Align.scaleToGameH(playBtn,0.1,this)
        this.agrid.placeAtIndex(65,closeBtn);
        Align.scaleToGameW(closeBtn,0.15,this);
	    
        //this.agrid.showNumbers();

	}
}