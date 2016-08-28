function LevelContainerView(model) {
	this.model = model;
	GameEvents.on('draw', this.draw, this);
}

LevelContainerView.prototype = {
	draw: function() {
		var gradient;
		if (window.glitchMode) {
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
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		var i = 0, colliderModel;

		ctx.fillStyle = "rgb(52, 73, 94)";
		for (i = 0; i < this.model.blockers.length; i++) {
			colliderModel = this.model.blockers[i];
			ctx.fillRect(colliderModel.bounds.left, colliderModel.bounds.top, colliderModel.width, colliderModel.height);
		}
		ctx.fillStyle = "rgb(241, 196, 15)";
		for (i = 0; i < this.model.floors.length; i++) {
			colliderModel = this.model.floors[i];
			ctx.fillRect(colliderModel.bounds.left, colliderModel.bounds.top, colliderModel.width, colliderModel.height);
		}
		ctx.fillStyle = "rgb(26, 188, 156)";
		for (i = 0; i < this.model.antifloors.length; i++) {
			colliderModel = this.model.antifloors[i];
			ctx.fillRect(colliderModel.bounds.left, colliderModel.bounds.top, colliderModel.width, colliderModel.height);
		}

		ctx.fillStyle = "rgb(155, 89, 182)";
		colliderModel = this.model.spawnPoint;
		ctx.fillRect(colliderModel.bounds.left, colliderModel.bounds.top, colliderModel.width, colliderModel.height);

		ctx.fillStyle = "rgb(44, 62, 80)";
		colliderModel = this.model.exit;
		ctx.fillRect(colliderModel.bounds.left, colliderModel.bounds.top, colliderModel.width, colliderModel.height);
	}
}
