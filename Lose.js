BasicGame.Lose = function (game) {
	this.background;
	this.resetButton;
	this.loseMusic;
};

BasicGame.Lose.prototype = {
    create: function () {
        this.world.setBounds(0,0,1028,520);
    	this.background = this.add.sprite(-1,0,'preloaderBackground');
    	this.resetButton = this.add.button(425,150, 'resetButton', this.restart, this);
    	this.loseMusic = this.add.audio('loseMusic');
    	this.loseMusic.play();
    },
    
    restart: function(pointer) {
    	this.loseMusic.stop();
		this.state.start('ChooseCharacter');
    },
    update: function() {
    }

};