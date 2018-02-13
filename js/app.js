//list of players
(function(global) {
    var score, life;

    var scoreValue = document.getElementById('player-score');
    var lifeValue = document.getElementById('player-life');
    var replay = document.getElementById('replay');

    var playersList = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
    ];

    var handlePlayerSelection = function(selectedPlayer) {
        // Place the player object in a variable called player
        score = 0;
        life = 3;
        lifeValue.innerHTML = life;
        scoreValue.innerHTML = score;

        global.player = new Player(200, 380, 50, selectedPlayer);

        var enemy1 = new Enemy(60);
        var enemy2 = new Enemy(140);
        var enemy3 = new Enemy(230);

        // Place all enemy objects in an array called allEnemies
        global.allEnemies = [enemy1, enemy2, enemy3];
        global.gem = new Gems();

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
        document.getElementById('score-display').classList.toggle('hide');
        document.getElementById('selection-container').classList.toggle('hide');
        startGame();
    };

    var a = new Selection(playersList, handlePlayerSelection);

    // document.getElementById('playButton').addEventListener('click', handlePlayAgain);

    // function handlePlayAgain() {
    //     document.getElementById('selection-container').classList.toggle('hide');
    //     replay.classList.toggle('gameOver');
    //     document.getElementById('score-display').classList.toggle('hide');
    // }

    function gameOver() {
        replay.classList.toggle('gameOver');
        player.x = 1000;
    }

    function handleCollision() {
        score = Math.max(0, --score);
        scoreValue.innerHTML = score;
        life = Math.max(0, --life);
        lifeValue.innerHTML = life;
        if (life === 0) {
            gameOver();
        } else {
            player.reset();
        }
    }

    function handleGemCollection() {
        score += 5;
        scoreValue.innerHTML = score;
        gem.hide();
    }

    function updateScore() {
        score++;
        scoreValue.innerHTML = score;
        gem.show();
    }

    global.handleGemCollection = handleGemCollection;
    global.gameOver = gameOver;
    global.handleCollision = handleCollision;
    global.updateScore = updateScore;
})(window);
