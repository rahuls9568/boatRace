class shop extends Phaser.Scene
{
    constructor()
    {
        super("shop");
    }

    preload()
    {
        this.scene.bringToTop();
        this.load.image('bg','images/bg1.png');
        for(var i = 0; i < Boats.length; i++)
        {
            this.load.spritesheet(Boats[i].gamekey, Boats[i].playImg, Boats[i].frameDetails);
        }
        this.load.image('selectBtn','images/select.png');
        this.load.image('leftArrow','images/leftBtn.png');
        this.load.image('rightArrow','images/rightBtn.png');
        this.load.image('MUSICOnImg','images/icon_sound_music.png');
        this.load.image('MUSICOffImg','images/icon_sound_music_off.png');
    }

    create()
    {
        this.agrid = new AlignGrid({scene:this,rows:21,cols:11});

        var bg = this.add.image(0,0,'bg').setOrigin(0.5);
        this.leftArr = this.add.image(0,0,'leftArrow').setOrigin(0.5).setInteractive();
        this.rightArr = this.add.image(0,0,'rightArrow').setOrigin(0.5).setInteractive();
        this.Select = this.add.image(0,0,'selectBtn').setOrigin(0.5).setInteractive();

        this.currentBoatIndex = 0;
        this.boatArray = new Array(0);
        for(var i = 0; i < Boats.length; i++)
        {
            var boat = this.add.sprite(0,0,Boats[i].gamekey,0).setOrigin(0.5).setVisible(false);
            this.agrid.placeAtIndex(115,boat);
            Align.scaleToGameH(boat,0.5,this);
            this.boatArray.push(boat);
        }

        this.boatArray[this.currentBoatIndex].setVisible(true);
        this.leftArr.setAlpha(0.5);

        this.rightArr.on("pointerdown",function(pointer){
            if(this.currentBoatIndex < this.boatArray.length-1)
            {
                this.boatArray[this.currentBoatIndex].setVisible(false);
                this.currentBoatIndex++;
                this.boatArray[this.currentBoatIndex].setVisible(true);
                if(this.currentBoatIndex == this.boatArray.length-1)
                {
                    this.rightArr.setAlpha(0.5);
                }
                else
                {
                    this.rightArr.setAlpha(1);
                    this.leftArr.setAlpha(1);
                }
            }
        },this);
        this.leftArr.on("pointerdown",function(pointer){
            if(this.currentBoatIndex >= 1)
            {
                this.boatArray[this.currentBoatIndex].setVisible(false);
                this.currentBoatIndex--;
                this.boatArray[this.currentBoatIndex].setVisible(true);
                if(this.currentBoatIndex == 0)
                {
                    this.leftArr.setAlpha(0.5);
                }
                else
                {
                    this.leftArr.setAlpha(1);
                    this.rightArr.setAlpha(1);
                }
            }
        },this);
        this.Select.on("pointerdown",function(pointer){
            currentBoat = Boats[this.currentBoatIndex];
            game.scene.start("mainmenu");
        },this)
        
        this.agrid.placeAtIndex(115,bg);
        Align.scaleToGameH(bg,1,this);
        this.agrid.placeAtIndex(100,this.leftArr);
        Align.scaleToGameW(this.leftArr,0.2,this);
        this.agrid.placeAtIndex(108,this.rightArr);
        Align.scaleToGameW(this.rightArr,0.2,this);
        this.agrid.placeAtIndex(203,this.Select);
        Align.scaleToGameH(this.Select,0.075,this);

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