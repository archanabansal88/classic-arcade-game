// list of players
(function(global) {
    var playerSelection = document.getElementById('selection-container');

    //Selection class for selecting players
    var Selection = function(players, onPlayerSelection) {
        this.sprite = players;
        this.onPlayerSelection = onPlayerSelection;
        this.init();
    };

    Selection.prototype.init = function() {
        this.createMarkUp();
        this.attachEvent();
    };

    //
    Selection.prototype.createMarkUp = function() {
        var icons = this.sprite.map(function(value) {
            return `<li class='icon'><img src='${value}' class='image-icon' data-value = '${value}'/></li>`;
        });
        var temp = `<h2 class="title">Please select a player</h2>\
                     <ul class = 'list' id = 'player-list'>
                        ${icons.join('')}
                     </ul>`;
        playerSelection.innerHTML = temp;
    };

    Selection.prototype.attachEvent = function() {
        var playerList = document.getElementById('player-list');
        playerList.addEventListener('click', this.handleClick.bind(this));
    };

    Selection.prototype.handleClick = function(event) {
        if (event.target.className === 'image-icon') {
            this.onPlayerSelection(event.target.dataset.value);
        }
    };

    global.Selection = Selection;
})(window);
