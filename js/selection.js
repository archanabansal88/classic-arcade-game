(function (global) {
  var playerSelection = document.getElementById('selection-container')

  /**
    * @constructor represents Selection
    * @param {array} players
    * @param {function} onPlayerSelection
    * selection of player
    */

  var Selection = function (players, onPlayerSelection) {
    this.sprite = players
    this.onPlayerSelection = onPlayerSelection
    this.init()
  }

  /**
    * @description initialize the app
    */

  Selection.prototype.init = function () {
    this.createMarkUp()
    this.attachEvent()
  }

  /**
    * @description create markup of list of players and add it to the page
    */
  Selection.prototype.createMarkUp = function () {
    var icons = this.sprite.map(function (value) {
      return `<li class='icon'><img src='${value}' class='image-icon' data-value = '${value}'/></li>`
    })
    var temp = `<h2 class="title">Please select a player</h2>\
                     <ul class = 'list' id = 'player-list'>
                        ${icons.join('')}
                     </ul>`
    playerSelection.innerHTML = temp
  }
  /**
    * @description set up the event listener for list of players
    */

  Selection.prototype.attachEvent = function () {
    var playerList = document.getElementById('player-list')
    playerList.addEventListener('click', this.handleClick.bind(this))
  }

  /**
    * @description check which player is clicked and invoke onPlayerSelection function with the selected player
    * @param{object} click event object
    */

  Selection.prototype.handleClick = function (event) {
    if (event.target.className === 'image-icon') {
      this.onPlayerSelection(event.target.dataset.value)
    }
  }

  global.Selection = Selection
})(window)
