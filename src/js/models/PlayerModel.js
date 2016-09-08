function PlayerModel() {
	this.reset();
}

PlayerModel.prototype = {
	reset: function() {
		this.levelStarted = false;
		this.direction = 0;
		this.isOnFloor = false;
		this.size = PLAYER_SIZE;
		this.velocity = new Vector2(0, 0);
		this.position = new Vector2(0, 0);
		this.jumpCount = MAX_JUMPS;
	}
}
