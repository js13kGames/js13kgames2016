function PlayerController() {
	this.model = new PlayerModel();
	this.view = new PlayerView(this.model);

	GameEvents.on('arrowKeyDown', this.onKeyDown, this);
	GameEvents.on('arrowKeyUp', this.onKeyUp, this);
	GameEvents.on('update', this.update, this);
	GameEvents.on('startLevel', this.onLevelStarted, this);
	GameEvents.on('collision', this.onCollision, this);
}

PlayerController.prototype = {
	onLevelStarted: function(levelModel) {
		this.model.reset();
		this.model.position = levelModel.spawnPoint.position.copy();
		this.model.position.add(new Vector2(levelModel.spawnPoint.width/2, levelModel.spawnPoint.height/2));
		this.model.levelStarted = true;
	},
	onKeyDown: function(e) {
		if (!this.model.levelStarted) return;
		switch (e.keyCode) {
			case 37: //left
				this.model.direction = -1;
				break;
			case 38: //up
				if (this.model.isOnFloor) {
					this.model.velocity.y -= 500;
					this.model.isOnFloor = false;
				}
				break;
			case 39: //right
				this.model.direction = 1;
				break;
			case 40: //down
				break;
		}
	},
	onKeyUp: function(e) {
		if (!this.model.levelStarted) return;
		switch (e.keyCode) {
			case 37:
			case 39:
				this.model.direction = 0;
				break;
		}
	},
	onCollision: function(collider, collidee) {
		if (collider != this) return;

		console.log(collidee.type);
		switch (collidee.type) {
			case "exit":
				GameEvents.emit("exitReached");
			break;
			case "floor":
				if (window.glitchMode) return;
				this.model.velocity.y = 0;
				this.model.isOnFloor = true;
				this.model.position.y = collidee.getBounds().top;
			break;
			case "antifloor":
				if (!window.glitchMode) return;
				this.model.velocity.y = 0;
				this.model.isOnFloor = true;
				this.model.position.y = collidee.getBounds().top;
			break;
			case "blocker":
				if (this.model.velocity.y > 0) {
					this.model.velocity.y = 0;
					this.model.isOnFloor = true;
					this.model.position.y = collidee.getBounds().top;
				}
				if (this.model.velocity.x > 0) {
					this.model.velocity.x = 0;
					this.model.position.x = collidee.getBounds().left;
				} else if (this.model.velocity.x < 0) {
					this.model.velocity.x = 0;
					this.model.position.x = collidee.getBounds().right;
				}
		}
	},
	update: function(dt) {
		if (!this.model.levelStarted) return;
		
		this.model.isOnFloor = false;
		
		if (this.model.direction > 0) {
			this.model.velocity.x += SPEED;
			this.model.velocity.x = Math.min(this.model.velocity.x, MAX_SPEED)
		} else if (this.model.direction < 0) {
			this.model.velocity.x -= SPEED;
			this.model.velocity.x = Math.max(this.model.velocity.x, -MAX_SPEED)
		}
		this.model.velocity.x *= FRICTION;
		this.model.velocity.y += GRAVITY;

		this.model.position.add(this.model.velocity.scale(dt));

		if (this.model.position.y >= canvas.height) {
			this.model.isOnFloor = true;
			this.model.position.y = canvas.height;
		}

		var nextPosition = this.model.position.copy();
		nextPosition.add(this.model.velocity.scale(dt));
		GameEvents.emit("detectCollisionAtPoint", this, nextPosition, "level");

	}
}
