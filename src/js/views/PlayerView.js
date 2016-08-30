function PlayerView(model) {
	this.model = model;
	GameEvents.on('draw', this.draw, this);
}

PlayerView.prototype = {
	draw: function() {
		if (!this.model.levelStarted) return;
		ctx.fillStyle = "rgb(255, 235, 59)";
		ctx.fillRect(this.model.position.x , this.model.position.y, this.model.size, this.model.size);
	}
}
