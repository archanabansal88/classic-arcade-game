(function(global) {
	var Gems = function() {
		this.show();
	};

	Gems.prototype.hide = function() {
		this.x = 1000;
	};

	Gems.prototype.show = function() {
		var arr = [60, 140, 230];
		var random = Math.floor(Math.random() * 3);
		var gems = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];
		this.x = Math.floor(Math.random() * 400);
		this.y = arr[random];
		this.sprite = gems[random];
	};

	Gems.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};

	global.Gems = Gems;
})(window);
