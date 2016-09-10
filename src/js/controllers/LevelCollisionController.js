function LevelCollisionController() {
	this.collisions = [];
	this.OVERLAP = 30;
}

LevelCollisionController.prototype = {
	generateCollisionsFromLevelData: function(data) {
		if (!data) {
			throw new Error("No data provided");
		}

		var row, col, r, c;
		var prevCell, currentCell;
		var width = TILE_SIZE;
		var height = TILE_SIZE;

		for (r = 0; r < data.length; r++) {
			prevCell = undefined;
			for (c = 0; c < data[r].length; c++) {
				currentCell = data[r][c];
				if (prevCell != undefined) {
					if (prevCell != currentCell) {
						if (currentCell !== 0) {
							this.collisions.push(new LineColliderController(
								new Vector2(width * c, height * r),
								new Vector2(width * c, height * (r+1)),
								currentCell
							));
						}
						if (prevCell !== 0) {
							this.collisions.push(new LineColliderController(
								new Vector2(width * c, height * (r+1)),
								new Vector2(width * c, height * r),
								prevCell
							));
						}
						
					}
				}
				prevCell = currentCell;
			}
		}

		for (c = 0; c < data[0].length; c++) {
			for (r = 0; r < data.length; r++) {
				currentCell = data[r][c];
				if (prevCell != undefined) {
					if (prevCell != currentCell) {
						if (currentCell !== 0) {
							this.collisions.push(new LineColliderController(
								new Vector2(width * (c+1), height * r),
								new Vector2(width * c, height * r),
								currentCell
							));
						}
						if (prevCell !== 0) {
							this.collisions.push(new LineColliderController(
								new Vector2(width * c, height * r),
								new Vector2(width * (c+1), width * r),
								prevCell
							));
						}
					}
				}
				prevCell = currentCell;
			}
		}
	},
	destroyCollisionData: function() {
		for (var i = 0; i < this.collisions.length; i++) {
			this.collisions[i].destroy();
		}
		this.collisions = [];
	}
}
