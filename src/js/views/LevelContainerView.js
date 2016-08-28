function LevelContainerView(model) {
	this.model = model;
	GameEvents.on('draw', this.draw, this);
}

LevelContainerView.prototype = {
	draw: function() {
		var i = 0;

		ctx.fillStyle = "grey";
		for (i = 0; i < this.model.blockers.length; i++) {
			var blocker = this.model.blockers[i];
			ctx.fillRect(blocker.model.bounds.left, blocker.model.bounds.top, blocker.model.width, blocker.model.height);
		}
	}
}
