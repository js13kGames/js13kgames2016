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
		this.jumpCount = MAX_JUMPS;
	},
	getAABB: function() {
		return {
			centre: new Vector2(this.position.x + this.size/2, this.position.y + this.size/2),
			xw: this.size / 2,
			yw: this.size / 2
		};
	}
}
