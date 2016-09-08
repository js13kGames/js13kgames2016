function LevelTileController(position, width, height, type, index) {
	this.model = new LevelTileModel(position, width, height, type, index);
	this.view = new LevelTileView(this.model);
}

LevelTileController.prototype = {
	getPosition: function() {
		return this.model.position.copy();
	},
	destroy: function() {
		this.view.destroy();
	}
}
