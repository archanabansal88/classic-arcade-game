(function(global) {
    /**
    * @constructor represents Player
    * @param {number} x
    * @param {number} y
    * @param {number} speed
    * @param {string} selectedPlayer
    * Setting the Player initial location and speed
    */
    var Player = function(x, y, speed, selectedPlayer, onUpdateScore, onGemCollection) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = selectedPlayer;
        this.onUpdateScore = onUpdateScore;
        this.onGemCollection = onGemCollection;
    };

    /**
    * @description update the player position on reaching top of canvas and Reset the game
    */

    Player.prototype.update = function() {
        if (this.y < 0) {
            this.reset();
            this.onUpdateScore();
        }
        this.isGemCollected();
    };

    /**
    * @description checking gem collection by the Player
    */

    Player.prototype.isGemCollected = function() {
        if (
            gem.x - 60 < this.x &&
            gem.x + 60 > this.x &&
            gem.y - 60 < this.y &&
            gem.y + 60 > this.y
        ) {
            this.onGemCollection();
        }
    };

    /**
    * @description Reset the game by moving the player back to the initial location
    */
    Player.prototype.reset = function() {
        this.x = 200;
        this.y = 380;
    };

    /**
    * @description Draw the player on the screen
    */

    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    /**
    * @description Receive user input, allowedKeys (the key which was pressed) and move the player according to that input
    * Player can not move off screen
    */

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
