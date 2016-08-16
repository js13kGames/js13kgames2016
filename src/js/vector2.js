function Vector2(x, y) {
	this.x = x;
	this.y = y;
}

Vector2.prototype = {
	add: function(other) {
		this.x += other.x;
		this.y += other.y;
	},
	scale: function(scalar) {
		return new Vector2(this.x * scalar, this.y * scalar);
	},
	toString: function() {
		return "[x: " + Math.round(this.x) + ", y: " + Math.round(this.y) + "]";
	},
	copy: function() {
		return new Vector2(this.x, this.y);
	}
}