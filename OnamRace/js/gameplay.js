const CAR_MOVE_SPEED = 2.5, SCROLL_SPEED = 2;
const ENEMY_SPAWN_TIME = 3500;
var CURR_SPEED = 0;
var CURR_SPAWN_TIME = 0;
var isMoveRight = false, isMoveLeft = false;

class gameplay extends Phaser.Scene
{
    constructor()
    {
        super("gameplay");
    }

    preload()
    {
        this.scene.bringToTop();
        this.load.image(currentBoat.gamekey,currentBoat.playImg);
        this.load.image('gamebg1','images/bg1.png')
        this.load.image('gamebg2','images/bg2.png')
        this.load.image('gamebg3','images/bg3.png')
        this.load.image('gamebg4','images/bg4.png')
        for(var i = 0; i < Obstacles.length; i++)
        {
            this.load.image(Obstacles[i].gamekey,Obstacles[i].imgPath);
        }
    }

    create()
    {
        this.agrid = new AlignGrid({scene:this,rows:21,cols:11});

        scoreManager.ResetScore();
        this.bg = this.add.image(config.width/2,config.height/2,'gamebg1').setOrigin(0.5);
        this.car = this.matter.add.image(0,0, currentBoat.gamekey).setOrigin(0.5).setSensor(true);
        this.scoreText = this.add.text(0,0,"Score : 0",{font : "bold 30px Arial",fill:"#000000",align:"left"}).setOrigin(0);
        
        CURR_SPEED = SCROLL_SPEED;
        CURR_SPAWN_TIME = ENEMY_SPAWN_TIME;
        
        this.agrid.placeAtIndex(115,this.bg);
        Align.scaleToGameH(this.bg,1,this);
        this.agrid.placeAtIndex(170,this.car);
        Align.scaleToGameH(this.car,0.35,this)

        this.enemyGroup = this.add.group();

        this.cam = this.cameras.main;
        this.GOtimer=0;
        this.scoreTimer = 0;
        this.spawnTimer = 0;
        this.gameTimer = 0;
        this.isPaused = false;
        this.isGameOver = false;

        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            this.CheckCarEnemyCollision(bodyA.gameObject, bodyB.gameObject);
        }, this);

        if(isMobile != -1)
        {
            this.leftBtn = this.add.image(0,0,'leftImg').setOrigin(0.5).setInteractive();
            this.rightBtn = this.add.image(0,0,'rightImg').setOrigin(0.5).setInteractive();

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

        //this.agrid.showNumbers();
    }

    update()
    {
        if(this.isPaused === true)
            return;
        if(this.isGameOver === false)
        {
            this.CheckOutOfBounds();
            this.EnemySpawner();
            this.Move();
            this.MoveCar();
            this.AddScore();
            this.speedIncrementer();
        }
        else if(this.isGameOver === true)
        {
            this.GOtimer += game.loop.delta;
            if(this.GOtimer >= 3000)
            {
                scoreManager.SetHighScore();
                this.isGameOver = null;
                
                game.scene.start("gameover");
            }
        }
    }
    speedIncrementer()
    {
        this.gameTimer += game.loop.delta;
        if(this.gameTimer > 10000)
        {
            if(CURR_SPEED < 2 * SCROLL_SPEED)
            {
                CURR_SPEED += SCROLL_SPEED * 0.1;
                CURR_SPAWN_TIME -= 150;
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
            scoreManager.AddScore(1);
            // console.log("after     "+scoreManager.GetScore());
            this.scoreText.setText("Score : "+scoreManager.GetScore());

        }
    }

    CheckOutOfBounds()
    {
        this.enemyGroup.children.each(function (b) {
            if (b!=null && b.active) {
                if (b.y > this.cam.scrollY + this.cam.height+ b.displayHeight/2) {
                    this.enemyGroup.remove(b,true,true);
                }
            }
        }.bind(this));
    }

    Move()
    {
        this.cam.scrollY -= CURR_SPEED;
        this.car.y -= CURR_SPEED;
        this.bg.y -= CURR_SPEED;
        this.scoreText.y -= CURR_SPEED;
        if(isMobile != -1)
        {
            this.leftBtn -= CURR_SPEED;
            this.rightBtn -= CURR_SPEED;
        }
    }

    MoveCar()
    {
        if(isMoveRight)
        {
            if(this.car.x < config.width-config.width*0.125)
                this.car.x += CAR_MOVE_SPEED;
        }
        else if(isMoveLeft)
        {
            if(this.car.x > config.width*0.125)
                this.car.x -= CAR_MOVE_SPEED;
        }
    }

    CheckCarEnemyCollision(bodyA, bodyB) {
        if(this.isGameOver == true|| bodyA == null || bodyB == null)
            return;
        var enemy;
        if (bodyA.active && bodyA.visible && bodyB.active && bodyB.visible) {
            if (this.enemyGroup.contains(bodyA) && this.car == bodyB) {
                enemy = bodyA
                // console.log("bullet hit orc");
            } else if (this.car == bodyA && this.enemyGroup.contains(bodyB)) {
                enemy = bodyB
                //console.log("bullet hit orc 2");
            }
            if (enemy != null) {
                this.isGameOver = true;
                this.car.setVisible(false);
                //var explode = this.add.sprite(this.car.x,this.car.y,'explosion',0).setOrigin(0.5).setScale(0.3);
                //explode.play('blastAnim');
            }
        }
    }
    EnemySpawner()
    {
        this.spawnTimer += game.loop.delta;
        if(this.spawnTimer >= CURR_SPAWN_TIME)
        {
            this.spawnTimer = 0;
            var rng = Math.floor(Math.random()*Obstacles.length);
            // console.log("spawn");
            //var x = lanes[Math.floor(Math.random()*lanes.length)];
            // console.log(x);
            var enemy = this.matter.add.image(0, this.cam.scrollY - 50, Obstacles[rng].gamekey).setOrigin(0.5);
            enemy.setSensor(true);
            Align.scaleToGameW(enemy,0.2,this);
            enemy.x = Math.random()*config.width*0.75 + config.width*0.125;

            this.enemyGroup.add(enemy);
        }
    }
}