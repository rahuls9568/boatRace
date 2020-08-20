eventInit = false, isInGame = false;
class gameplay extends Phaser.Scene
{
    constructor()
    {
        super("gameplay");
    }

    preload()
    {   
        this.scene.bringToTop();
        //this.load.image(currentBoat.gamekey,currentBoat.playImg);
        // this.load.image('gamebg1','images/bg1.png')
        // this.load.image('gamebg2','images/bg2.png')
        // this.load.image('gamebg3','images/bg3.png')
        // this.load.image('gamebg4','images/bg4.png')
        // this.load.image('startLine','images/StartLine.png');
        // for(var i = 0; i < Boats.length; i++)
        // {
        //     this.load.spritesheet(Boats[i].gamekey, Boats[i].playImg, Boats[i].frameDetails);
        // }
        // for(var i = 0; i < Obstacles.length; i++)
        // {
        //     this.load.image(Obstacles[i].gamekey,Obstacles[i].imgPath);
        // }
        // for(var i = 0; i < Crowd.length; i++)
        // {
        //     this.load.image(Crowd[i].gamekey, Crowd[i].playImg);
        // }
        // if(isMobile != -1)
        // {
        //     this.load.image('leftImg','images/leftBtn.png');
        //     this.load.image('rightImg','images/rightBtn.png');
        // }
        // this.load.image(currentBoat.deadKey,currentBoat.deadPath);

        
        // this.load.audio('crashAudio','audio/crashing wood.mp3');

        // this.load.image('MUSICOnImg','images/icon_sound_music.png');
        // this.load.image('MUSICOffImg','images/icon_sound_music_off.png');
        // this.load.image('PauseImg','images/pauseBtn.png');
        isInGame = true;
    }

