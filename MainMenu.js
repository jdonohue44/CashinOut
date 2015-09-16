BasicGame.MainMenu = function (game) {
	this.playButton = null;
	this.music = null;
};

BasicGame.MainMenu.prototype = {

	create: function () {
		this.add.sprite(-1, 0, 'preloaderBackground');
		var style = { font: "48px Arial", fill: "#ffffff", align: "center" };
		var text = this.add.text(500, 120, "Richio", style);
		text.anchor.set(0.5);
		//  And now we'll color in some of the letters
		text.addColor('#ffff00', 0);
		text.addColor('#ff00ff', 1);
		text.addColor('#9A2EFE', 2);
		text.addColor('#01DF01', 3);
		text.addColor('#FF0040', 4);
		text.addColor('#ffff00', 5);
		// Music
		this.music = this.add.audio("startMusic");
		this.music.play();
		this.playButton = this.add.button(425,150, 'playButton', this.startGame, this);
	},

	update: function () {
	},

	startGame: function (pointer) {
		this.state.start('ChooseCharacter');
	}

};