function LevelColliderModel(position, width, height, type, index) {
	this.position = position;
	this.width = width;
	this.height = height;
	this.type = type;
	this.index = index;

	this.bounds = {
		top: this.position.y,
		right: this.position.x + this.width,
		bottom: this.position.y + this.height,
		left: this.position.x
	};
}

LevelColliderModel.prototype = {
	destroy: function() {
		GameEvents.emit("deregisterCollider", this, "level");
	}
}
