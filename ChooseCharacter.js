BasicGame.ChooseCharacter = function (game) {

	this.music = null;
	this.music2 = null;
	this.richButton = null;
	this.diniButton = null;

};

BasicGame.ChooseCharacter.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
		this.add.sprite(-1, 0, 'preloaderBackground');
		this.richButton = this.add.button(225,400, 'richChar', this.chooseRich, this);
		this.diniButton = this.add.button(725,400,'diniChar', this.chooseGuy, this);
		var style = { font: "22px Arial", fill: "#FFFF00", align: "center" };
		var style2 = { font: "22px Arial", fill: "#DF0101", align: "center" };
    	var text = this.add.text(210, 370, "Play as Rich", style);
    	var text2 = this.add.text(710, 370, "Play as Dini", style);
    	var style3 = { font: "48px Arial", fill: "#ffffff", align: "center" };
    	this.music = this.add.audio('coin');
    	this.music2 = this.add.audio('titleMusic');
		this.music2.play();
		
		var text3 = this.add.text(500, 120, "Richio & Dinio", style);
		text3.anchor.set(0.5);
		//  And now we'll color in some of the letters
		text3.addColor('#ffff00', 1);
		text3.addColor('#ffffff', 5);
		text3.addColor('#ff00ff', 10);
		text3.addColor('#ffffff', 15);
	},

	update: function () {

	},

	chooseRich: function (pointer) {
		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//	And start the actual game
		this.music2.stop();
		this.music.play();
		this.state.start('RichGame');

	},
	
	chooseGuy: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//	And start the actual game
		this.music2.stop();
		this.music.play();
		this.state.start('DiniGame');

	}

};