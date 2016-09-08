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
			var glitchRoll = Math.random();
			if (glitchRoll > 0.9) {
				ctx.globalAlpha = Math.random();
				glitchAmount = ((glitchRoll * 2) - 1) * 10;
				scaledPosition.x += ((Math.random() * 10) - 5) * window.gameScale;
			}
		} else {
			ctx.globalAlpha = 1;
		}

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
