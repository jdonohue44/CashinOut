BasicGame.Win = function (game) {
	this.background;
	this.resetButton;
	this.winMusic;
};

BasicGame.Win.prototype = {
    create: function () {
        this.world.setBounds(0,0,1028,520);
    	this.background = this.add.sprite(-1,0,'preloaderBackground');
		var style1 = { font: "48px Arial", fill: "white", align: "center" };
		var style2 = { font: "136px Comic Sans MS", fill: "#4B088A", align: "center" };
		var text1 = this.add.text(500,150, "Congratulations! \n", style1);
		var text2 = this.add.text(498,215, "YOU WIN", style2);
		text1.anchor.set(0.5);
		text2.anchor.set(0.5);
		
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