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
	this.AABB = {
		centre: new Vector2(this.position.x + width/2, this.position.y + height/2),
		xw: width / 2,
		yw: height / 2
	};
}

LevelColliderModel.prototype = {
	getAABB: function() {
		return this.AABB;
	},
	destroy: function() {
		GameEvents.emit("deregisterCollider", this, "level");
	}
}
