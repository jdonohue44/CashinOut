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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render});
    
    function preload() {
        game.load.image('world', 'assets/world.png');
        game.load.image('platform1', 'assets/platform1.png');
        game.load.image('water1','assets/water1.png');
        game.load.image('water2','assets/water1.png');
        game.load.spritesheet('guy','assets/guy.png',73.5,125);
        game.load.audio('theme', ['assets/theme.wav']);
    }
    
    var platform1;
    var world;
    var water1;
    var water2;
    var guy;
    var jumpTimer = 0;
    var aButton;
    var bButton;
    
    
    
    function create() {
    	game.world.setBounds(0, 0, 8000, 500);
    	game.physics.startSystem(Phaser.Physics.ARCADE);
    	game.physics.arcade.gravity.y = 250;
    	game.time.desiredFps = 30;
    	
    	world = game.add.sprite(0, 0, 'world');
        platform1= game.add.sprite(1990, 210, 'platform1'); 
        water1 = game.add.sprite(1993,116,'water1');
        water2 = game.add.sprite(1993,156,'water2');
        guy = game.add.sprite(50,500,'guy');
        
        game.physics.enable(guy, Phaser.Physics.ARCADE);
        game.physics.enable(platform1, Phaser.Physics.ARCADE);
        game.camera.follow(guy);
    	guy.body.bounce.y = 0.2;
        guy.body.collideWorldBounds = true;
        guy.body.gravity.set(0, 180);
        
        //game.add.audio('theme').play();
        guy.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11,12], 13, true);
        guy.animations.add('run', [13,14,15,16,17,18,19,20,21,22], 13, true);
        guy.animations.add('jump', [27,28,29,30,31,32,33,34,35,36,26],13,false);
        guy.animations.add('stand', [26],13,false);
        cursors = game.input.keyboard.createCursorKeys();
        aButton = game.input.keyboard.addKey(Phaser.Keyboard.DOWN); // 90
        bButton = game.input.keyboard.addKey(Phaser.Keyboard.X); // 88
    }
    
    function update() {
	guy.body.velocity.x = 0;

    if (cursors.right.isDown)
    {
    	guy.anchor.setTo(.5, 1); //so it flips around its middle
        guy.scale.x = 1; //facing default direction
    	guy.body.velocity.x = 250;
    	guy.animations.play('run',13,true);//walk
    	if(cursors.up.isDown){
    		guy.animations.play('jump',10,false);
    		}
    }
    
    if (cursors.right.isDown && aButton.isDown)
    {
    	guy.anchor.setTo(.5, 1); //so it flips around its middle
        guy.scale.x = 1; //facing default direction
    	guy.body.velocity.x = 350;
    	guy.animations.play('run',13,true);
    }
    
    if (cursors.left.isDown)
    {
    	guy.anchor.setTo(.5, 1); //so it flips around its middle
        guy.scale.x = -1; //flipped
    	guy.body.velocity.x = -250;
    	guy.animations.play('run', 13, true);
    }
    
    if (cursors.up.isDown && guy.body.onFloor() && game.time.now > jumpTimer){
        guy.body.velocity.y = -300;
    	jumpTimer = game.time.now + 750;
    	guy.animations.play('jump',8,false);
    	
    }
    
    if(!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown){
        guy.animations.play('stand',13,true);
    }
    }


function render() {
    game.debug.spriteCoords(guy, 32, 32);
}
};
