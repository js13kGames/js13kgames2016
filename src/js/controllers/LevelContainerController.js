function LevelContainerController() {
	this.model = new LevelContainerModel();
	this.view = new levelContainerView(this.model);
}

LevelContainerController.prototype = {
	generateLevelData: function(data) {
		this.model.generateLevelData(data);
	},
	destroyLevelData: function() {
		this.model.destroyLevelData();
	}
}
