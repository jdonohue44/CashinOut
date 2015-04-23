BasicGame.Win = function (game) {
	this.background;
	this.resetButton;
	this.winMusic;
};

BasicGame.Win.prototype = {
    create: function () {
        this.world.setBounds(0,0,1028,520);
    	this.background = this.add.sprite(-1,0,'preloaderBackground');
		var style = { font: "48px Arial", fill: "#ffffff", align: "center" };
		var text = this.add.text(500,230, "Congratulations! \nYou win!\n", style);
		text.anchor.set(0.5);
		//  And now we'll color in some of the letters
		text.addColor('#ffff00', 16);
		text.addColor('#ffffff', 25);
		text.addColor('#ff00ff', 28);
		text.addColor('#ffffff', 32);
		
    	this.winMusic = this.add.audio('winMusic');
        this.winMusic.play();
    },
    
    restart: function(pointer) {
    	this.winMusic.stop();
        this.state.start('ChooseCharacter');
    },
    
    update: function() {
    }

};