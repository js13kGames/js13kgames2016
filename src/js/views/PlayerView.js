function PlayerView(model) {
	this.model = model;
	Events.on('draw', this.draw, this);
}

PlayerView.prototype = {
	draw: function() {
		if (!this.model.levelStarted) return;
		ctx.fillStyle = "pink";
		ctx.fillRect(this.model.position.x - this.model.size/2, this.model.position.y - this.model.size, this.model.size, this.model.size);
	}
}
