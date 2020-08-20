class loading extends Phaser.Scene
{
    constructor()
    {
        super('loading');
    }
    preload()
    {
        this.scene.bringToTop();
        console.log("here");
        var progressBox = this.add.graphics();
        var progressBar = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(config.width/4, config.height/2-15, config.width/2, 30);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                fontFamily:"myFont",
                fontSize: TEXT_SIZE/2,
                fill: '#000000'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: '0%',
            style: {
                fontFamily:"myFont",
                fontSize: TEXT_SIZE/2,
                fill: '#000000'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                fontFamily:"myFont",
                fontSize: TEXT_SIZE/2,
                fill: '#000000'
            }
        });

        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(config.width/4, config.height/2-15, config.width/2 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            // console.log('Loading asset: ' + file.key);
            //console.log(file.key + "\n" + getLoadString(file.key));
            assetText.setText('Loading ' + getLoadString(file.key));
            //assetText.setText('Loading game assets');
        });

        this.load.on('complete', function () {
            console.log("loaded");
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        // this.load.audio('rowbgm',['audio/Background sound.mp3','audio/Background sound.ogg']);
        // this.load.audio('rowIns',['audio/Boat instructions.mp3','audio/Boat instructions.ogg']);
        
        this.load.image('gamebg1','images/bg1.png')
        this.load.image('gamebg2','images/bg2.png')
        this.load.image('gamebg3','images/bg3.png')
        this.load.image('gamebg4','images/bg4.png')
        this.load.image('startLine','images/StartLine.png');
        for(var i = 0; i < Boats.length; i++)
        {
            this.load.spritesheet(Boats[i].gamekey, Boats[i].playImg, Boats[i].frameDetails);
            this.load.image(Boats[i].deadKey,Boats[i].deadPath);
        }
        for(var i = 0; i < Obstacles.length; i++)
        {
            this.load.image(Obstacles[i].gamekey,Obstacles[i].imgPath);
        }
        for(var i = 0; i < Crowd.length; i++)
        {
            this.load.image(Crowd[i].gamekey, Crowd[i].playImg);
        }
        if(isMobile != -1)
        {
            this.load.image('leftImg','images/leftBtn.png');
            this.load.image('rightImg','images/rightBtn.png');
        }
        //this.load.image(currentBoat.deadKey,currentBoat.deadPath);

        
        this.load.audio('crashAudio','audio/crashing wood.mp3');

        this.load.image('MUSICOnImg','images/icon_sound_music.png');
        this.load.image('MUSICOffImg','images/icon_sound_music_off.png');
        this.load.image('PauseImg','images/pauseBtn.png');
    }

    create()
    {
        this.scene.start('gameplay');
    }

    
}