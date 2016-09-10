function LevelCollisionController() {
	this.collisions = [];
	this.OVERLAP = 30;
}

LevelCollisionController.prototype = {
	generateCollisionsFromLevelData: function(data) {
		if (!data) {
			throw new Error("No data provided");
		}

		this.destroyCollisionData();

		var row, col, r, c;
		var prevCell, currentCell;
		var lineCollider;

		for (r = 0; r < data.length; r++) {
			prevCell = undefined;
			for (c = 0; c < data[r].length; c++) {
				currentCell = this.switchCellType(data[r][c]);
				
				if (prevCell != undefined) {
					if (prevCell != currentCell) {
						if (currentCell !== 0) {
							this.createLineCollider(r, c, r+1, c, currentCell);
						}
						if (prevCell !== 0) {
							this.createLineCollider(r+1, c, r, c, prevCell);
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
							this.createLineCollider(r, c+1, r, c, currentCell);
						}
						if (prevCell !== 0) {
							this.createLineCollider(r, c, r, c+1, prevCell);
						}
					}
				}
				prevCell = currentCell;
			}
		}
	},
	switchCellType: function(cell) {
		if (window.glitchMode === "floor") {
			if (cell === 3) {
				return 0;
			} else if (cell === 4) {
				return 5;
			}
		} else {
			if (cell === 4) {
				return 0;
			} else if (cell === 3) {
				return 5;
			}
		}
		return cell;
	},
	createLineCollider: function(rowA, columnA, rowB, columnB, type) {
		this.collisions.push(new LineColliderController(
			new Vector2(TILE_SIZE * columnA, TILE_SIZE * rowA),
			new Vector2(TILE_SIZE * columnB, TILE_SIZE * rowB),
			type
		));
	},
	destroyCollisionData: function() {
		for (var i = 0; i < this.collisions.length; i++) {
			this.collisions[i].destroy();
		}
		this.collisions = [];
	}
}
