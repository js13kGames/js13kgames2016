function LineColliderModel(a, b, type) {
	this.a = a;
	this.b = b;
	this.normal = this.a.crossProduct(this.b).normalise();
	this.type = type;
}

LineColliderModel.prototype = {
	checkIntersection(otherA, otherB) {
		var deltaA = this.a.subtract(otherA);
		var thisLine = this.b.subtract(this.a);
		var otherLine = otherB.subtract(otherA);

		var crossLines = otherLine.x * thisLine.y - otherLine.y * thisLine.x;

		if (crossLines === 0) return;

		var check1 = ( deltaA.x * otherLine.y - deltaA.y * otherLine.x ) / crossLines;
		if( check1 < 0 || check1 > 1 ) return;

		var check2 = ( deltaA.x * thisLine.y - deltaA.y * thisLine.x ) / crossLines;
		if( check2 < 0 || check2 > 1 ) return;

		return {
			intersection: otherA.add(otherLine.scale(check2)),
			normal: this.normal
		};
	},
	getDirection: function() {
		if (this.normal.x === 0) {
			if (this.normal.y === -1) {
				return "up";
			} else {
				return "down";
			}
		} else if (this.normal.x < 0) {
			return "left";
		} else {
			return "right";
		}
	}
}
