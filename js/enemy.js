(function (global) {
  /**
    * @constructor represents Enemy
    * @param {number} y
    * Setting the Enemy initial location and speed
    */

  var Enemy = function (y, onCollision) {
    this.x = 0
    this.y = y
    this.onCollision = onCollision
    this.sprite = 'images/enemy-bug.png'
    this.speed = Math.floor(Math.random() * 300) + 70
  }

  /**
    * @description Update the Enemy's position
    * @param {number} dt, a time delta between ticks
    * We should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    */

  Enemy.prototype.update = function (dt) {
    var arr = [60, 140, 230]
    var random = Math.floor(Math.random() * 3)
    if (this.x > 505) {
      this.x = 0
      this.y = arr[random]
    } else {
      this.x += Math.round(this.speed * dt)
    }
    this.checkCollision()
  }

  /**
    * @description Handles collision with the Player
    */

  Enemy.prototype.checkCollision = function () {
    if (
      this.x - 50 < player.x &&
            this.x + 50 > player.x &&
            this.y - 50 < player.y &&
            this.y + 50 > player.y
    ) {
      this.onCollision()
    }
  }

  /**
    * @description Draw the enemy on the screen
    */

  Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }
  global.Enemy = Enemy
})(window)
