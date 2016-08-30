function LineColliderModel(a, b) {
	this.a = a;
	this.b = b;
	this.normal = this.a.crossProduct(this.b).normalise();
}

LineColliderModel.prototype = {
	checkIntersection(otherA, otherB) {
		var deltaA = this.a.subtract(otherA);
		var thisLine = this.b.subtract(this.a);
		var otherLine = otherB.subtract(otherA);

		var dotLines = otherLine.x * thisLine.y - otherLine.y * thisLine.x;

		var check1 = ( deltaA.x * otherLine.y - deltaA.y * otherLine.x ) / dotLines;
		if( check1 < 0 || check1 > 1 )
		{
			return {
				isIntersecting: false,
				intersection: null
			};
		}

		var check2 = ( deltaA.x * thisLine.y - deltaA.y * thisLine.x ) / dotLines;
		if( check2 < 0 || check2 > 1 )
		{
			return {
				isIntersecting: false,
				intersection: null
			};
		}

		return {
			isIntersecting: true,
			intersection: otherA.add(otherLine.scale(check2))
		};
	}
}