    create()
    {
        // SCROLL_SPEED = config.height/160;
        // TEXT_SIZE = config.height/16;
        // CAR_MOVE_SPEED = config.width/106.667;

        this.agrid = new AlignGrid({scene:this,rows:21,cols:11});
        this.boatArray = new Array(0)

        this.rowIns = this.sound.add('rowIns',{
            mute:false,
            volume:1,
            rate:1,
            seek:0,
            loop:true,
            delay:0
        });
        this.rowBGM = this.sound.add('rowbgm', {
	        mute: false,
	        volume: 0.75,
	        rate: 1,
	        seek: 0,
	        loop: true,
	        delay: 0
	    });
        this.rowBGM.play();
        this.rowIns.play();
	    if(musicFlag)
        {
            this.rowBGM.resume();
            this.rowIns.resume();
        }
        else
        {
            this.rowBGM.pause();
            this.rowIns.pause();
        }

        for(var i = 0; i < Boats.length; i++)
        {
            this.anims.create({
                key: Boats[i].animkey,
                repeat: -1,
                frameRate: 8,
                frames: this.anims.generateFrameNames(Boats[i].gamekey, {
                    start: 0,
                    end: 5
                })
            });
        }
        this.anims.resumeAll();

        scoreManager.ResetScore();
        this.bg1 = this.add.image(config.width/2,config.height/2,'gamebg1').setOrigin(0.5);
        this.bg2 = this.add.image(config.width/2,config.height/2,'gamebg2').setOrigin(0.5);
        this.bg3 = this.add.image(config.width/2,config.height/2,'gamebg3').setOrigin(0.5);
        this.bg4 = this.add.image(config.width/2,config.height/2,'gamebg4').setOrigin(0.5);
        
        this.musicOnBtn = this.add.image(config.width,0,'MUSICOnImg').setOrigin(1,0).setInteractive().setDepth(5);
        this.musicOffBtn = this.add.image(config.width,0,'MUSICOffImg').setOrigin(1,0).setInteractive().setDepth(5);
        this.PauseBtn = this.add.image(config.width,0,'PauseImg').setOrigin(1,0).setInteractive().setDepth(5);
        
        this.playerBoat = this.matter.add.sprite(0,0, currentBoat.gamekey,0).setOrigin(0.5).setSensor(true);
        this.playerBoat.setBody(currentBoat.body);
        this.playerBoat.play(currentBoat.animkey);
        this.scoreText = this.add.text(0,0,"Score : 0",{fontFamily:"myFont",fontSize:TEXT_SIZE*0.75,fill:"#000000",align:"left"}).setOrigin(0).setDepth(10);
        
        CURR_SPEED = SCROLL_SPEED;
        CURR_SPAWN_TIME = ENEMY_SPAWN_TIME;
        CURR_MOVE_SPEED = CAR_MOVE_SPEED;
        
        this.enemyGroup = this.add.group();
        this.aiboatGroup = this.add.group();
        this.bgGroup = this.add.group();
        this.crowdGroup = this.add.group();

        this.agrid.placeAtIndex(115,this.bg1);
        // Align.scaleToGameH(this.bg1,1,this);
        this.bg1.displayWidth = config.width;
        this.bg1.displayHeight = config.height;
        this.bg1.y -= 0*this.bg1.displayHeight;
        this.agrid.placeAtIndex(115,this.bg2);
        // Align.scaleToGameH(this.bg2,1,this);
        this.bg2.displayWidth = config.width;
        this.bg2.displayHeight = config.height;
        this.bg2.y -= 1*this.bg2.displayHeight;
        this.agrid.placeAtIndex(115,this.bg3);
        // Align.scaleToGameH(this.bg3,1,this);
        this.bg3.displayWidth = config.width;
        this.bg3.displayHeight = config.height;
        this.bg3.y -= 2*this.bg3.displayHeight;
        this.agrid.placeAtIndex(115,this.bg4);
        // Align.scaleToGameH(this.bg4,1,this);
        this.bg4.displayWidth = config.width;
        this.bg4.displayHeight = config.height;
        this.bg4.y -= 3*this.bg4.displayHeight;
        this.agrid.placeAtIndex(170,this.playerBoat);
        Align.scaleToGameH(this.playerBoat,0.35,this)
        //this.agrid.placeAtIndex(10,this.musicOnBtn);
        Align.scaleToGameH(this.musicOnBtn,0.075,this);
        //this.agrid.placeAtIndex(10,this.musicOffBtn);
        Align.scaleToGameH(this.musicOffBtn,0.075,this);
        //this.agrid.placeAtIndex(10,this.PauseBtn);
        Align.scaleToGameH(this.PauseBtn,0.075,this);
        this.PauseBtn.y = this.musicOffBtn.displayHeight;
        
        var indexArray = new Array(0);
        this.spawnInitial(this.playerBoat.x - 0.25*config.width,indexArray);
        this.spawnInitial(this.playerBoat.x + 0.25*config.width,indexArray);

        var start = this.add.image(config.width/2,config.height,'startLine').setOrigin(0.5,1);
        start.displayWidth = config.width;
        start.displayHeight = config.height*0.15;
        this.crowdGroup.add(start);


        this.bgGroup.add(this.bg1);
        this.bgGroup.add(this.bg2);
        this.bgGroup.add(this.bg3);
        this.bgGroup.add(this.bg4);

        this.cam = this.cameras.main;
        this.GOtimer=0;
        this.scoreTimer = 0;
        this.spawnTimer = 0;
        this.gameTimer = 0;
        this.crowdtimer = 0;
        this.isPrevLeft = false;
        this.isPaused = false;
        this.isGameOver = false;

        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            this.CheckCarEnemyCollision(bodyA.gameObject, bodyB.gameObject);
            this.CheckAIBoatRockCollision(bodyA.gameObject,bodyB.gameObject);
        }, this);

        this.leftBtn = null;
        this.rightBtn = null;
        this.musicOnBtn.on("pointerdown",function(pointer){
            this.musicOffBtn.setVisible(true);
            this.musicOnBtn.setVisible(false);
            musicFlag = false;
            this.sound.pauseAll();
        },this)
        this.musicOffBtn.on("pointerdown",function(pointer){
            this.musicOffBtn.setVisible(false);
            this.musicOnBtn.setVisible(true);
            musicFlag = true;
            this.sound.resumeAll();
        },this)
        this.PauseBtn.on("pointerdown",function(pointer){
            this.isPaused = !this.isPaused;
            if(this.isPaused)
            {
                this.Pause();
            }
            else
            {
                this.Resume();
            }
        },this)

        if(musicFlag)
        {
            //console.log("music true");
            this.musicOnBtn.setVisible(true);
            this.musicOffBtn.setVisible(false);
        }
        else
        {
            // console.log("music false");
            this.musicOnBtn.setVisible(false);
            this.musicOffBtn.setVisible(true);
        }
        if(isMobile != -1)
        {
            this.leftBtn = this.add.image(0,0,'leftImg').setOrigin(0.5).setDepth(5).setInteractive();
            this.rightBtn = this.add.image(0,0,'rightImg').setOrigin(0.5).setDepth(5).setInteractive();

            this.agrid.placeAtIndex(211,this.leftBtn);
            Align.scaleToGameH(this.leftBtn,0.15,this);
            this.agrid.placeAtIndex(217,this.rightBtn);
            Align.scaleToGameH(this.rightBtn,0.15,this);

            this.leftBtn.on("pointerdown",function(pointer){
                isMoveLeft = true;
            },this);
            this.leftBtn.on("pointerout",function(pointer){
                isMoveLeft = false;
            },this);
            this.rightBtn.on("pointerdown",function(pointer){
                isMoveRight = true;
            },this);
            this.rightBtn.on("pointerout",function(pointer){
                isMoveRight = false;
            },this);
            // this.leftBtn.emit("pointerdown");
            // this.rightBtn.emit("pointerdown");
        }
        else
        {
            document.addEventListener('keyup',function handleKeyup(e) 
            {
                switch (e.key) 
                {
                    case 'ArrowLeft':
                    case '4': 
                        isMoveLeft = false;
                        break;
                    case 'ArrowRight':
                    case '6':
                        isMoveRight = false;
                        break;
                    default:
                        //keyCallback.other(e.key);
                }
            })
            document.addEventListener('keydown',function handleKeyup(e) 
            {
                switch (e.key) 
                {
                    case 'ArrowLeft':
                    case '4': 
                        isMoveLeft = true;
                        break;
                    case 'ArrowRight':
                    case '6':
                        isMoveRight = true;
                        break;
                    default:
                        //keyCallback.other(e.key);
                }
            })
        }

        // PauseEvent = function(){
        //     //console.log("PAUSE CALLED");
        //     game.scene.getScene('gameplay').Pause();
        // }
        // ResumeEvent = function(){
        //     //console.log("RESUME CALLED");
        //     game.scene.getScene('gameplay').Resume();
        // }

        if(!eventInit)
        {
            eventInit = true;
            game.events.addListener(Phaser.Core.Events.FOCUS, this.Resume, this);
            game.events.addListener(Phaser.Core.Events.BLUR, this.Pause, this);
            console.log(this.sys.game.device.os);
            if(this.sys.game.device.os.android == true)
            {
                console.log("android true");
                // this.leftBtn.emit("pointerdown");
                // this.leftBtn.emit("pointerout");
                // this.rightBtn.emit("pointerdown");
                // this.rightBtn.emit("pointerout");
            }
            // if(isMobile != -1)
            // {
            //     console.log("here");
            // }
        }

        //this.agrid.showNumbers();
    }

    Pause()
    {
        if(isInGame === true)
        {
            console.log("PAUSE CALLED");
            this.isPaused = true;
            this.sound.pauseAll();
            this.anims.pauseAll();
        }
    }
    
    Resume()
    {
        if(isInGame === true)
        {
            console.log("RESUME CALLED");
            this.isPaused = false;
            this.anims.resumeAll();
            if(musicFlag)
                this.sound.resumeAll();
        }
    }

    update()
    {
        if(this.isPaused === true)
            return;
        if(this.isGameOver === false)
        {
            this.DetectAIRockCollision();
            this.CheckOutOfBounds();
            this.EnemySpawner();
            this.Move();
            this.MoveCar();
            this.AddScore();
            this.speedIncrementer();
            this.CrowdSpawner();

        }
        else if(this.isGameOver === true)
        {
            this.GOtimer += game.loop.delta;
            this.anims.pauseAll();
            if(this.GOtimer >= 2500)
            {
                isInGame = false;
                PauseEvent = function(){};
                ResumeEvent = function(){};
                scoreManager.SetHighScore();
                this.isGameOver = null;
                this.rowBGM.destroy();
                this.rowIns.destroy();
                game.scene.start("gameover");
            }
        }
    }

    CrowdSpawner()
    {
        this.crowdtimer += game.loop.delta;
        if(this.crowdtimer > 500)
        {
            this.crowdtimer = 0;
            if(Math.random()*100 >= 40)
            {
                var rng = Math.floor(Math.random()*Crowd.length);
                var crowdobj = this.add.image(0,0,Crowd[rng].gamekey).setOrigin(Crowd[rng].origin.x,Crowd[rng].origin.y).setDepth(2);
                
                if(this.isPrevLeft)
                {
                    crowdobj.setPosition(config.width*0.85,this.cam.scrollY-50);
                    if(Crowd[rng].isFacingRight===true)
                    {
                        crowdobj.flipX = true;
                        crowdobj.x += crowdobj.displayWidth;
                    }
                    this.isPrevLeft = false;
                }
                else
                {
                    crowdobj.setPosition(config.width*0.15,this.cam.scrollY-50);
                    if(Crowd[rng].isFacingRight === false)
                    {
                        crowdobj.flipX = true;
                        crowdobj.x -= crowdobj.displayWidth;
                    }
                    this.isPrevLeft = true;
                }
                Align.scaleToGameH(crowdobj,Crowd[rng].scalePerc,this);    
                this.crowdGroup.add(crowdobj);
            }
        }
    }

    DetectAIRockCollision()
    {
        for(var i = 0; i < this.boatArray.length; i++)
        {
            if(this.boatArray[i] != null && this.boatArray[i].body != null)
            {
                if(!this.boatArray[i].isDodging)
                {
                    this.enemyGroup.children.each(function(b){
                        if(b!=null && b.active)
                        {
                            if(this.boatArray[i].body.y - this.boatArray[i].body.displayHeight/2 - config.height*0.3 <= b.y + b.displayHeight/2)
                            {
                                if(this.boatArray[i].body.x > b.x - b.displayWidth/2 && this.boatArray[i].body.x < b.x + b.displayWidth/2)
                                {                            
                                    //console.log("Rock Detected");
                                    var target = 0;
                                    if(this.boatArray[i].body.x - this.boatArray[i].body.displayWidth/2 - b.displayWidth/2 >=  config.width*0.25)
                                    {
                                        target = b.x - this.boatArray[i].body.displayWidth/2 - b.displayWidth/2;
                                    }
                                    else if(this.boatArray[i].body.x + this.boatArray[i].body.displayWidth/2 + b.displayWidth/2 <=  config.width*0.75)
                                    {
                                        target = b.x + this.boatArray[i].body.displayWidth/2 + b.displayWidth/2;
                                    }
                                    this.boatArray[i].setTarget(target);
                                }
                            }
                        }
                    }.bind(this));
                }
                else
                {
                    this.boatArray[i].DodgeRock();
                }
                if(this.boatArray[i].body.y > this.cam.scrollY + this.cam.height + this.boatArray[i].body.displayHeight/2)
                {
                    this.aiboatGroup.remove(this.boatArray[i].body,true,true);
                    RemoveElement(this.boatArray, this.boatArray[i]);
                }
                else
                {
                    this.boatArray[i].MoveBoat();
                }
            }
        }
    }

    speedIncrementer()
    {
        this.gameTimer += game.loop.delta;
        if(this.gameTimer > 7500)
        {
            this.gameTimer = 0;
            
            if(true||CURR_SPEED < 3 * SCROLL_SPEED)
            {
                CURR_SPEED += SCROLL_SPEED * 0.1;
                // CURR_SPAWN_TIME -= 150;
                CURR_MOVE_SPEED = Math.min(CURR_MOVE_SPEED + CAR_MOVE_SPEED*0.1, 2*CAR_MOVE_SPEED);
                //console.log(CURR_SPEED + "\n"+CURR_MOVE_SPEED);
            }
        }

    }

    AddScore()
    {
        this.scoreTimer += game.loop.delta;
        if(this.scoreTimer > 750)
        {
            this.scoreTimer = 0;
            // console.log("before    "+scoreManager.GetScore());
            scoreManager.AddScore(10);
            // console.log("after     "+scoreManager.GetScore());
            this.scoreText.setText("Score : "+scoreManager.GetScore());

        }
    }

    CheckOutOfBounds()
    {
        this.enemyGroup.children.each(function (b) {
            if (b!=null && b.active) {
                b.y-=CURR_SPEED/2;
                if (b.y > this.cam.scrollY + this.cam.height+ b.displayHeight/2) {
                     //console.log("removing enemy" + this.enemyGroup);
                     this.enemyGroup.remove(b,true,true);
                     // console.log(this.enemyGroup);
                    }
                }
            }.bind(this));
            
        // this.aiboatGroup.children.each(function (b) {
        //     if (b!=null && b.active) {
        //         b.y-=CURR_SPEED*0.75;
        //         if (b.y > this.cam.scrollY + this.cam.height+ b.displayHeight/2) {
        //             console.log("removing boat" + this.aiboatGroup);
        //             RemoveElement(this.boatArray,this.getObject(b));
        //             this.aiboatGroup.remove(b,true,true);
        //         }
        //     }
        // }.bind(this));

        this.bgGroup.children.each(function (b){
            if(b!=null){
                b.y -= CURR_SPEED/2;
                if(b.y>this.cam.scrollY+this.cam.height + b.displayHeight/2){
                    b.y-=4*b.displayHeight;
                }
            }
        }.bind(this));

        this.crowdGroup.children.each(function (b) {
            if (b!=null && b.active) {
                b.y-=CURR_SPEED/2;
                if (b.y > this.cam.scrollY + this.cam.height+ b.displayHeight/2) {
                    this.crowdGroup.remove(b,true,true);
                }
            }
        }.bind(this));
    }

    Move()
    {
        this.cam.scrollY -= CURR_SPEED;
        this.playerBoat.y -= CURR_SPEED;
        //this.bg.y -= CURR_SPEED;
        this.scoreText.y -= CURR_SPEED;
        if(isMobile != -1)
        {
            this.leftBtn.y -= CURR_SPEED;
            this.rightBtn.y -= CURR_SPEED;
        }
        this.musicOffBtn.y-=CURR_SPEED;
        this.musicOnBtn.y-=CURR_SPEED;
        this.PauseBtn.y-=CURR_SPEED;
    }

    MoveCar()
    {
        if(isMoveRight)
        {
            if(this.playerBoat.x < config.width*0.75)
            {
                this.playerBoat.x += CURR_MOVE_SPEED;
            }
            else
            {
                this.SpawnDeadBoat()
                this.isGameOver = true;
            }
        }
        else if(isMoveLeft)
        {
            if(this.playerBoat.x > config.width*0.25)
            {
                this.playerBoat.x -= CURR_MOVE_SPEED;
            }    
            else
            {
                this.SpawnDeadBoat();
                this.isGameOver = true;
            }
        }
    }

    SpawnDeadBoat()
    {
        this.playerBoat.setVisible(false);
        var deadBoat = this.add.image(this.playerBoat.x,this.playerBoat.y,currentBoat.deadKey).setOrigin(0.5);
        Align.scaleToGameH(deadBoat,0.3,this);
        this.sound.pauseAll();
        if(musicFlag)
            this.sound.play('crashAudio');
    }

    CheckCarEnemyCollision(bodyA, bodyB) {
        if(this.isGameOver == true|| bodyA == null || bodyB == null)
            return;
        var enemy;
        if (bodyA.active && bodyA.visible && bodyB.active && bodyB.visible) {
            if ((this.enemyGroup.contains(bodyA)|| this.aiboatGroup.contains(bodyA)) && this.playerBoat == bodyB) {
                enemy = bodyA
            } else if (this.playerBoat == bodyA && (this.enemyGroup.contains(bodyB) || this.aiboatGroup.contains(bodyB))) {
                enemy = bodyB
            }
            if (enemy != null) {
                this.isGameOver = true;
                this.SpawnDeadBoat();
            }
        }
    }

    CheckAIBoatRockCollision(bodyA, bodyB) {
        if(this.isGameOver == true|| bodyA == null || bodyB == null)
            return;
        var rock, boat;
        if (bodyA.active && bodyA.visible && bodyB.active && bodyB.visible) {
            if (this.enemyGroup.contains(bodyA) && this.aiboatGroup.contains(bodyB)) {
                console.log("condition 1");
                rock = bodyA;
                boat = bodyB;
            } else if (this.enemyGroup.contains(bodyB) && this.aiboatGroup.contains(bodyA)) {
                console.log("condition 2");
                rock = bodyB;
                boat = bodyA;
            }
            if (rock != null && boat != null) {
                console.log(boat);
                boat.anims.pause();
                this.getObject(boat).isHit = true;
            }
        }
    }

    EnemySpawner()
    {
        this.spawnTimer += game.loop.delta;
        if(this.spawnTimer >= CURR_SPAWN_TIME)
        {
            this.spawnTimer = 0;
            var choice = Math.floor(Math.random()*100)
            if(choice > 15)
            {
                
                //console.log("spawn Rock");
                var rng = Math.floor(Math.random()*Obstacles.length);
                var enemy = this.matter.add.image(0, this.cam.scrollY - 50, Obstacles[rng].gamekey).setOrigin(0.5).setDepth(1);
                enemy.setSensor(true);
                Align.scaleToGameW(enemy,0.2,this);
                enemy.x = Math.random()*config.width*0.35 + config.width*0.35;
                
                this.enemyGroup.add(enemy);
            }
            else
            {
                var rng = -1;
                do{
                    rng = Math.floor(Math.random()*Boats.length);
                }while(Boats[rng].name == currentBoat.name);
                console.log("spawn Boat\n" + currentBoat.name + "   " + Boats[rng].name);
                // console.log(Boats[rng].name);

                enemy = this.matter.add.sprite(0,this.cam.scrollY - 50, Boats[rng].gamekey,0).setOrigin(0.5).setSensor(true).setDepth(1);
                enemy.setBody(Boats[rng].body);
                enemy.play(Boats[rng].animkey);
                Align.scaleToGameH(enemy,0.3,this);
                enemy.x = Math.random()*config.width*0.5 + config.width*0.25;

                checkArray(this.boatArray)
                this.boatArray.push(new EnemyBoat(enemy));
                
                this.aiboatGroup.add(enemy);
            }
        }
    }

    spawnInitial(x, indexArray)
    {
        var index = -1;
        do{
            index = Math.floor(Math.random()*Boats.length);
        }while(indexArray.includes(index) || Boats[index] == currentBoat);
        indexArray.push(index);
        var pos = this.agrid.getPosByIndex(170);
        var boat = this.matter.add.sprite(x,pos.y,Boats[index].gamekey,0).setOrigin(0.5).setSensor(true);
        boat.setBody(Boats[index].body);
        boat.play(Boats[index].animkey);
        Align.scaleToGameH(boat,0.3,this);
        this.aiboatGroup.add(boat);
        this.boatArray.push(new EnemyBoat(boat))
    }

    getObject(b)
    {
        for(var i = 0; i < this.boatArray.length; i++)
        {
            if(this.boatArray[i] != null && this.boatArray[i].body != null)
            {
                if(this.boatArray[i].body == b)
                {
                    //console.log("found boat class object at:  " + i);
                    return this.boatArray[i];
                }
            }
        }
        return null;
    }
    // getObjectIndex(b)
    // {
    //     for(var i = 0; i < this.boatArray.length; i++)
    //     {
    //         if(this.boatArray[i].body == b)
    //         {
    //             //console.log("found boat class object at:  " + i);
    //             return i;
    //         }
    //     }
    //     return -1;
    // }
}

