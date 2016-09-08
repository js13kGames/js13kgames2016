function LevelTileView(model) {
	this.model = model;
	GameEvents.on('draw', this.draw, this);
}

LevelTileView.prototype = {
	draw: function(layer) {
		if (layer !== "level") return;
		var scaledPosition = this.model.position.scale(window.gameScale);
		var scaledSize = TILE_SIZE * window.gameScale;
		ctx.fillStyle = this.model.type.colour;
		ctx.fillRect(scaledPosition.x, scaledPosition.y, scaledSize, scaledSize);

		if (window.drawDebug) {
			ctx.fillStyle = "white";
			ctx.fillText(this.model.index, scaledPosition.x, scaledPosition.y + 10);
		}
	},
	destroy: function() {
		GameEvents.off('draw', this.draw, this);
	}
}
