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
    //Test commit
//     "use strict";
    
    var game = new Phaser.Game( 900, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render});
    
    function preload() {
        game.load.image('world', 'assets/world.png');
        game.load.spritesheet('ralph', 'assets/ralph.png', 80, 77);
        game.load.image('dead','assets/dead.png'); //dead guy
        game.load.image('alive','assets/alive.png'); //alive guy
        game.load.image('piano','assets/piano.png'); //piano
        game.load.audio('soundtrack', ['assets/soundtrack.mp3']);
        game.load.audio('jump', ['assets/jump.mp3']);
        game.load.audio('shoot', ['assets/shoot.wav']);
        game.load.audio('applause', ['assets/applause.wav']);
        game.load.audio('boo', ['assets/boo.wav']);
        game.load.image('gameOver','assets/gameOver.png');//game over
    }
    //sprites
    var world;
    var ralph;
    var alive;
    var deads;
    
    //sounds
    var music;
    var jump;
    var shoot;
    
    var cursors;

    //other vars
    var counttext = 0;
    var counter = 60;
    var text;
    var jumpTimer = 0;
    var jumpTimer2 = 0;
    var fireRate = 100;
	var nextFire = 0;
	var fireButton;
	var pianos;
	var piano;
    var pianoTime = 0;
    var firingTimer = 0;
    
    
    
    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.time.desiredFps = 30;
        game.physics.arcade.gravity.y = 250;
    	game.world.setBounds(0, 0, 900, 600);
    	
    	world = game.add.sprite(0, 0, 'world');
        ralph = game.add.sprite(180, 600, 'ralph');
            
        //loop soundtrack
        music = game.add.audio('soundtrack',1,true);
        music.play('',0,1,true);
        
        game.physics.enable(ralph, Phaser.Physics.ARCADE);
        ralph.body.bounce.y = 0.2;
        ralph.body.collideWorldBounds = true;
        ralph.body.gravity.set(0, 180);
        
    	pianos = game.add.group();
    	pianos.enableBody = true;
    	pianos.physicsBodyType = Phaser.Physics.ARCADE;
    	pianos.createMultiple(30, 'piano');
    	pianos.setAll('anchor.x', 0.5);
    	pianos.setAll('anchor.y', 1);
    	pianos.setAll('outOfBoundsKill', true);
    	pianos.setAll('checkWorldBounds', true);
    	
    	
    	alives = game.add.group();
    	alives.enableBody = true;
    	alives.physicsBodyType = Phaser.Physics.ARCADE;
    	alives.createMultiple(30, 'alive');
    	alives.setAll('anchor.x', 0.5);
    	alives.setAll('anchor.y', 1);
    	alives.setAll('outOfBoundsKill', true);
    	alives.setAll('checkWorldBounds', true);
    	
    	deads = game.add.group();
    	deads.enableBody = true;
    	deads.physicsBodyType = Phaser.Physics.ARCADE;
    	deads.createMultiple(30, 'dead');
    	deads.setAll('anchor.x', 0.5);
    	deads.setAll('anchor.y', 1);
    	deads.setAll('outOfBoundsKill', true);
    	deads.setAll('checkWorldBounds', true);
    	
    	for (var i = 0; i < 25; i++)
    	{
           deads.create(game.rnd.integerInRange(70, 830), game.rnd.integerInRange(-100, -5000), 'dead');
   		}
   		
   		text = game.add.text(game.world.centerX+300, game.world.centerY-270, "0 Musicians Saved", {
        font: "22px Arial",
        fill: "#FF0000",
        align: "right"
    });

    text.anchor.setTo(0.5, 0.5);
    	
   	    ralph.animations.add('run');
        game.camera.follow(ralph);
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    

    function update() {
	ralph.body.velocity.x = 0;
	deads.setAll('body.velocity.y', 100)
	game.physics.arcade.collide(piano, deads, collisionHandler, null, this);
	game.physics.arcade.overlap(ralph, deads, enemyHitsPlayer, null, this);
    

    if (fireButton.isDown)
    {
        fire();
    }
    
    if (cursors.left.isDown) { 
        ralph.anchor.setTo(.5, 1); //so it flips around its middle
        ralph.scale.x = -1; //flipped
    	ralph.body.velocity.x = -250;
    	ralph.animations.play('run', 13, true);
    }
    
    if (cursors.up.isDown && ralph.body.onFloor() && game.time.now > jumpTimer) {
        jump = game.add.audio('jump');
        jump.play();
    	ralph.body.velocity.y = -300;
    	jumpTimer = game.time.now + 750;
    }
    

    if (cursors.right.isDown){    
        ralph.anchor.setTo(.5, 1); //so it flips around its middle
        ralph.scale.x = 1; //facing default direction
    	ralph.body.velocity.x = 250;
    	ralph.animations.play('run', 13, true);
    }
    
    if(!cursors.right.isDown && !cursors.left.isDown){
    	ralph.animations.stop();
    }

	game.physics.arcade.collide(ralph, deads);
    }
    
    function fire() {
    //  To avoid them being allowed to fire too fast we set a time limit
        shoot = game.add.audio('shoot');
        shoot.play();
    if (game.time.now > pianoTime)
    {
        //  Grab the first piano we can from the pool
        piano = pianos.getFirstExists(false);

        if (piano)
        {
            //  And fire it
            piano.reset(ralph.x, ralph.y + 8);
            piano.body.velocity.y = -500;
            pianoTime = game.time.now + 200;
        }
    }
}

	function collisionHandler (piano, dead) {
   	   dead.kill();
   	   piano.kill();
   	   var applause = game.add.audio('applause');
       applause.play()
   	   alive = alives.getFirstExists(false);
       alive.reset(dead.body.x+30, dead.body.y+100);
       updateText();
       
}

	function enemyHitsPlayer (ralph,dead) {
    	ralph.kill();
    	gameover();
    	}
    	
    function gameover(){
        music.stop();
    	game.stage.backgroundColor = '#FF0000';
    	var gameOverScreen = game.add.image(0, 0, 'gameOver');
    	var boo = game.add.audio('boo');
    	boo.play();
    	
    }
    
    function updateText() {

    counttext++;

    text.setText(counttext + " Musicians Saved");

}

function render() {
}
};