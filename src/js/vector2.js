function Vector2(x, y) {
	this.x = x;
	this.y = y;
}

Vector2.prototype = {
	add: function(other) {
		return new Vector2(this.x + other.x, this.y + other.y);
	},
	subtract: function(other) {
		return new Vector2(this.x - other.x, this.y - other.y);
	},
	scale: function(scalar) {
		return new Vector2(this.x * scalar, this.y * scalar);
	},
	scaleByVector: function(other) {
		return new Vector2(this.x * other.x, this.y * other.y);
	},
	toString: function() {
		return "[x: " + Math.round(this.x) + ", y: " + Math.round(this.y) + "]";
	},
	copy: function() {
		return new Vector2(this.x, this.y);
	},
	normalise: function() {
		var length = Math.sqrt(this.x * this.x + this.y * this.y);
		if (length == 0) {
			return new Vector2(0, 0);
		}
		return new Vector2(this.x / length, this.y / length);
	},
	dotProduct: function(other) {
		return this.x * other.x + this.y * other.y;
	},
	project: function(other) {
		var dp = this.dotProduct(other);
		var projection = new Vector2(
			(dp / (other.x * other.x + other.y * other.y)) * other.x,
			(dp / (other.x * other.x + other.y * other.y)) * other.y
		);
		return projection;
	},
	projectUnit: function(unit) {
		var dp = this.dotProduct(unit);
		var projection = new Vector2(dp / unit.x, dp / unit.y);
		return projection;
	},
	crossProduct: function(other) {
		var dx = other.x - this.x;
		var dy = other.y - this.y;
		return new Vector2(-dy, dx);
	}
}