function LevelTileController(position, width, height, type, index) {
	this.model = new LevelTileModel(position, width, height, type, index);
	this.view = new LevelTileView(this.model);
	GameEvents.on("glitchModeChanged", this.onGlitchModeChanged, this);
	this.onGlitchModeChanged();
}

LevelTileController.prototype = {
	getPosition: function() {
		return this.model.position.copy();
	},
	onGlitchModeChanged: function() {
		var shouldGlitch = (this.model.type.name === "floor" && window.glitchMode) || (this.model.type.name === "antifloor" && !window.glitchMode);
		this.model.isGlitching = shouldGlitch;
	},
	destroy: function() {
		this.view.destroy();
		GameEvents.off("glitchModeChanged", this.onGlitchModeChanged, this);
	}
}
