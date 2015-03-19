window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render});
    
    function preload() {
        game.load.image('world', 'assets/world.png');
        game.load.image('platform1', 'assets/platform1.png');
        game.load.image('platform2', 'assets/platform2.png');
        game.load.spritesheet('guy','assets/guy.png',73.5,122.5);
        game.load.audio('theme', ['assets/theme.wav']);
        game.load.audio('dieMusic', ['assets/dieMusic.wav']);
        game.load.audio('jump', ['assets/jump.wav']);
        game.load.image('castle','assets/castle.png');
        game.load.image('castle2','assets/castle2.png');
        game.load.image('shell','assets/shell.png');
    }
    
    var platform1;
    var platform2;
    var platform3;
    var platform4;
    var platform5;
    var world;
    var guy;
    var castle;
    var castle2;
    var shell;
    var jumpTimer = 0;
    var aButton;
    var bButton;
    var theme;
    var cursors;
    var endGame;
    var jump;
    
    
    
    function create() {
    	game.world.setBounds(0, 0, 8000, 520);
    	game.physics.startSystem(Phaser.Physics.ARCADE);
    	game.physics.arcade.gravity.y = 250;
    	game.time.desiredFps = 30;
    	
    	world = game.add.sprite(0, 0, 'world'); 
    	castle = game.add.sprite(7500,150,'castle');
        platform1 = game.add.sprite(1920, 420, 'platform1');
        platform2 = game.add.sprite(2220, 420, 'platform2');
        platform3 = game.add.sprite(2520, 420, 'platform2');
        platform4 = game.add.sprite(2820, 420, 'platform2');
        platform5 = game.add.sprite(3120, 420, 'platform2');
        guy = game.add.sprite(50,520,'guy');
        shell = game.add.sprite(800,580,'shell');
        
        game.physics.enable(guy, Phaser.Physics.ARCADE);
        game.physics.enable(platform1, Phaser.Physics.ARCADE);
        game.physics.enable(platform2, Phaser.Physics.ARCADE);
        game.physics.enable(platform3, Phaser.Physics.ARCADE);
        game.physics.enable(platform4, Phaser.Physics.ARCADE);
        game.physics.enable(platform5, Phaser.Physics.ARCADE);
        game.physics.enable(shell, Phaser.Physics.ARCADE);
        
        game.camera.follow(guy);
    	guy.body.bounce.y = 0.2;
        guy.body.collideWorldBounds = true;
        guy.body.gravity.set(0, 180);
        
        platform1.body.collideWorldBounds = true;
        platform1.body.bounce.y = 0.2;
        platform1.body.immovable = true;
        platform1.body.gravity.set(0, 0);
        
        platform2.body.collideWorldBounds = true;
        platform2.body.bounce.y = 0.2;
        platform2.body.immovable = true;
        platform2.body.gravity.set(0, 0);
        
        platform3.body.collideWorldBounds = true;
        platform3.body.bounce.y = 0.2;
        platform3.body.immovable = true;
        platform3.body.gravity.set(0, 0);
        
        platform4.body.collideWorldBounds = true;
        platform4.body.bounce.y = 0.2;
        platform4.body.immovable = true;
        platform4.body.gravity.set(0, 0);
        
        platform5.body.collideWorldBounds = true;
        platform5.body.bounce.y = 0.2;
        platform5.body.immovable = true;
        platform5.body.gravity.set(0, 0);
        
        shell.body.collideWorldBounds = true;
        shell.body.velocity.x = -380;
        
        theme = game.add.audio('theme',1,true);
        jump = game.add.audio('jump');
        theme.play('',0,1,true);
        
        
        guy.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11,12], 13, true);
        guy.animations.add('run', [13,14,15,16,17,18,19,20,21,22], 13, true);
        guy.animations.add('jump', [27,28,29,30,31,32,33,34,35,36,26],13,false);
        guy.animations.add('stand', [26],13,false);
        guy.animations.add('turn', [40],13,false);
        guy.animations.add('die', [31],13,false);
        guy.anchor.setTo(.5, 1); //so it flips around its middle
        
        cursors = game.input.keyboard.createCursorKeys();
        aButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        bButton = game.input.keyboard.addKey(Phaser.Keyboard.X);
    }
    
    function update() {
    game.physics.arcade.collide(guy, platform1);
    game.physics.arcade.collide(guy, platform2);
    game.physics.arcade.collide(guy, platform3);
    game.physics.arcade.collide(guy, platform4);
    game.physics.arcade.collide(guy, platform5);
    game.physics.arcade.collide(guy, shell, collisionHandler, null, this);
	guy.body.velocity.x = 0;
	
	if((guy.body.x > 2121) && (guy.body.x < 3604) && (guy.body.y > 370)){
		theme.stop();
    	var dieMusic = game.add.audio('dieMusic');
    	dieMusic.play();
		guy.body.velocity.y = -300;
		endGame =true;
	}
	
	if(shell.body.x ==0){shell.body.velocity.x = 380;}
	if(shell.body.x > 7700){shell.kill();}
	
	if(!endGame){
		
	if (cursors.up.isDown && game.time.now > jumpTimer && guy.body.velocity.y < -2){ 
   	    jump.play();
        guy.body.velocity.y = -300;
    	jumpTimer = game.time.now + 750;
    	guy.animations.play('jump',13,false);
    }

    if (cursors.right.isDown)
    {
    	if(!aButton.isDown){
        guy.scale.x = 1; //facing default direction
    	guy.body.velocity.x = 200;
    	guy.animations.play('walk',13,true);//walk
    	}
    	else{
        guy.scale.x = 1; //facing default direction
    	guy.body.velocity.x = 350;
    	guy.animations.play('run',13,true);
       }
    }
    
    
    else if (cursors.left.isDown)
    {
    	if(!aButton.isDown){
        guy.scale.x = -1; //flipped
    	guy.body.velocity.x = -200;
    	guy.animations.play('walk', 13, true);
    	}
    	else{
        guy.scale.x = -1; //facing default direction
    	guy.body.velocity.x = -350;
    	guy.animations.play('run',13,true);
        }
    }
    
    else if (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown){
        guy.animations.play('stand',13,true);
    }
    	  
    if(guy.body.x > 7400){
    	castle2 = game.add.sprite(7500,150,'castle2');
    	guy.bringToTop();
    	if(guy.body.x > 7650){
    		guy.animations.play('turn',13,false);
    		guy.body.velocity.x = 0;
    		var style = { font: "48px Arial", fill: "#ffffff", align: "center" };
    		var text = game.add.text(guy.body.x - 200, guy.body.y - 170, "Congratulations! \nYou win!\n", style);
			text.anchor.set(0.5);
			//  And now we'll color in some of the letters
			text.addColor('#ffff00', 16);
			text.addColor('#ffffff', 25);
			text.addColor('#ff00ff', 28);
			text.addColor('#ffffff', 32);
    	}
    }
    }
        else{
    	guy.animations.play('die',13,true);
    	guy.body.collideWorldBounds = false;
    	guy.body.immovable = true;
    }
    }

function gameOver(){
	theme.stop();
    var dieMusic = game.add.audio('dieMusic');
    dieMusic.play();
	guy.body.velocity.y = -300;
	endGame = true;
}

function collisionHandler (guy, shell) {
   	   gameOver();
}

function fall(){
	   gameOver();
}

function render() {
   //  game.debug.spriteCoords(guy, 32, 32);
}
};
