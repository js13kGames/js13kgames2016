function LevelContainerView(model) {
	this.model = model;
	GameEvents.on('draw', this.draw, this);
}

LevelContainerView.prototype = {
	draw: function(layer) {
		if (layer !== "background") return;
		var gradient;
		if (window.glitchMode === "floor") {
			gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
			gradient.addColorStop(0, "rgb(241, 196, 15)");
			gradient.addColorStop(0.25, "rgb(241, 196, 15)");
			gradient.addColorStop(1, "rgb(211, 84, 0)");
		} else {
			gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
			gradient.addColorStop(0, "rgb(26, 188, 156)");
			gradient.addColorStop(0.25, "rgb(26, 188, 156)");
			gradient.addColorStop(1, "rgb(41, 128, 185)");
		}
		ctx.fillStyle = gradient;
		ctx.globalAlpha = 1;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	},
	destroy: function() {
		GameEvents.off("draw", this.draw, this);
	}
}
