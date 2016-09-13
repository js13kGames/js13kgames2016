function LevelTileController(position, width, height, type, index, startSize) {
	this.model = new LevelTileModel(position, width, height, type, index, startSize);
	this.view = new LevelTileView(this.model);
	GameEvents.on("glitchModeChanged", this.onGlitchModeChanged, this);
	GameEvents.on("update", this.update, this);
	this.onGlitchModeChanged(window.glitchMode);
}

LevelTileController.prototype = {
	getPosition: function() {
		return this.model.position.copy();
	},
	onGlitchModeChanged: function(glitchMode) {
		this.model.isGlitching = this.model.type.name === glitchMode;
	},
	update: function(dt) {
		if (this.model.isGlitching) {
			if (!this.model.isShowingGlitch) {
				if (Math.random() > 0.9) {
					this.model.isShowingGlitch = true;
					this.model.glitchStartTime = Date.now();
					this.generateGlitchParameters();
				}
			} else {
				if (Math.random() > 0.99) {
					this.view.changeGlitchDisplay();
				}
				if (Date.now() - this.model.glitchStartTime > this.model.glitchTime) {
					this.model.isShowingGlitch = false;
					this.view.resetGlitchDisplay();
				}
			}
		}
		if (this.model.type.name === "spawnPoint") {
			this.model.relativeSize = (this.model.relativeSize + dt) % 1;
		}
		if (this.model.type.name === "exit") {
			this.model.relativeSize = (1 + (this.model.relativeSize - dt)) % 1;
		}
	},
	generateGlitchParameters: function() {
		this.model.glitchTime = Math.random() * 2000;
		this.model.canvasGrabSize = this.generateRandomSizeVector();
		this.model.canvasGrabSourcePosition = this.generateRandomSizeVector();
		this.model.canvasGrabDestPosition = this.generateRandomSizeVector();
	},
	generateRandomSizeVector: function() {
		return new Vector2(
			((Math.random() * TILE_SIZE) - TILE_SIZE/2) * window.gameScale,
			((Math.random() * TILE_SIZE) - TILE_SIZE/2) * window.gameScale
		);
	},
	destroy: function() {
		this.view.destroy();
		GameEvents.off("glitchModeChanged", this.onGlitchModeChanged, this);
		GameEvents.off("update", this.update, this);
	}
}
