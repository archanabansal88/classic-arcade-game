// Sets the initial player score.
var score = 0;
document.getElementById('player-score').innerHTML = score;

// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    this.x = 0;
    this.y = y;

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor(Math.random() * 300) + 70;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var arr = [60, 140, 230];
    var random = Math.floor(Math.random() * 3);
    if (this.x > 505) {
        this.x = 0;
        this.y = arr[random];
    } else {
        this.x += Math.round(this.speed * dt);
    }
    this.checkCollision();
};

Enemy.prototype.checkCollision = function() {
    if (
        this.x - 50 < player.x &&
        this.x + 50 > player.x &&
        this.y - 40 < player.y &&
        this.y + 40 > player.y
    ) {
        score = Math.max(0, --score);
        document.getElementById('player-score').innerHTML = score;
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

//Update the player's position,
Player.prototype.update = function() {
    //Check for player reaching top of canvas and winning the game

    if (this.y < 0) {
        score++;
        document.getElementById('player-score').innerHTML = score;
        this.reset();
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

//Draw the player on the screen,
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Receive user input, allowedKeys (the key which was pressed) and move the player according to that input
Player.prototype.handleInput = function(pressedKey) {
    if (pressedKey === 'left' && this.x > 0) {
        this.x -= 50;
    } else if (pressedKey === 'up' && this.y > 0) {
        this.y -= 50;
    } else if (pressedKey === 'right' && this.x < 400) {
        this.x += 50;
    } else if (pressedKey === 'down' && this.y < 400) {
        this.y += 50;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(60);
var enemy2 = new Enemy(140);
var enemy3 = new Enemy(230);
var allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
var player = new Player(200, 380, 50);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
