(function(global) {
    var score, life;
    var scoreValue = document.getElementById('player-score');
    var lifeValue = document.getElementById('player-life');
    var replay = document.getElementById('replay');

    /**
    * @constructor represents AppController
    */
    var AppController = function() {
        this.playersList = [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png',
        ];
        this.init();
    };

    /**
    * @description initialize the app
    */

    AppController.prototype.init = function() {
        var a = new Selection(this.playersList, this.handlePlayerSelection.bind(this));
        this.attachEvent();
    };

    /**
    * @description set up the event listener to play the game again
    */

    AppController.prototype.attachEvent = function() {
        document.getElementById('replay').addEventListener('click', () => {
            if (event.target.className === 'play-again') {
                this.gameOver();
            }
        });
    };

    /**
    * @description handling the selected player and start the game
    * @param {string} selectedPlayer
    */

    AppController.prototype.handlePlayerSelection = function(selectedPlayer) {
        score = 0;
        life = 3;
        lifeValue.innerHTML = life;
        scoreValue.innerHTML = score;
        this.createObject(selectedPlayer);
        document.getElementById('score-display').classList.toggle('hide');
        document.getElementById('selection-container').classList.toggle('hide');
        startGame();
    };

    /**
    * @description instantiating objects from Player, Enemy and Gems class
    * @param {string} selectedPlayer
    */

    AppController.prototype.createObject = function(selectedPlayer) {
        global.player = new Player(
            200,
            380,
            50,
            selectedPlayer,
            this.updateScore.bind(this),
            this.handleGemCollection.bind(this)
        );
        var enemy1 = new Enemy(60, this.handleCollision.bind(this));
        var enemy2 = new Enemy(140, this.handleCollision.bind(this));
        var enemy3 = new Enemy(230, this.handleCollision.bind(this));
        global.allEnemies = [enemy1, enemy2, enemy3];
        global.gem = new Gems();
        document.addEventListener('keyup', function(e) {
            var allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down',
            };

            player.handleInput(allowedKeys[e.keyCode]);
        });
    };

    /**
    * @description decrementing the score and life after the player collides with the enemy and reseting the game
    */

    AppController.prototype.handleCollision = function() {
        score = Math.max(0, --score);
        scoreValue.innerHTML = score;
        life = Math.max(0, --life);
        lifeValue.innerHTML = life;
        if (life === 0) {
            this.gameOver();
        } else {
            player.reset();
        }
    };

    /**
    * @description reseting the game after game is over
    */

    AppController.prototype.gameOver = function() {
        replay.classList.toggle('gameOver');
        score = 0;
        life = 3;
        lifeValue.innerHTML = life;
        scoreValue.innerHTML = score;
        player.reset();
        gem.show();
    };

    /**
    * @description incrementing the score if player collects the gem and hiding the gem
    */

    AppController.prototype.handleGemCollection = function() {
        score += 5;
        scoreValue.innerHTML = score;
        gem.hide();
    };

    /**
    * @description incrementing the score once the player reach the top of canvas and display the gem
    */

    AppController.prototype.updateScore = function() {
        score++;
        scoreValue.innerHTML = score;
        gem.show();
    };
    global.App = AppController;
})(window);

(function() {
    new App();
})();