class EnemyBoat
{
    constructor(sprite)
    {
        this.body = sprite;
        this.initX = sprite.x;
        this.isDodging = false;
        this.isHit = false;
    }

    MoveBoat()
    {
        if(this.isHit)
        {
            this.body.y -= CURR_SPEED/2;
        }
        else
        {
            this.body.y -= CURR_SPEED*0.75;
        }
    }

    setTarget(x)
    {
        this.isDodging = true;
        this.FinalX = x;
        this.dodgeTimer = 0;
    }

    DodgeRock()
    {
        if(!this.isHit && this.isDodging)
        {
            this.dodgeTimer += game.loop.delta/800;             //Finish moving in 800ms
            var x = Phaser.Math.Linear(this.initX, this.FinalX, this.dodgeTimer);
            this.body.x = x;
            if(this.dodgeTimer > 1)
            {
                this.isDodging = false;
                this.body.x = this.FinalX;
                this.initX = this.FinalX;
            }
        }
    }
}

function RemoveElement(arr,obj)
{
    for(var i = 0; i < arr.length; i++)
        if(arr[i] === obj)
            arr[i] = null;
    return arr;
}
function checkArray(arr)
{
    var index = -1;
    while(index < arr.length)
    {
        for(index = 0; index < arr.length; index++)
        {
            if(arr[index] == null)
            {
                break;
            }
        }
        if(index < arr.length)
        {
            for(var i = index; i < arr.length - 1; i++)
            {
                var temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
            }
            arr.pop();
        }
        else
            break;
    }
}