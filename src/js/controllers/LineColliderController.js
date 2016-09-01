function LineColliderController(a, b, type) {
	this.colliderTypes = ["none", "spawnPoint", "exit", "floor", "antifloor", "blocker"];
	this.model = new LineColliderModel(a, b, this.colliderTypes[type]);
	this.view = new LineColliderView(this.model);
	GameEvents.emit('registerCollider', this, 'level');
}

LineColliderController.prototype = {
	checkIntersection: function(otherA, otherB) {
		return this.model.checkIntersection(otherA, otherB);
	},
	getDirection: function() {
		return this.model.getDirection();
	},
	getType: function() {
		return this.model.type;
	},
	destroy: function() {
		this.view.destroy();
		GameEvents.emit("deregisterCollider", this, "level");
	}
}
