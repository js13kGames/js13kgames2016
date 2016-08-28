function LevelContainerView(model) {
	this.model = model;
	GameEvents.on('draw', this.draw, this);
}

LevelContainerView.prototype = {
	draw: function() {
		var i = 0, colliderModel;

		ctx.fillStyle = "grey";
		for (i = 0; i < this.model.blockers.length; i++) {
			colliderModel = this.model.blockers[i];
			ctx.fillRect(colliderModel.bounds.left, colliderModel.bounds.top, colliderModel.width, colliderModel.height);
		}
		ctx.fillStyle = "white";
		for (i = 0; i < this.model.floors.length; i++) {
			colliderModel = this.model.floors[i];
			ctx.fillRect(colliderModel.bounds.left, colliderModel.bounds.top, colliderModel.width, colliderModel.height);
		}
		ctx.fillStyle = "black";
		for (i = 0; i < this.model.antifloors.length; i++) {
			colliderModel = this.model.antifloors[i];
			ctx.fillRect(colliderModel.bounds.left, colliderModel.bounds.top, colliderModel.width, colliderModel.height);
		}

		ctx.fillStyle = "green";
		colliderModel = this.model.spawnPoint;
		ctx.fillRect(colliderModel.bounds.left, colliderModel.bounds.top, colliderModel.width, colliderModel.height);

		ctx.fillStyle = "red";
		colliderModel = this.model.exit;
		ctx.fillRect(colliderModel.bounds.left, colliderModel.bounds.top, colliderModel.width, colliderModel.height);
	}
}
