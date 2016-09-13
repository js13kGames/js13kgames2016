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
		this.scaledPosition = this.model.position.scale(window.gameScale);
		this.scaledSize = TILE_SIZE * window.gameScale;
		switch (this.model.type.name) {
			case "floor":
			case "antifloor":
				if (this.model.isGlitching) {
					ctx.globalCompositeOperation = "multiply";
					this.drawRect("cyan", 1, this.glitchOffsets[0], this.model.isShowingGlitch);
					this.drawRect("magenta", 1, this.glitchOffsets[1], this.model.isShowingGlitch);
					this.drawRect("yellow", 1, this.glitchOffsets[2]), this.model.isShowingGlitch;
					ctx.globalCompositeOperation = "source-over";
					ctx.strokeStyle = "white";
					ctx.globalAlpha = 0.5;
					ctx.strokeRect(this.scaledPosition.x, this.scaledPosition.y, this.scaledSize, this.scaledSize);
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
			case "checkpoint":
				var colour = this.model.isCheckpointActive ? "white" : this.model.type.colour;
				this.drawRect(colour, 1);
			break;
			default:
				this.drawRect(this.model.type.colour, 1);
			break;
		}

		if (DRAW_DEBUG) {
			ctx.fillStyle = "white";
			ctx.font = "12px sans-serif";
			ctx.textAlign = "left";
			ctx.fillText(this.model.index, this.scaledPosition.x + 6, this.scaledPosition.y + 18);
		}
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
		
		if (randomiseCanvas) {
			ctx.drawImage(
				ctx.canvas,
				this.scaledPosition.x + this.model.canvasGrabSourcePosition.x + offset.x,
				this.scaledPosition.y + this.model.canvasGrabSourcePosition.y + offset.y,
				this.scaledSize + this.model.canvasGrabSize.x,
				this.scaledSize + this.model.canvasGrabSize.y,
				this.scaledPosition.x + this.model.canvasGrabDestPosition.x + offset.x,
				this.scaledPosition.y + this.model.canvasGrabDestPosition.y + offset.y,
				this.scaledSize + this.model.canvasGrabSize.x,
				this.scaledSize + this.model.canvasGrabSize.y
			);
		}
		ctx.globalAlpha = alpha;
		ctx.fillStyle = colour;
		ctx.fillRect(this.scaledPosition.x + offset.x, this.scaledPosition.y + offset.y, this.scaledSize * this.model.relativeSize, this.scaledSize * this.model.relativeSize);
	},
	destroy: function() {
		GameEvents.off('draw', this.draw, this);
	}
}
