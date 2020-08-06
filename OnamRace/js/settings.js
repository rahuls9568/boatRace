class settings extends Phaser.Scene
{
    constructor()
    {
        super("settings");
    }
    preload()
    {
        this.scene.bringToTop();
        this.load.image('settingsBG','images/bg1.png');
        this.load.image('panelImg','images/panel.png');
        this.load.image('MUSICOnImg','images/icon_sound_music.png');
        this.load.image('MUSICOffImg','images/icon_sound_music_off.png');
        this.load.image('SFXOnImg','images/icon_sound_fx.png');
        this.load.image('SFXOffImg','images/icon_sound_fx_off.png');
        this.load.image('backBtnImg','images/menuBtn.png');

        // this.load.audio('settingsClickSfx','audio/menu.wav')
        
    }

    create()
    {
        this.agrid = new AlignGrid({scene:this,rows:21,cols:11});
        
        var bg = this.add.image(config.width/2,config.height/2,'settingsBG').setOrigin(0.5);
        var panel = this.add.image(config.width/2,config.height/2,'panelImg').setOrigin(0.5);

        var musicOnBtn = this.add.image(config.width/2,0,'MUSICOnImg').setOrigin(0.5).setInteractive();
        var musicOffBtn = this.add.image(config.width/2,0,'MUSICOffImg').setOrigin(0.5).setInteractive();
        var sfxOnBtn = this.add.image(config.width/2,0,'SFXOnImg').setOrigin(0.5).setInteractive();
        var sfxOffBtn = this.add.image(config.width/2,0,'SFXOffImg').setOrigin(0.5).setInteractive();
        var menuBtn = this.add.image(0,0,'backBtnImg').setOrigin(0.5).setInteractive();

        menuBtn.on("pointerdown",function(pointer){
            game.scene.start("mainmenu");
            menuBtn.removeListener("pointerdown");
            musicOnBtn.removeListener("pointerdown");
            musicOffBtn.removeListener("pointerdown");
            sfxOnBtn.removeListener("pointerdown");
            sfxOffBtn.removeListener("pointerdown");
        },this)

        musicOnBtn.on("pointerdown",function(pointer){
            musicOffBtn.setVisible(true);
            musicOnBtn.setVisible(false);
            musicFlag = false;
        },this)
        musicOffBtn.on("pointerdown",function(pointer){
            musicOffBtn.setVisible(false);
            musicOnBtn.setVisible(true);
            musicFlag = true;
        },this)
        sfxOnBtn.on("pointerdown",function(pointer){
            sfxOffBtn.setVisible(true);
            sfxOnBtn.setVisible(false);
            sfxFlag = false;
        },this)
        sfxOffBtn.on("pointerdown",function(pointer){
            sfxOffBtn.setVisible(false);
            sfxOnBtn.setVisible(true);
            sfxFlag = true;
        },this)

        this.agrid.placeAtIndex(115,bg);
        Align.scaleToGameH(bg,1,this);
        this.agrid.placeAtIndex(82,panel);
        // Align.scaleToGameH(panel,0.9,this);
        panel.displayWidth = 0.9*config.width;
        panel.displayHeight = 0.9*config.height;
        this.agrid.placeAtIndex(71,musicOnBtn);
        Align.scaleToGameH(musicOnBtn,0.1,this);
        this.agrid.placeAtIndex(71,musicOffBtn);
        Align.scaleToGameH(musicOffBtn,0.1,this);
        this.agrid.placeAtIndex(104,sfxOnBtn);
        Align.scaleToGameH(sfxOnBtn,0.1,this);
        this.agrid.placeAtIndex(104,sfxOffBtn);
        Align.scaleToGameH(sfxOffBtn,0.1,this);

        this.agrid.placeAtIndex(170,menuBtn);
        Align.scaleToGameH(menuBtn,0.1,this);


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
        
        if(sfxFlag)
        {
            // console.log("sfx true");
            sfxOnBtn.setVisible(true);
            sfxOffBtn.setVisible(false);
        }
        else
        {
            // console.log("sfx false");
            sfxOnBtn.setVisible(false);
            sfxOffBtn.setVisible(true);
        }

        this.agrid.showNumbers();

    }
}