function LineColliderView(model) {
	this.model = model;
	GameEvents.on('draw', this.draw, this);
}

LineColliderView.prototype = {
	draw: function() {
		if (window.drawDebug) {
			if (this.model.isInternal) {
				ctx.strokeStyle = "red";
				ctx.beginPath();
				ctx.moveTo(this.model.a.x, this.model.a.y);
				ctx.lineTo(this.model.b.x, this.model.b.y);
				ctx.stroke();
			} else {
				ctx.strokeStyle = "red";
			}
			ctx.beginPath();
			var centerX = this.model.a.x + ((this.model.b.x - this.model.a.x) / 2);
			var centerY = this.model.a.y + ((this.model.b.y - this.model.a.y) / 2);
			var centerPoint = new Vector2(centerX, centerY);
			ctx.moveTo(centerPoint.x, centerPoint.y);
			ctx.lineTo(centerPoint.x + (this.model.normal.x * 10), centerPoint.y + (this.model.normal.y * 10));
			ctx.stroke();
		}
	},
	destroy: function() {
		GameEvents.off('draw', this.draw, this);
	}
}