function LevelContainerView(model) {
	this.model = model;
	GameEvents.on('draw', this.draw, this);
}

LevelContainerView.prototype = {
	draw: function(layer) {
		if (layer !== "background") return;
		ctx.fillStyle = "black";
		ctx.globalAlpha = 0.01;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	},
	destroy: function() {
		GameEvents.off("draw", this.draw, this);
	}
}
