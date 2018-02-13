//player class

(function(global) {
    var Player = function(x, y, speed, selectedPlayer) {
        //Setting the Player initial location and speed
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = selectedPlayer;
    };

    //Check for player reaching top of canvas and winning the game
    // increment score and Reset the game

    Player.prototype.update = function() {
        if (this.y < 0) {
            this.reset();
            updateScore();
        }
        this.isGemCollected();
    };

    Player.prototype.isGemCollected = function() {
        if (
            gem.x - 60 < this.x &&
            gem.x + 60 > this.x &&
            gem.y - 60 < this.y &&
            gem.y + 60 > this.y
        ) {
            handleGemCollection();
        }
    };

    //Reset the game by moving the player back to the initial location

    Player.prototype.reset = function() {
        this.x = 200;
        this.y = 380;
    };

    //replay the game

    //Draw the player on the screen

    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    //Receive user input, allowedKeys (the key which was pressed) and move the player according to that input
    //Player can not move off screen

    Player.prototype.handleInput = function(pressedKey) {
        if (pressedKey === 'left' && this.x > 0) {
            this.x -= this.speed;
        } else if (pressedKey === 'up' && this.y > 0) {
            this.y -= this.speed;
        } else if (pressedKey === 'right' && this.x < 400) {
            this.x += this.speed;
        } else if (pressedKey === 'down' && this.y < 400) {
            this.y += this.speed;
        }
    };

    global.Player = Player;
})(window);
