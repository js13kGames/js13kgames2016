function PlayerView(model) {
	this.model = model;
	GameEvents.on('draw', this.draw, this);
}

PlayerView.prototype = {
	draw: function(dt) {
		if (!this.model.levelStarted) return;
		ctx.fillStyle = "rgb(255, 235, 59)";
		ctx.fillRect(this.model.position.x - this.model.size / 2 , this.model.position.y - this.model.size, this.model.size, this.model.size);

		if (window.drawDebug) {
			ctx.strokeStyle = "green";
			ctx.beginPath();
			var points = this.model.debugDrawPoints;
			ctx.moveTo(points[0].x, points[0].y);
			ctx.lineTo(points[1].x, points[1].y);
			ctx.stroke();
		}
	}
}
