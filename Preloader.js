BasicGame.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

BasicGame.Preloader.prototype = {

	preload: function () {
	
		//	These are the assets we loaded in Boot.js
		this.background = this.add.sprite(-1, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(364, 200, 'preloaderBar');
		
		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);
		
		//	Here we load the rest of the assets our game needs.
		this.load.image('world', 'assets/world.png');
        this.load.image('platform1', 'assets/platform1.png');
        this.load.image('platform2', 'assets/platform2.png');
        this.load.spritesheet('rich','assets/guy4.png',73.5,122.5);
        this.load.spritesheet('dini','assets/guy2.png',89,95);
        this.load.spritesheet('goomba','assets/goomba.png',40,42);
        this.load.audio('theme', ['assets/theme.wav']);
        this.load.audio('dieMusic', ['assets/gameover.wav']);
        this.load.audio('coin', ['assets/coin.wav']);
        this.load.audio('jump', ['assets/jump.wav']);
        this.load.audio('titleMusic', ['assets/titleMusic.wav']);
        this.load.audio('winMusic', ['assets/win.wav']);
        this.load.audio('loseMusic', ['assets/lose.wav']);
        this.load.audio('startMusic', ['assets/start.wav']);
        this.load.image('castle','assets/castle.png');
        this.load.image('shell','assets/shell.png');
        this.load.image('richChar','assets/richChar.png');
        this.load.image('diniChar','assets/diniChar.png');
        this.load.image('shell2','assets/shell.png');
        this.load.image('shell3','assets/shell.png');
        this.load.image('mole','assets/mole.png');
        this.load.image('mole2','assets/mole.png');
        this.load.image('mole3','assets/mole.png');
        this.load.image('mole4','assets/mole.png');
        this.load.image('mole5','assets/mole.png');
        this.load.image('playButton', 'assets/play_button.png');
        this.load.image('resetButton', 'assets/reset.png');
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}
	}
};