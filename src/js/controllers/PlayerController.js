function PlayerController() {
	this.model = new PlayerModel();
	this.view = new PlayerView(this.model);

	this.keysdown = {
		left: false,
		right: false,
		up: false
	};

	GameEvents.on('arrowKeyDown', this.onKeyDown, this);
	GameEvents.on('arrowKeyUp', this.onKeyUp, this);
	GameEvents.on('update', this.update, this);
	GameEvents.on('startLevel', this.onLevelStarted, this);
	GameEvents.on('collision', this.onCollision, this);
}

PlayerController.prototype = {
	onLevelStarted: function(level) {
		this.model.reset();
		this.model.position = level.getSpawnPosition();
		this.model.position = this.model.position.add(new Vector2(TILE_SIZE/2, TILE_SIZE/2));
		this.newPosition = this.model.position.copy();

		this.keysdown = {
			left: false,
			right: false,
			up: false
		};
		this.model.levelStarted = true;
	},
	onKeyDown: function(e) {
		if (!this.model.levelStarted) return;
		switch (e.keyCode) {
			case 37: //left
				this.keysdown.left = true;
				break;
			case 38: //up
				this.keysdown.up = true;
				if (this.model.jumpCount < MAX_JUMPS) {
					this.model.velocity.y -= JUMP_STRENGTH;
					this.model.isOnFloor = false;
					this.model.jumpCount++;
					this.model.isStartingJump = true;
				}
				break;
			case 39: //right
				this.keysdown.right = true;
				break;
			case 40: //down
				break;
		}
	},
	onKeyUp: function(e) {
		if (!this.model.levelStarted) return;
		switch (e.keyCode) {
			case 37:
				this.keysdown.left = false;
				break;
			case 39:
				this.keysdown.right = false;
				break;
		}
	},
	adjustXVelocity: function() {
		if (this.keysdown.right && !this.keysdown.left) {
			if (window.glitchMode === "floor") {
				GameEvents.emit("glitchModeChanged", "antifloor");
			}
			if (this.model.velocity.x < 0) {
				this.model.velocity.x = 0;
			}
			this.model.velocity.x += (ACCELERATION * this.lastFrameTime);
			this.model.velocity.x = Math.min(this.model.velocity.x, MAX_SPEED)
		} else if (this.keysdown.left && !this.keysdown.right) {
			if (window.glitchMode === "antifloor") {
				GameEvents.emit("glitchModeChanged", "floor");
			}
			if (this.model.velocity.x > 0) {
				this.model.velocity.x = 0;
			}
			this.model.velocity.x -= (ACCELERATION * this.lastFrameTime);
			this.model.velocity.x = Math.max(this.model.velocity.x, -MAX_SPEED)
		}
		this.model.velocity.x *= FRICTION;
	},
	adjustYVelocity: function() {
		this.model.velocity.y += GRAVITY * this.lastFrameTime;
	},
	checkCollisions: function() {
		this.pointA = this.model.position;
		this.pointB = this.model.position.add(this.model.velocity.scale(this.lastFrameTime));
		this.collisionCount = 0;

		GameEvents.emit("detectCollision", this, "level", this.pointA, this.pointB, this.handleCollisionData);
	},
	handleCollisionData: function(data) {
		for (var i = 0; i < data.length; i++) {
			var collision = data[i];
			var type = collision.collidee.getType();
			switch (type) {
				case "floor":
					if (window.glitchMode === "antifloor") {
						this.handleBlockerCollision(collision);
					}
				break;
				case "antifloor":
					if (window.glitchMode === "floor") {
						this.handleBlockerCollision(collision);
					}
				break;
				case "blocker":
					this.handleBlockerCollision(collision);
				break;
				case "exit":
					this.handleExitCollision();
					return;
			}
		}
		this.model.position = this.newPosition.add(this.model.velocity.scale(this.lastFrameTime));
		
	},
	handleBlockerCollision: function(collisionData) {
		var blocker = collisionData.collidee;
		var direction = blocker.getDirection();
		var intersection = collisionData.intersectionResult.intersection;
		this.newPosition = intersection.copy();
		var delta = intersection.subtract(this.pointB);
		var shouldRecheckCollisions = false;
		switch (direction) {
			case "up":
				if (!this.model.isStartingJump) {
					if (this.model.velocity.y > 0) {
						this.model.isOnFloor = true;
						this.model.jumpCount = 0;
						this.model.velocity.y = 0;
						this.newPosition.y = this.pointB.y + delta.y - 0.1;
						shouldRecheckCollisions = true;
					}
				}
			break;
			case "down":
				if (!this.model.isStartingJump) {
					if (this.model.velocity.y < 0) {
						this.model.velocity.y = 0;
						this.newPosition.y = this.pointB.y + delta.y + 0.1;
						shouldRecheckCollisions = true;
					}
				}
			break;
			case "right":
				if (this.model.velocity.x < 0) {
					this.model.velocity.x = 0;
					this.newPosition.x = this.pointB.x + delta.x + 0.1;
					shouldRecheckCollisions = true;
				}
			break;
			case "left":
				if (this.model.velocity.x > 0) {
					this.model.velocity.x = 0;
					this.newPosition.x = this.pointB.x + delta.x - 0.1;
					shouldRecheckCollisions = true;
				}
			break;
		}
		if (shouldRecheckCollisions) {
			this.collisionCount++;
			GameEvents.emit("detectCollision", this, "level", this.model.position, this.newPosition.add(this.model.velocity.scale(this.lastFrameTime)), this.handleCollisionData);
		}
	},
	handleExitCollision: function() {
		GameEvents.emit("exitReached");
	},
	addVelocityToPosition: function() {
		this.model.position = this.model.position.add(this.model.velocity.scale(this.lastFrameTime));
	},
	checkForFallenOutOfLevel: function() {
		if (this.model.position.y * window.gameScale > canvas.height) {
			GameEvents.emit("playerDied");
		}
	},
	setDebugDrawPoints: function() {
		this.model.debugDrawPoints = [this.model.position, this.model.position.add(this.model.velocity.scale(this.lastFrameTime))];
	},
	update: function(dt) {
		if (!this.model.levelStarted) return;
		this.lastFrameTime = dt;

		this.newPosition = this.model.position.copy();

		this.adjustXVelocity();
		this.adjustYVelocity();
		this.checkCollisions();
		this.checkForFallenOutOfLevel();
		if (DRAW_DEBUG) {
			this.setDebugDrawPoints();
		}

		this.model.isStartingJump = false;

	}
}
