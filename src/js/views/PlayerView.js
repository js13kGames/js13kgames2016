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

		if (this.model.isDead) {
			for (var i = 0; i < this.model.deathShards.length; i++) {
				var scaledShardPosition = this.model.deathShards[i].pos.scale(window.gameScale);
				var scaledShardSize = this.model.deathShards[i].size * window.gameScale;
				ctx.fillRect(scaledShardPosition.x - scaledShardSize / 2, scaledShardPosition.y - scaledShardSize, scaledShardSize, scaledShardSize);
			}
		} else {
			ctx.fillRect(scaledPosition.x - scaledSize / 2 , scaledPosition.y - scaledSize, scaledSize, scaledSize);
		}

		if (DRAW_DEBUG) {
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
