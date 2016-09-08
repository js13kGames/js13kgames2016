function LevelContainerController() {
	this.model = new LevelContainerModel();
	this.view = new LevelContainerView(this.model);
}

LevelContainerController.prototype = {
	generateLevelData: function(data) {
		for (var r = 0; r < data.length; r++) {
			var row = data[r];
			for (var c = 0; c < row.length; c++) {
				var columnValue = row[c];

				if (columnValue == 0) continue;
				var width = TILE_SIZE;
				var height = TILE_SIZE;
				var x = width * c;
				var y = height * r;
				var type = TILE_TYPES[columnValue];
				var tile = new LevelTileController(new Vector2(x, y), width, height, type, 10 * r + c);

				if (columnValue == 1) {
					this.model.spawnPoint = tile;
				} else if (columnValue == 2) {
					this.model.exit = tile;
				} else {
					this.model[type.name + "s"].push(tile);
				}
				this.model.levelObjects.push(tile);
			}
		}
	},
	destroyLevelData: function() {
		for (var i = 0; i < this.model.levelObjects.length; i++) {
			var tile = this.model.levelObjects[i];
			tile.destroy();
		}
		this.model.reset();
	},
	getSpawnPosition: function() {
		return this.model.spawnPoint.getPosition();
	}
}
