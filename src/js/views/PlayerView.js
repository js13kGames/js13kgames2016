function PlayerView(model) {
	this.model = model;
	GameEvents.on('draw', this.draw, this);
}

PlayerView.prototype = {
	draw: function(layer) {
		ctx.globalAlpha = 1;
		if (layer !== "player") return;
		var scaledPosition = this.model.position.scale(window.gameScale);
		var scaledSize = this.model.size * window.gameScale;

		if (!this.model.levelStarted) return;
		ctx.fillStyle = "rgb(255, 235, 59)";
		ctx.fillRect(scaledPosition.x - scaledSize / 2 , scaledPosition.y - scaledSize, scaledSize, scaledSize);

		if (window.drawDebug) {
			ctx.strokeStyle = "green";
			ctx.beginPath();
			var scaledPoints = [
				this.model.debugDrawPoints[0].scale(window.gameScale),
				this.model.debugDrawPoints[1].scale(window.gameScale) 
			];
			ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y);
			ctx.lineTo(scaledPoints[1].x, scaledPoints[1].y);
			ctx.stroke();
		}
	}
}
