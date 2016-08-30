function LevelContainerController() {
	this.colliderTypes = ["none", "spawnPoint", "exit", "floor", "antifloor", "blocker"];
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
				var width = canvas.width / row.length;
				var height = canvas.height / data.length;
				var x = width * c;
				var y = height * r;
				var type = this.colliderTypes[columnValue];
				var collider = new LevelColliderModel(new Vector2(x, y), width, height, type, 10 * r + c);

				if (columnValue == 1) {
					this.model.spawnPoint = collider;
				} else if (columnValue == 2) {
					this.model.exit = collider;
				} else {
					this.model[type + "s"].push(collider);
				}
				this.model.levelObjects.push(collider);
			}
		}
	},
	destroyLevelData: function() {
		for (var i = 0; i < this.model.levelObjects.length; i++) {
			var collider = this.model.levelObjects[i];
			collider.destroy();
		}
		this.model.reset();
	}
}
