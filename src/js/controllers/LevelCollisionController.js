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
		var width = canvas.width / data.length;
		var height = canvas.height / data[0].length;

		for (r = 0; r < data.length - 1; r++) {
			for (c = 0; c < data[r].length - 1; c++) {
				var A = data[r][c],
					B = data[r][c+1],
					C = data[r+1][c],
					D = data[r+1][c+1];
				if (A == B && A == C && A == D) continue;
				var isTopLeftCorner = B === C && D === 0 && B !== 0;
				var isBottomRightCorner = B == C && A === 0 && B !== 0;
				var isTopRightCorner = A === D && C === 0 && A !== 0;
				var isBottomLeftCorner = A === D && B === 0 && A !== 0;
				var isCorner = isBottomLeftCorner || isTopRightCorner || isBottomRightCorner || isTopLeftCorner;

				var isTopEdge = A !== C && A !== 0;
				var isBottomEdge = C !== A && C !== 0;
				var isLeftEdge = A !== B && A !== 0;
				var isRightEdge = B !== A && B !== 0;
				if (isBottomLeftCorner) {
					this.setLineCollider(r, c + 1, "left",
						new Vector2(width * (c + 1), height * (r + 1) + this.OVERLAP),
						new Vector2(width * (c + 1), height * r),
						A
					);

					this.setLineCollider(r, c + 1, "bottom",
						new Vector2(width * (c + 2), (height * (r+1))),
						new Vector2(width * (c + 1) - this.OVERLAP, (height * (r+1))),
						A
					);
				}
				if (isTopRightCorner) {
					this.setLineCollider(r + 1, c, "right",
						new Vector2(width * (c + 1), (height * (r+1)) - this.OVERLAP),
						new Vector2(width * (c + 1), height * (r + 2)),
						A
					);

					this.setLineCollider(r + 1, c, "top",
						new Vector2(width * c, (height * (r+1))),
						new Vector2(width * (c + 1) + this.OVERLAP, (height * (r+1))),
						A
					);
				}
				if (isBottomRightCorner) {
					this.setLineCollider(r, c, "right",
						new Vector2(width * (c + 1), height * r),
						new Vector2(width * (c + 1), height * (r + 1) + this.OVERLAP),
						A
					);

					this.setLineCollider(r, c, "bottom",
						new Vector2(width * (c + 1) + this.OVERLAP, (height * (r+1))),
						new Vector2(width * c, (height * (r+1))),
						A
					);
				}
				if (isTopLeftCorner) {
					this.setLineCollider(r + 1, c + 1, "left",
						new Vector2(width * (c + 1), height * (r + 2)),
						new Vector2(width * (c + 1), (height * (r+1)) - this.OVERLAP),
						A
					);
					
					this.setLineCollider(r + 1, c + 1, "top",
						new Vector2(width * (c + 1) - this.OVERLAP, (height * (r+1))),
						new Vector2(width * (c + 2), (height * (r+1))),
						A
					);
				}

				if (isTopEdge) {
					this.setLineCollider(r + 1, c, "top",
						new Vector2(width * (c), height * (r + 1)),
						new Vector2(width * (c + 1), height * (r + 1)),
						A
					);
				}
				if (isBottomEdge) {
					this.setLineCollider(r + 1, c, "bottom",
						new Vector2(width * (c + 1), height * (r + 1)),
						new Vector2(width * (c), height * (r + 1)),
						C
					);
				}
				if (isLeftEdge) {
					this.setLineCollider(r + 1, c, "left",
						new Vector2(width * (c + 1), height * (r + 1)),
						new Vector2(width * (c + 1), height * (r)),
						A
					);
				}

				if (isRightEdge) {
					this.setLineCollider(r + 1, c, "right",
						new Vector2(width * (c + 1), height * (r)),
						new Vector2(width * (c + 1), height * (r + 1)),
						B
					);
				}
			}
		}

	},
	setLineCollider: function(row, col, edge, pointA, pointB, type) {
		lineCollider = new LineColliderController (pointA, pointB, type);
		this.collisions.push(lineCollider);
	},
	destroyCollisionData: function() {
		for (var i = 0; i < this.collisions.length; i++) {
			this.collisions[i].destroy();
		}
		this.collisions = [];
	}
}
