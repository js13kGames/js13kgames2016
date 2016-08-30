function LineColliderView(model) {
	this.model = model;
	GameEvents.on('draw', this.draw, this);
}

LineColliderView.prototype = {
	draw: function() {
		if (window.drawDebug) {
			ctx.strokeStyle = "red";
			ctx.beginPath();
			ctx.moveTo(this.model.a.x, this.model.a.y);
			ctx.lineTo(this.model.b.x, this.model.b.y);
			ctx.stroke();
		}
	},
	destroy: function() {
		GameEvents.off('draw', this.draw, this);
	}
}