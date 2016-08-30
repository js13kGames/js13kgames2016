function LineColliderController(a, b) {
	this.model = new LineColliderModel(a, b);
	this.view = new LineColliderView(this.model);
}

LineColliderController.prototype = {
	checkIntersection: function(otherA, otherB) {
		return this.model.checkIntersection(otherA, otherB);
	},
	destroy: function() {
		this.view.destroy();
	}
}
