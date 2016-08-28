function PlayerModel() {
	this.reset();
}

PlayerModel.prototype = {
	reset: function() {
		this.levelStarted = false;
		this.direction = 0;
		this.isOnFloor = false;
		this.size = 30;
		this.velocity = new Vector2(0, 0);
		this.position = new Vector2(0, 0);	
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
