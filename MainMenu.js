BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic',1,true);
		this.music.play('',0,1,true);
		this.add.sprite(-1, 0, 'preloaderBackground');
		var style = { font: "48px Arial", fill: "#ffffff", align: "center" };
		
		var text = this.add.text(500, 120, "Richio & Dinio", style);
		text.anchor.set(0.5);
		//  And now we'll color in some of the letters
		text.addColor('#ffff00', 1);
		text.addColor('#ffffff', 5);
		text.addColor('#ff00ff', 10);
		text.addColor('#ffffff', 15);

		this.playButton = this.add.button(425,150, 'playButton', this.startGame, this);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)

		//	And start the actual game
		this.music.stop();
		this.state.start('ChooseCharacter');

	}

};