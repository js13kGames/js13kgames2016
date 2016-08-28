function LevelContainerModel() {
	this.reset();
}

LevelContainerModel.prototype = {
	reset: function() {
		this.levelObjects = {
			spawnPoint: null,
			exit: null,
			floors: [],
			antifloors: [],
			blockers: []
		};
	}
}
