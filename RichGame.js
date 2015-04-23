
BasicGame.RichGame = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
	this.launchButton;
	this.lives = 3;
	this.quitButton;
	this.resetButton;
	this.player;
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.launchSound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

    var platform1;
    var platform2;
    var platform3;
    var platform4;
    var platform5;
    var world;
    var guy;
    var castle;
    var shell;
    var shell2;
    var shell3;
    var goomba;
    var jumpTimer = 0;
    var timer = 0;
    var aButton;
    var bButton;
    var theme;
    var cursors;
    var endGame;
    var jump;
    var mole;
    var mole2;
    var mole3;
    var mole4;
    var mole5;
    var moleTimer = 0;
    
BasicGame.RichGame.prototype = {

    create: function () {
    	this.world.setBounds(0, 0, 8000, 520);
    	this.physics.startSystem(Phaser.Physics.ARCADE);
    	this.physics.arcade.gravity.y = 550;//550
    	this.time.desiredFps = 30;
    	
    	world = this.add.sprite(0, 0, 'world'); 
    	castle = this.add.sprite(7500,290,'castle');
        platform1 = this.add.sprite(1920, 420, 'platform1');
        platform2 = this.add.sprite(2400, 420, 'platform2');
        platform3 = this.add.sprite(2890, 420, 'platform2');
        platform4 = this.add.sprite(3290, 420, 'platform2');
        guy = this.add.sprite(50,520,'guy');
        goomba = this.add.sprite(500,480,'goomba');
        shell = this.add.sprite(1500,580,'shell');
        shell2 = this.add.sprite(3000,580,'shell');
        shell3 = this.add.sprite(5000,580,'shell');
        mole   = this.add.sprite(4000,520,'mole');
        mole2= this.add.sprite(4800,520,'mole');
        mole3 = this.add.sprite(5800,520,'mole');
        mole4 = this.add.sprite(6400,520,'mole');
        mole5 = this.add.sprite(7300,520,'mole');
        endGame = false;
        
        this.physics.enable(guy, Phaser.Physics.ARCADE);
        this.physics.enable(platform1, Phaser.Physics.ARCADE);
        this.physics.enable(platform2, Phaser.Physics.ARCADE);
        this.physics.enable(platform3, Phaser.Physics.ARCADE);
        this.physics.enable(platform4, Phaser.Physics.ARCADE);
        this.physics.enable(shell, Phaser.Physics.ARCADE);
        this.physics.enable(shell2, Phaser.Physics.ARCADE);
        this.physics.enable(shell3, Phaser.Physics.ARCADE);
        this.physics.enable(mole, Phaser.Physics.ARCADE);
        this.physics.enable(mole2, Phaser.Physics.ARCADE);
        this.physics.enable(mole3, Phaser.Physics.ARCADE);
        this.physics.enable(mole4, Phaser.Physics.ARCADE);
        this.physics.enable(mole5, Phaser.Physics.ARCADE);
        this.physics.enable(goomba, Phaser.Physics.ARCADE);
        
        this.camera.follow(guy);
    	guy.body.bounce.y = 0.2;
        guy.body.collideWorldBounds = true;
        guy.body.gravity.set(0, 180);
        
        platform1.body.collideWorldBounds = true;
        platform1.body.bounce.y = 0.2;
        platform1.body.immovable = true;
        platform1.body.gravity.set(0, 0);
        
        platform2.body.collideWorldBounds = true;
        platform2.body.bounce.y = 0.2;
        platform2.body.immovable = true;
        platform2.body.gravity.set(0, 0);
        
        platform3.body.collideWorldBounds = true;
        platform3.body.bounce.y = 0.2;
        platform3.body.immovable = true;
        platform3.body.gravity.set(0, 0);
        
        platform4.body.collideWorldBounds = true;
        platform4.body.bounce.y = 0.2;
        platform4.body.immovable = true;
        platform4.body.gravity.set(0, 0);
        
        shell.body.collideWorldBounds = true;
        shell.body.velocity.x = -300;
        
        shell2.body.collideWorldBounds = true;
        shell2.body.velocity.x = -300;
        
        shell3.body.collideWorldBounds = true;
        shell3.body.velocity.x = -300;
        
        mole.body.collideWorldBounds = true;
        mole.body.velocity.y = -5;
        mole.body.bounce.y = 0.2;
        mole.body.gravity.set(0, 180);
        
        mole2.body.collideWorldBounds = true;
        mole2.body.velocity.y = -5;
        
        mole3.body.collideWorldBounds = true;
        mole3.body.velocity.y = -5;
        
        mole4.body.collideWorldBounds = true;
        mole4.body.velocity.y = -5;
        
        mole5.body.collideWorldBounds = true;
        mole5.body.velocity.y = -5;
        
        
        goomba.body.collideWorldBounds = true;
        goomba.body.velocity.x = -200;
        
        theme = this.add.audio('theme',1,true);
        jump = this.add.audio('jump');
        theme.play('',0,1,true);
        
        guy.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11,12], 13, true);
        guy.animations.add('run', [13,14,15,16,17,18,19,20,21,22], 13, true);
        guy.animations.add('jump', [27,28,29,30,31,32,33,34,35,36,26],13,false);
        guy.animations.add('stand', [26],13,false);
        guy.animations.add('turn', [40],13,false);
        guy.animations.add('die', [31],13,false);
        guy.anchor.setTo(.5, 1); //so it flips around its middle
        
        goomba.animations.add('walk', [0,1,2,3,4], 13, true);
        goomba.anchor.setTo(.5, 1); //so it flips around its middle
        goomba.scale.x = -1;
        
        cursors = this.input.keyboard.createCursorKeys();
        aButton = this.input.keyboard.addKey(Phaser.Keyboard.Z);
        bButton = this.input.keyboard.addKey(Phaser.Keyboard.X);
	    
    },
    
	gameOver: function (pointer){
		theme.stop();
		var dieMusic = this.add.audio('dieMusic');
		dieMusic.play();
		guy.body.velocity.y = -300;
		endGame = true;
		this.state.start("Lose");
		//Go to Lose State
	},
	
    collisionHandler: function (guy, object) {
   	   this.gameOver(this);
    },
    
    fall: function(pointer){
	   this.gameOver(this);
    },

    quitGame: function (pointer) {
    },
    
    restart: function (pointer){
    	this.state.start("ChooseCharacter");
    },

    update: function () {
    guy.body.velocity.x = 0;
    this.physics.arcade.collide(guy, platform1);
    this.physics.arcade.collide(guy, platform2);
    this.physics.arcade.collide(guy, platform3);
    this.physics.arcade.collide(guy, platform4);
    this.physics.arcade.collide(guy, shell,  this.collisionHandler, null, this);
    this.physics.arcade.collide(guy, shell2, this.collisionHandler, null, this);
    this.physics.arcade.collide(guy, shell3, this.collisionHandler, null, this);
    this.physics.arcade.collide(guy, goomba, this.collisionHandler, null, this);
    this.physics.arcade.collide(guy, mole,  this.collisionHandler, null, this);
    this.physics.arcade.collide(guy, mole2, this.collisionHandler, null, this);
    this.physics.arcade.collide(guy, mole3, this.collisionHandler, null, this);
    this.physics.arcade.collide(guy, mole4, this.collisionHandler, null, this);
    this.physics.arcade.collide(guy, mole5, this.collisionHandler, null, this);
    
    if((Math.abs(guy.body.x - mole.body.x) < 200) && (this.time.now > moleTimer)) {
    	mole.body.velocity.y = -300;
    	moleTimer = this.time.now + 2050;
    }
    
    if((Math.abs(guy.body.x - mole2.body.x) < 200) && (this.time.now > moleTimer)) {
    	mole2.body.velocity.y = -400;
    	moleTimer = this.time.now + 2050;
    }
	
	if((Math.abs(guy.body.x - mole3.body.x) < 200) && (this.time.now > moleTimer)) {
    	mole3.body.velocity.y = -170;
    	moleTimer = this.time.now + 2050;
    }
	
	if((Math.abs(guy.body.x - mole4.body.x) < 200) && (this.time.now > moleTimer)) {
    	mole4.body.velocity.y = -400;
    	moleTimer = this.time.now + 2050;
    }
	
	if((Math.abs(guy.body.x - mole5.body.x) < 200) && (this.time.now > moleTimer)) {
    	mole5.body.velocity.y = -330;
    	moleTimer = this.time.now + 2050;
    }
	
	
	//goomba stuff
	goomba.animations.play('walk',13,true);
	if(goomba.body.x >= 2000){goomba.scale.x = -1;goomba.body.velocity.x = -200;}
	if(goomba.body.x == 0){goomba.scale.x = 1;goomba.body.velocity.x = 200;}
	
	//shell stuff
	if(shell.body.x ==0){shell.body.velocity.x = 300;}
	if(shell.body.x > 7700){shell.kill();}
	if(shell2.body.x ==0){shell2.body.velocity.x = 300;}
	if(shell2.body.x > 7700){shell2.kill();}
	if(shell3.body.x ==0){shell3.body.velocity.x = 300;}
	if(shell3.body.x > 7700){shell3.kill();}
	
	if(!endGame){
	
	
			if((guy.body.x > 2121) && (guy.body.x < 3604) && (guy.body.y > 370)){ //guy falls in water
				this.gameOver(this);
			}
		
			if (cursors.up.isDown && this.time.now > jumpTimer && guy.body.velocity.y < -2){ //jump
				jump.play();
				guy.body.velocity.y = -450;
				jumpTimer = this.time.now + 750;
				guy.animations.play('jump',13,false);
			}

			if (cursors.right.isDown) //move right
			{
				if(!aButton.isDown){//walk
				guy.scale.x = 1; //facing default direction
				guy.body.velocity.x = 200;
				guy.animations.play('walk',13,true);//walk
				}
				else{//sprint
				guy.scale.x = 1; //facing default direction
				guy.body.velocity.x = 350;
				guy.animations.play('run',13,true);
			   }
			}
	
	
			else if (cursors.left.isDown) //move left
			{
				if(!aButton.isDown){ //walk
				guy.scale.x = -1; //flip
				guy.body.velocity.x = -200;
				guy.animations.play('walk', 13, true);
				}
				else{ //run
				guy.scale.x = -1; //flip
				guy.body.velocity.x = -350;
				guy.animations.play('run',13,true);
				}
			}
	
			else if (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown){ //stand still
				guy.animations.play('stand',13,true);
			}
		  
			if(guy.body.x > 7550){ //made it to castle
				theme.stop();
				this.state.start("Win");

			  }
			}
			
        else{ //died
			guy.animations.play('die',13,true);
			guy.body.collideWorldBounds = false;
			guy.body.immovable = true;
        }
}
};