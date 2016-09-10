function LevelTileView(model) {
	this.model = model;
	GameEvents.on('draw', this.draw, this);
}

LevelTileView.prototype = {
	draw: function(layer) {
		if (layer !== "level" && layer !== "background") return;
		if (layer === "level" && this.model.type.name === "blocker") return;
		if (layer === "background" && this.model.type.name !== "blocker") return;

		var scaledPosition = this.model.position.scale(window.gameScale);

		if (this.model.isGlitching) {
			ctx.globalAlpha = 0.1;
		} else {
			ctx.globalAlpha = 1;
		}

		var scaledSize = TILE_SIZE * window.gameScale;
		ctx.fillStyle = this.model.type.colour;
		ctx.fillRect(scaledPosition.x, scaledPosition.y, scaledSize, scaledSize);

		if (window.drawDebug) {
			ctx.fillStyle = "white";
			ctx.font = "12px sans-serif";
			ctx.textAlign = "left";
			ctx.fillText(this.model.index, scaledPosition.x + 6, scaledPosition.y + 18);
		}
	},
	destroy: function() {
		GameEvents.off('draw', this.draw, this);
	}
}
