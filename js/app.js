// Sets the initial player score
var score = 0;
var player, allEnemies;
var scoreValue = document.getElementById('player-score');
scoreValue.innerHTML = score;

//list of players
var playersList = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
];

var handlePlayerSelection = function(selectedPlayer) {
    // Place the player object in a variable called player

    player = new Player(200, 380, 50, selectedPlayer);

    var enemy1 = new Enemy(60);
    var enemy2 = new Enemy(140);
    var enemy3 = new Enemy(230);

    // Place all enemy objects in an array called allEnemies
    allEnemies = [enemy1, enemy2, enemy3];

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
    document.getElementById('score').classList.toggle('hide');
    document.getElementById('selection-container').classList.add('hide');
    startGame();
};
var a = new Selection(playersList, handlePlayerSelection);
