(function(global) {
    var Enemy = function(y) {
        // Variables applied to each of our instances go here,
        //Setting the Enemy initial location
        this.x = 0;
        this.y = y;

        // The image/sprite for our enemies
        this.sprite = 'images/enemy-bug.png';

        //Setting the Enemy speed
        this.speed = Math.floor(Math.random() * 300) + 70;
    };

    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    Enemy.prototype.update = function(dt) {
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

    //Handles collision with the Player
    //if the player collides with an enemy, the game is reset and the player moves back to the start square

    Enemy.prototype.checkCollision = function() {
        if (
            this.x - 50 < player.x &&
            this.x + 50 > player.x &&
            this.y - 40 < player.y &&
            this.y + 40 > player.y
        ) {
            score = Math.max(0, --score);
            scoreValue.innerHTML = score;
            player.reset();
        }
    };

    // Draw the enemy on the screen

    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    global.Enemy = Enemy;
})(window);
