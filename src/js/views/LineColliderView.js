function LineColliderView(model) {
	this.model = model;
	GameEvents.on('draw', this.draw, this);
}

LineColliderView.prototype = {
	draw: function(layer) {
		if (layer !== "debug") return;
		if (DRAW_DEBUG) {
			if (Date.now() - this.model.lastCollisionTime < 100) {
				ctx.strokeStyle = "white";
			} else {
				ctx.strokeStyle = "red";
			}

			var scaledA = this.model.a.scale(window.gameScale);
			var scaledB = this.model.b.scale(window.gameScale);
			
			ctx.beginPath();
			ctx.moveTo(scaledA.x, scaledA.y);
			ctx.lineTo(scaledB.x, scaledB.y);
			ctx.stroke();

			ctx.beginPath();
			var centerX = scaledA.x + ((scaledB.x - scaledA.x) / 2);
			var centerY = scaledA.y + ((scaledB.y - scaledA.y) / 2);
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