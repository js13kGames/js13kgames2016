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

		var colour = "rgb(52, 73, 94)";
		for (i = 0; i < this.model.blockers.length; i++) {
			colliderModel = this.model.blockers[i];
			this.drawCollider(colour, colliderModel);
		}
		colour = "rgb(241, 196, 15)";
		for (i = 0; i < this.model.floors.length; i++) {
			colliderModel = this.model.floors[i];
			this.drawCollider(colour, colliderModel);
		}
		colour = "rgb(26, 188, 156)";
		for (i = 0; i < this.model.antifloors.length; i++) {
			colliderModel = this.model.antifloors[i];
			this.drawCollider(colour, colliderModel);
		}

		colour = "rgb(155, 89, 182)";
		colliderModel = this.model.spawnPoint;
		this.drawCollider(colour, colliderModel);

		colour = "rgb(44, 62, 80)";
		colliderModel = this.model.exit;
		this.drawCollider(colour, colliderModel);
	},
	drawCollider: function(colour, colliderModel) {
		ctx.fillStyle = colour;
		ctx.fillRect(colliderModel.bounds.left, colliderModel.bounds.top, colliderModel.width, colliderModel.height);

		ctx.fillStyle = "white";
		ctx.fillText(colliderModel.index, colliderModel.bounds.left, colliderModel.bounds.top + 10);
	}
}
