function LevelCollider(position, width, height, type) {
	this.position = position;
	this.width = width;
	this.height = height;
	this.type = type;
	Events.emit('registerCollider', this, 'level');
	this.bounds = {
		top: this.position.y,
		right: this.position.x + this.width,
		bottom: this.position.y + this.height,
		left: this.position.x
	};
	Events.on("draw", this.draw, this);
}

LevelCollider.prototype = {
	getBounds: function() {
		return this.bounds;
	},
	draw: function() {
		switch(this.type) {
			case "spawnPoint":
				ctx.fillStyle = "green";
			break;
			case "exit":
				ctx.fillStyle = "red";
			break;
			case "floor":
				ctx.fillStyle = "white";
			break;
			case "antifloor":
				ctx.fillStyle = "black";
			break;
			case "blocker":
				ctx.fillStyle = "grey";
			break;
		}
		ctx.fillRect(this.bounds.left, this.bounds.top, this.width, this.height);
	},
	destroy: function() {
		Events.off("draw", this.draw, this);
		Events.emit("deregisterCollider", this, "level");
	}
}