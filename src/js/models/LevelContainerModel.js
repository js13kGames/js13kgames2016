function LevelContainerModel() {
	this.reset();
}

LevelContainerModel.prototype = {
	reset: function() {
		this.spawnPoint = null,
		this.exit = null;
		this.floors = [];
		this.antifloors = [];
		this.blockers = [];
		this.checkpoints = [];
		this.activeCheckpoint = null;
		this.deathtiles = [];
		this.levelObjects = [];
	}
}
