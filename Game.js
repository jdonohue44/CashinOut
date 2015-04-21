
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
	this.launchButton;
	this.quitButton;
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

BasicGame.Game.prototype = {

    create: function () {
    	 this.game.world.setBounds(0,0,1028,6000);
         this.game.physics.startSystem(Phaser.Physics.ARCADE);
    	 this.game.time.desiredFps = 30;
    	 
	     this.world = this.game.add.sprite(0, 0, 'world');
	     this.alien = this.game.add.sprite(460,5780,'alien');
	     
	     this.redStool = this.add.button(60,4850, 'redStool', this.decelerate, this);
	     this.redFuel = this.game.add.button(800,4490,'redFuel',this.accelerate,this);
	     this.redFuel2 = this.game.add.button(800,3900,'redStool',this.decelerate,this);
	     this.blueStool = this.game.add.button(60,3180,'blueStool', this.decelerate, this);
	     this.blueFuel = this.game.add.button(800,2500,'blueFuel', this.accelerate,this);
	     this.blueFuel2 = this.game.add.button(800,1900,'blueStool', this.decelerate,this);
	     this.blueStool2 = this.game.add.button(60,1000,'blueStool', this.decelerate, this);
	     this.redStool2 = this.add.button(800,600, 'redStool', this.decelerate, this);
	     
	     
	     this.blueFuel3 = this.game.add.button(800,280,'blueFuel', this.accelerate,this);
	     
	     this.launchMusic = this.add.audio('launchMusic');
	     this.stoolMusic = this.add.audio('stoolMusic');
	     this.fuelMusic = this.add.audio('fuelMusic');
	     this.splashMusic = this.add.audio('splashMusic');
	     this.getmehome = this.add.audio('getmehome');
	     this.getmehome.play();
	     
		 this.game.physics.enable(this.alien, Phaser.Physics.ARCADE);
    	 this.alien.collideWorldBounds = true;
    	 this.game.camera.follow(this.alien);
    	 	 
	     this.launchButton = this.add.button(700,5800, 'launchButton', this.launch, this);
	     this.quitButton = this.add.button(70,5800, 'quitButton', this.quitGame, this);
	     
    },

    update: function () {
    	if(this.alien.body.y > 6000){
    		this.splashMusic.play();
    		this.state.start('Lose');
    	}
    	if(this.alien.body.y < 0){
    		this.state.start('Win');
    	}


    },
    
    launch: function (pointer) {

		this.launchMusic.play();
		this.game.physics.arcade.gravity.y = 165;
		this.alien.body.velocity.y = -820;
		this.quitButton.kill();
		this.launchButton.kill();
		 

	},
	
	accelerate: function (pointer) {
		this.fuelMusic.play();
		this.alien.body.velocity.y -= 400;
	},
	
	decelerate: function (pointer) {
		this.stoolMusic.play();
		this.alien.body.velocity.y += 200;
	},

    quitGame: function (pointer) {
        this.state.start('MainMenu');
    }

};