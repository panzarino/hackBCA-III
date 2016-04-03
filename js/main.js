var game = new Phaser.Game(800, 600, 'game');
var highScore = 0;
var player;

var mainState = {
    preload: function(){
        game.load.image('player', 'assets/player.png');
        game.load.image('background', 'assets/background.jpg');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('green', 'assets/green.png');
        game.load.image('spike', 'assets/red.png');
        game.load.audio('jump', 'assets/jump.wav');
    },
    create: function(){
        game.add.sprite(0, 0, 'background');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.player = game.add.sprite(100, 400, 'player');
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 1000;
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spikes = game.add.group();
        this.ground = game.add.group();
        this.ground.enableBody = true;
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var grounds = this.ground.create(0, game.world.height-64, 'ground');
        grounds.scale.setTo(2, 2);
        grounds.body.immovable = true;
        this.gen();
        this.timer = game.time.events.loop(3000, this.gen, this);
        this.jumpSound = game.add.audio('jump');
        this.score = 0;
        this.scoreText = game.add.text(20, 20, "Score: "+this.score, {font: "30px Arial", fill: "#ffffff"});
        this.highScoreText = game.add.text(20, 50, "High Score: "+highScore, {font: "30px Arial", fill: "#ffffff"});
        player = this.player;
    },
    update: function(){
        this.score++;
        this.scoreText.text = "Score: "+this.score;
        this.updateScore();
        game.physics.arcade.overlap(this.player, this.spikes, this.restart)
        game.physics.arcade.collide(this.player, this.ground);
        game.physics.arcade.collide(this.player, this.platforms, this.moveUp);
        if (this.spaceKey.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -415;
            this.jumpSound.play();
        }
        this.spikes.forEach(function(spike){
            if (spike.body.x < -50){
                spike.kill();
            }
        });
        this.platforms.forEach(function(platform){
            if (platform.body.x < -50){
                platform.kill();
            }
        });
    },
    moveUp: function(){
        player.body.x = 100;
    },
    updateScore: function(){
        if (this.score > highScore){
            highScore = this.score;
            this.highScoreText.text = "High Score: "+highScore;
        };
    },
    restart: function(){
        game.state.start('main');
    },
    gen: function(){
        var num = game.rnd.integerInRange(1, 14);
        if (num == 1){
            this.spikeGen1();
        }
        else if (num == 2){
            this.spikeGen2();
        }
        else if (num == 3){
            this.spikeGen3();
        }
        else if (num == 4){
            this.spikeGen4();
        }
        else if (num == 5){
            this.platformGen1();
        }
        else if (num == 6){
            this.platformGen2();
        }
        else if (num == 7){
            this.platformGen3();
        }
        else if (num == 8){
            this.platformGen4();
        }
        else if (num == 9){
            this.platformGen5();
        }
        else if (num == 10){
            this.platformGen6();
        }
        else if (num == 11){
            this.platformGen7();
        }
        else if (num == 12){
            this.platformGen8();
        }
        else if (num == 13){
            this.platformGen9();
        }
        else if (num == 14){
            this.platformGen10();
        }
    },
    spikeGen1: function(){
        this.makeSpike(0, 0);
        this.makeSpike(55, 0);
        this.makeSpike(305, 0);
        this.makeSpike(360, 0);
        this.makeSpike(650, 0);
    },
    spikeGen2: function(){
        this.makeSpike(0, 0);
        this.makeSpike(315, 0);
        this.makeSpike(370, 0);
        this.makeSpike(680, 0);
    },
    spikeGen3: function(){
        this.makeSpike(0, 0);
        this.makeSpike(55, 0);
        this.makeSpike(370, 0);
        this.makeSpike(680, 0);
    },
    spikeGen4: function(){
        this.makeSpike(0, 0);
        this.makeSpike(310, 0);
        this.makeSpike(620, 0);
    },
    platformGen1: function(){
        this.makePlatform(0, 0);
        this.makeSpike(65, 0);
        this.makePlatform(250, 50);
        this.makeSpike(315, 50);
        this.makeSpike(250, 0);
        this.makePlatform(500, 100);
        this.makeSpike(565, 50);
        this.makeSpike(745, 150);
        this.makePlatform(810, 150);
    },
    platformGen2: function(){
        this.makePlatform(0, 0);
        this.makeSpike(65, 0);
        this.makePlatform(400, 100);
        this.makeSpike(465, 50);
        this.makeSpike(750, 0);
    },
    platformGen3: function(){
        this.makeSpike(1, -3);
        this.makePlatform(0, 0);
        this.makePlatform(50, 0);
        this.makePlatform(100, 0);
        this.makePlatform(150, 0);
        this.makePlatform(200, 0);
        this.makeSpike(0, 150);
        this.makeSpike(50, 125);
        this.makeSpike(100, 101);
        this.makeSpike(130, 101);
        this.makeSpike(265, 0);
        this.makeSpike(715, 0);
    },
    platformGen4: function(){
        this.makeSpike(0, 0);
        this.makePlatform(150, 0);
        this.makeSpike(215, 0);
        this.makePlatform(350, 50);
        this.makeSpike(350,0);
        this.makeSpike(400, 0);
        this.makeSpike(450, 0);
        this.makeSpike(750, 0);
        this.makeSpike(815, 0);
    },
    platformGen5: function(){
        this.makePlatform(0,0);
        this.makeSpike(0, -3);
        this.makePlatform(250, 50);
        this.makeSpike(250, 0);
        this.makePlatform(500, 100);
        this.makeSpike(500, 50);
        this.makeSpike(500, 0);
        this.makeSpike(550, 50);
        this.makeSpike(550, 0);
        this.makeSpike(600, 0);
    },
    platformGen6: function(){
        this.makePlatform(0, 0);
        this.makeSpike(0, -3);
        this.makePlatform(250, 50);
        this.makeSpike(250, 0);
        this.makeSpike(250, 48);
        this.makeSpike(420, 0);
        this.makePlatform(600, 25);
        this.makeSpike(660, 0);
    },
    platformGen7: function(){
        this.makePlatform(0, 0);
        this.makeSpike(0, -3);
        this.makeSpike(65, 0);
        this.makeSpike(250, 50);
        this.makeSpike(500, 15);
    },
    platformGen8: function(){
        this.makeSpike(0, 0);
        this.makePlatform(50, 20);
        this.makeSpike(50, 18);
        this.makeSpike(50, 0);
        this.makeSpike(115, 0);
        this.makePlatform(300, 75);
        this.makeSpike(300, 54);
        this.makeSpike(300, 72);
        this.makeSpike(365, 75);
        this.makeSpike(540, 140);
        this.makeSpike(570, 140);
        this.makeSpike(565, 0);
        this.makeSpike(630, 0);
        this.makeSpike(850, 55);
    },
    platformGen9: function(){
        this.makeSpike(0, 0);
        this.makeSpike(65, 0);
        this.makePlatform(130, 0);
        this.makeSpike(200, 0);
        this.makePlatform(460, 20);
        this.makeSpike(460, 15);
        this.makeSpike(460, 0);
        this.makeSpike(500, 0);
    },
    platformGen10: function(){
        this.makeSpike(0, 0);
        this.makePlatform(500, 0);
        this.makeSpike(500, -3);
        this.makeSpike(500, 125);
        this.makeSpike(760, 60);
    },
    makeSpike: function(num, h){
        var spike = game.add.sprite(800+num, game.world.height - (114+h), 'spike');
        this.spikes.add(spike);
        game.physics.arcade.enable(spike);
        spike.body.velocity.x = -400;
    },
    makePlatform: function(num, h){
        var platform = game.add.sprite(800+num, game.world.height - (114+h), 'green');
        this.platforms.add(platform);
        game.physics.arcade.enable(platform);
        platform.body.immovable = true;
        platform.body.velocity.x = -400;
        platform.body.checkCollision.left = false;
    }
};
game.state.add('main', mainState);
game.state.start('main');