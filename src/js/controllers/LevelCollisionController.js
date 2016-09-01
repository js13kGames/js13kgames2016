function LevelCollisionController() {
	this.collisions = [];
	this.OVERLAP = 15;
}

LevelCollisionController.prototype = {
	generateCollisionsFromLevelData: function(data) {
		if (!data) {
			throw new Error("No data provided");
		}

		var row, col, r, c;
		var prevCell, currentCell;
		var width = canvas.width / data.length;
		var height = canvas.height / data[0].length;
		for (r = 0; r < data.length; r++) {
			prevCell = undefined;
			for (c = 0; c < data[r].length; c++) {
				currentCell = data[r][c];
				if (prevCell != undefined) {
					if (prevCell != currentCell) {
						if (currentCell !== 0) {
							this.collisions.push(new LineColliderController(
								new Vector2(width * c, (height * r)),
								new Vector2(width * c, (height * (r+1))),
								currentCell
							));
						}
						if (prevCell !== 0) {
							this.collisions.push(new LineColliderController(
								new Vector2(width * c,(height * (r+1))),
								new Vector2(width * c, (height * r)),
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
								new Vector2((width * (c+1)) + this.OVERLAP, height * r),
								new Vector2((width * c) - this.OVERLAP, height * r),
								currentCell
							));
						}
						if (prevCell !== 0) {
							this.collisions.push(new LineColliderController(
								new Vector2((width * c) - this.OVERLAP, height * r),
								new Vector2((width * (c+1)) + this.OVERLAP, width * r),
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
