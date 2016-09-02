function LevelCollisionController() {
	this.collisions = [];
	this.collisionPool = {};
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
		/*for (r = 0; r < data.length; r++) {
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
		}*/

		for (r = 0; r < data.length - 1; r++) {
			for (c = 0; c < data[r].length - 1; c++) {
				var A = data[r][c],
					B = data[r][c+1],
					C = data[r+1][c],
					D = data[r+1][c+1],
					pointA, pointB,
					lineCollider;
				if ((A !== 0 && A === B && A === C) && D === 0) { // bottom-right 0
					this.setInternalCorner(
						new Vector2(width * (c + 1), height * (r + 2)),
						new Vector2(width * (c + 1), (height * (r+1)) - this.OVERLAP)
					);
					
					this.setInternalCorner(
						new Vector2(width * (c + 1) - this.OVERLAP, (height * (r+1))),
						new Vector2(width * (c + 2), (height * (r+1)))
					);
				} else if ((A !== 0 && A === B && A === D) && C === 0) { // bottom-left 0
					this.setInternalCorner(
						new Vector2(width * (c + 1), (height * (r+1)) - this.OVERLAP),
						new Vector2(width * (c + 1), height * (r + 2))
					);

					this.setInternalCorner(
						new Vector2(width * c, (height * (r+1))),
						new Vector2(width * (c + 1) + this.OVERLAP, (height * (r+1)))
					);
				} else if ((A !== 0 && A === C && A === D) && B === 0) { // top-right 0
					this.setInternalCorner(
						new Vector2(width * (c + 1), height * (r + 1) + this.OVERLAP),
						new Vector2(width * (c + 1), height * r)
					);

					this.setInternalCorner(
						new Vector2(width * (c + 2), (height * (r+1))),
						new Vector2(width * (c + 1) - this.OVERLAP, (height * (r+1)))
					);
				} else if ((B !== 0 && B === C && B === D) && A === 0) { // top-left 0
					this.setInternalCorner(
						new Vector2(width * (c + 1), height * r),
						new Vector2(width * (c + 1), height * (r + 1) + this.OVERLAP)
					);

					this.setInternalCorner(
						new Vector2(width * (c + 1) + this.OVERLAP, (height * (r+1))),
						new Vector2(width * c, (height * (r+1)))
					);
				}
			}
		}

	},
	getFromCollisionPool: function(pointA, pointB) {
		var lineCollider;
		var a = "" + pointA;
		var b = "" + pointB;
		if (this.collisionPool[a]) {
			if (!this.collisionPool[a][b]) {
				lineCollider = new LineColliderController (pointA, pointB);
				this.collisionPool[a][b] = lineCollider;
			} else {
				lineCollider = collisionPool[a][b];
			}
		} else {
			lineCollider = new LineColliderController (pointA, pointB);
			this.collisionPool[a] = {
				b: lineCollider
			};
		}
		return lineCollider;
	},
	setInternalCorner: function(pointA, pointB) {
		lineCollider = this.getFromCollisionPool(pointA, pointB);

		lineCollider.setAsInternal(true);
		this.collisions.push(lineCollider);
	},
	destroyCollisionData: function() {
		for (var i = 0; i < this.collisions.length; i++) {
			this.collisions[i].destroy();
		}
		this.collisions = [];
	}
}
