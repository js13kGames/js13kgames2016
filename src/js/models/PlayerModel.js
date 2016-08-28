function PlayerModel() {
	this.reset();
	this.size = 30;
	this.velocity = new Vector2(0, 0);
	this.position = new Vector2(0, 0);	
}

PlayerModel.prototype = {
	reset: function() {
		// TODO: put window.glitchmode = false elsewhere.
		this.levelStarted = false;
		this.velocity = new Vector2(0, 0);

		this.direction = 0;
		this.isOnFloor = false;
	},
	getBounds: function() {
		return {
			top: this.position.y - this.size / 2,
			right: this.position.x + this.size / 2,
			bottom: this.position.y + this.size / 2,
			left: this.position.x - this.size / 2
		}
	}
}
