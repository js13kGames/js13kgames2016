function Level(startPosition, endPosition) {
	this.startPosition = startPosition;
	this.endPosition = endPosition;
	console.log("endPosition: " + endPosition);
	this.SIZE = 50;

	Events.on("draw", this.draw, this);
}

Level.prototype = {
	draw: function() {
		ctx.fillStyle = "green";
		ctx.fillRect(this.startPosition.x - SIZE/2, this.startPosition.y - SIZE/2, SIZE, SIZE);

		ctx.fillStyle = "red";
		ctx.fillRect(this.endPosition.x - SIZE/2, this.endPosition.y - SIZE/2, SIZE, SIZE);
	}
}