BasicGame.Win = function (game) {
	this.moon;
	this.playAgainButton;
	this.winnerMusic;
};

BasicGame.Win.prototype = {
    create: function () {
    	this.world.setBounds(0,0,1028,520);
    	this.moon = this.add.sprite(0,0,'moon');
    	this.playAgainButton = this.add.button(80,400, 'playAgainButton', this.restart, this);
    	this.winnerMusic = this.add.audio('winnerMusic');
    	this.winnerMusic.play();
    },
    
    restart: function(pointer) {
        this.state.start('MainMenu');
    },
    
    update: function() {
    }

};