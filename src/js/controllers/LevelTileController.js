function LevelTileController(position, width, height, type, index) {
	this.model = new LevelTileModel(position, width, height, type, index);
	this.view = new LevelTileView(this.model);
	GameEvents.on("glitchModeChanged", this.onGlitchModeChanged, this);
	this.onGlitchModeChanged(window.glitchMode);
}

LevelTileController.prototype = {
	getPosition: function() {
		return this.model.position.copy();
	},
	onGlitchModeChanged: function(glitchMode) {
		this.model.isGlitching = this.model.type.name === glitchMode;
	},
	destroy: function() {
		this.view.destroy();
		GameEvents.off("glitchModeChanged", this.onGlitchModeChanged, this);
	}
}
