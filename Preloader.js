BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(-1, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(364, 200, 'preloaderBar');
		
		
// 		this.preloadBar.inputEnabled = true;
// 		this.preloadBar.events.onInputOver.add(over, this.preloadBar);
//     	this.preloadBar.events.onInputOut.add(out, this.preloadBar);

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('world', 'assets/world.png');
        this.load.image('platform1', 'assets/platform1.png');
        this.load.image('platform2', 'assets/platform2.png');
        this.load.spritesheet('guy','assets/rich.png',73.5,122.5);
        this.load.spritesheet('goomba','assets/goomba.png',40,42);
        this.load.audio('theme', ['assets/theme.wav']);
        this.load.audio('dieMusic', ['assets/fail.mp3']);
        this.load.audio('coin', ['assets/coin.wav']);
        this.load.audio('jump', ['assets/jump.wav']);
        this.load.audio('titleMusic', ['assets/titleMusic.wav']);
        this.load.image('castle','assets/castle.png');
        this.load.image('castle2','assets/castle2.png');
        this.load.image('shell','assets/shell.png');
        this.load.image('richChar','assets/richChar.png');
        this.load.image('diniChar','assets/diniChar.png');
        this.load.image('shell2','assets/shell.png');
        this.load.image('shell3','assets/shell.png');
        this.load.image('playButton', 'assets/play_button.png');
		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
	this.preloadBar.cropEnabled = false;
// 	var style = { font: "22px Arial", fill: "#FFFF00", align: "center" };
//     var text = this.game.add.text(425, 120, "Mama Mia!");

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the this.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};