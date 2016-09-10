function LevelTileView(model) {
	this.model = model;
	GameEvents.on('draw', this.draw, this);
	this.glitchOffsets = [new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0)];
}

LevelTileView.prototype = {
	draw: function(layer) {
		if (layer !== "level" && layer !== "background") return;
		if (layer === "level" && this.model.type.name === "blocker") return;
		if (layer === "background" && this.model.type.name !== "blocker") return;

		switch (this.model.type.name) {
			case "floor":
			case "antifloor":
				if (this.model.isGlitching) {
					ctx.globalCompositeOperation = "multiply";
					this.drawRect("cyan", 0.1, this.glitchOffsets[0], this.model.isShowingGlitch);
					this.drawRect("magenta", 0.1, this.glitchOffsets[1], this.model.isShowingGlitch);
					this.drawRect("yellow", 0.1, this.glitchOffsets[2]), this.model.isShowingGlitch;
				} else {
					this.drawRect(this.model.type.colour, 1);
				}
			break;
			case "spawnPoint":
				var colour = Math.floor((255 * this.model.relativeSize)).toString(16);
				this.drawRect("#" + colour + colour + colour, 1);
			break;
			case "exit":
				var colour = Math.floor((255 * this.model.relativeSize)).toString(16);
				this.drawRect("#" + colour + colour + colour, 1);
			break;
			default:
				this.drawRect(this.model.type.colour, 1);
			break;
		}

		if (window.drawDebug) {
			ctx.fillStyle = "white";
			ctx.font = "12px sans-serif";
			ctx.textAlign = "left";
			ctx.fillText(this.model.index, scaledPosition.x + 6, scaledPosition.y + 18);
		}
		ctx.globalCompositeOperation = "source-over";
	},
	changeGlitchDisplay: function() {
		this.glitchOffsets[0].x = (Math.random() * 20) - 10;
		this.glitchOffsets[0].y = (Math.random() * 20) - 10;
		this.glitchOffsets[1].x = (Math.random() * 20) - 10;
		this.glitchOffsets[1].y = (Math.random() * 20) - 10;
		this.glitchOffsets[2].x = (Math.random() * 20) - 10;
		this.glitchOffsets[2].y = (Math.random() * 20) - 10;
	},
	resetGlitchDisplay: function() {
		this.glitchOffsets = [new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0)];
	},
	drawRect: function(colour, alpha, offset, randomiseCanvas) {
		if (!offset) {
			offset = new Vector2(0, 0);
		}
		var scaledPosition = this.model.position.scale(window.gameScale).add(offset);
		var scaledSize = TILE_SIZE * window.gameScale;
		if (randomiseCanvas) {
			ctx.drawImage(
				ctx.canvas,
				scaledPosition.x + this.model.canvasGrabSourcePosition.x,
				scaledPosition.y + this.model.canvasGrabSourcePosition.y,
				scaledSize + this.model.canvasGrabSize.x,
				scaledSize + this.model.canvasGrabSize.y,
				scaledPosition.x + this.model.canvasGrabDestPosition.x,
				scaledPosition.y + this.model.canvasGrabDestPosition.y,
				scaledSize + this.model.canvasGrabSize.x,
				scaledSize + this.model.canvasGrabSize.y
			);
		}
		ctx.globalAlpha = alpha;
		ctx.fillStyle = colour;
		ctx.fillRect(scaledPosition.x, scaledPosition.y, scaledSize * this.model.relativeSize, scaledSize * this.model.relativeSize);
	},
	destroy: function() {
		GameEvents.off('draw', this.draw, this);
	}
}
