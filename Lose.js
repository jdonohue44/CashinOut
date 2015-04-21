BasicGame.Lose = function (game) {
	this.water;
	this.playAgainButton;
	this.loserMusic;
};

BasicGame.Lose.prototype = {
    create: function () {
        this.world.setBounds(0,0,1028,520);
    	this.water = this.add.sprite(0,0,'water');
    	this.playAgainButton = this.add.button(80,400, 'playAgainButton', this.restart, this);
//     	this.loserMusic = this.add.audio('loserMusic');
//     	this.loserMusic.play();
    },
    
    restart: function(pointer) {
        this.state.start('MainMenu');
    },
    update: function() {
    }

};