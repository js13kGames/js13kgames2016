function LevelColliderModel(position, width, height, type) {
	this.position = position;
	this.width = width;
	this.height = height;
	this.type = type;
	GameEvents.emit('registerCollider', this, 'level');
	this.bounds = {
		top: this.position.y,
		right: this.position.x + this.width,
		bottom: this.position.y + this.height,
		left: this.position.x
	};
}

LevelColliderModel.prototype = {
	getBounds: function() {
		return this.bounds;
	},
	destroy: function() {
		GameEvents.emit("deregisterCollider", this, "level");
	}
}
