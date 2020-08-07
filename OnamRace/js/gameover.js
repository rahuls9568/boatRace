class gameover extends Phaser.Scene
{
    constructor()
    {
        super("gameover");
    }

    preload()
    {
        this.scene.bringToTop();
        this.load.image('GOBG','images/bg1.png');
        this.load.image('GOmessage','images/gameOver.png');
        this.load.image("GOMenuBtn",'images/playBtn.png');
        //this.load.image('GOpanel','images/panel.png');
    }

    create()
    {
        
        var bg = this.add.image(config.width/2,config.height/2,"GOBG").setOrigin(0.5);
        var menubtn = this.add.image(config.width/2,0,'GOMenuBtn').setOrigin(0.5).setInteractive();
        var go = this.add.image(config.width/2, config.height/2,'GOmessage').setOrigin(0.5);
        //this.add.image(config.width/2,config.height/2,"GOpanel").setOrigin(0.5);

        this.add.text(config.width/2,config.height/2 - 25,"",{fontFamily:"myFont",fontSize:40,fill:"#000000",align:"center"}).setOrigin(0.5).setText("Score : " + scoreManager.GetScore());
        this.add.text(config.width/2,config.height/2 + 25,"",{fontFamily:"myFont",fontSize:40,fill:"#000000",align:"center"}).setOrigin(0.5).setText("HighScore : "+scoreManager.GetHighScore());
        
        this.agrid = new AlignGrid({scene:this,rows:21,cols:11});

        menubtn.on("pointerdown",function(pointer){
            game.scene.start("mainmenu");
            menubtn.removeListener("pointerdown");
        },this)

        this.agrid.placeAtIndex(115,bg);
        Align.scaleToGameH(bg,1,this);
        this.agrid.placeAtIndex(60,go);
        Align.scaleToGameW(go,0.8,this);
        this.agrid.placeAtIndex(181,menubtn);
        Align.scaleToGameH(menubtn,0.1,this);

        //this.agrid.showNumbers();
    }
}