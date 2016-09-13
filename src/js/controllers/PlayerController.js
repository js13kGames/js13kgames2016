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
		this.resetPosition(level.getSpawnPosition());
		this.resetKeys();
		this.model.levelStarted = true;
	},
	onDeath: function() {
		this.model.reset();
		GameEvents.emit("getActiveCheckpointPosition", this, function(pos) {
			this.resetPosition(pos);
		});
		this.resetKeys();
		this.model.levelStarted = true;
	},
	resetPosition: function(tilePos) {
		this.model.position = tilePos;
		this.model.position = this.model.position.add(new Vector2(TILE_SIZE/2, TILE_SIZE/2));
		this.newPosition = this.model.position.copy();
	},
	resetKeys: function() {
		this.keysdown = {
			left: false,
			right: false,
			up: false
		};
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
				GameEvents.emit("checkForInsideNewGlitcher", this, function handleInsideCheck(isInside) {
					if (isInside) {
						this.die();
					}
				});
			}
			if (this.model.velocity.x < 0) {
				this.model.velocity.x = 0;
			}
			this.model.velocity.x += (ACCELERATION * this.lastFrameTime);
			this.model.velocity.x = Math.min(this.model.velocity.x, MAX_SPEED)
		} else if (this.keysdown.left && !this.keysdown.right) {
			if (window.glitchMode === "antifloor") {
				GameEvents.emit("glitchModeChanged", "floor");
				GameEvents.emit("checkForInsideNewGlitcher", this, function handleInsideCheck(isInside) {
					if (isInside) {
						this.die();
					}
				});
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
			var direction = collision.collidee.getDirection();
			switch (direction) {
				case "up":
					if (!this.model.isStartingJump) {
						if (this.model.velocity.y > 0) {
							this.handleCollision(collision, direction);
						}
					}
				break;
				case "down":
					if (!this.model.isStartingJump) {
						if (this.model.velocity.y < 0) {
							this.handleCollision(collision, direction);
						}
					}
				break;
				case "right":
					if (this.model.velocity.x < 0) {
						this.handleCollision(collision, direction);
					}
				break;
				case "left":
					if (this.model.velocity.x > 0) {
						this.handleCollision(collision, direction);
					}
				break;
			}
		}
		this.model.position = this.newPosition.add(this.model.velocity.scale(this.lastFrameTime));
	},
	handleCollision:function(collision, direction) {
		var type = collision.collidee.getType();
		switch (type) {
			case "floor":
				if (window.glitchMode === "antifloor") {
					this.handleBlockerCollision(collision, direction);
				}
			break;
			case "antifloor":
				if (window.glitchMode === "floor") {
					this.handleBlockerCollision(collision, direction);
				}
			break;
			case "blocker":
				this.handleBlockerCollision(collision, direction);
			break;
			case "exit":
				this.handleExitCollision();
				return;
			case "checkpoint":
				this.handleCheckpointCollision(collision);
			break;
			case "deathtile":
				this.handleDeathtileCollision();
			break;
		}
	},
	handleBlockerCollision: function(collisionData, direction) {
		var blocker = collisionData.collidee;
		var intersection = collisionData.intersectionResult.intersection;
		this.newPosition = intersection.copy();
		var delta = intersection.subtract(this.pointB);
		var shouldRecheckCollisions = false;
		switch (direction) {
			case "up":
				this.model.isOnFloor = true;
				this.model.jumpCount = 0;
				this.model.velocity.y = 0;
				this.newPosition.y = this.pointB.y + delta.y - 0.1;
				shouldRecheckCollisions = true;
			break;
			case "down":
				this.model.velocity.y = 0;
				this.newPosition.y = this.pointB.y + delta.y + 0.1;
				shouldRecheckCollisions = true;
			break;
			case "right":
				this.model.velocity.x = 0;
				this.newPosition.x = this.pointB.x + delta.x + 0.1;
				shouldRecheckCollisions = true;
			break;
			case "left":
				this.model.velocity.x = 0;
				this.newPosition.x = this.pointB.x + delta.x - 0.1;
				shouldRecheckCollisions = true;
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
	handleCheckpointCollision: function(collision) {
		GameEvents.emit("findAndActivateCheckpoint", collision.intersectionResult.intersection);
	},
	handleDeathtileCollision: function() {
		this.die();
	},
	addVelocityToPosition: function() {
		this.model.position = this.model.position.add(this.model.velocity.scale(this.lastFrameTime));
	},
	checkForFallenOutOfLevel: function() {
		if (this.model.position.y * window.gameScale > canvas.height) {
			this.die();
		}
	},
	setDebugDrawPoints: function() {
		this.model.debugDrawPoints = [this.model.position, this.model.position.add(this.model.velocity.scale(this.lastFrameTime))];
	},
	die: function() {
		this.model.isDead = true;
		this.model.deathShards = [];
		for (var i = 0; i < DEATH_SHARD_COUNT; i++) {
			this.model.deathShards.push({
				pos: this.model.position.copy(),
				vel: new Vector2((Math.random() * DEATH_SHARD_MAX_VELOCITY_X) - DEATH_SHARD_MAX_VELOCITY_X / 2, (1 - Math.random() * DEATH_SHARD_MAX_VELOCITY_Y)),
				size: Math.random() * DEATH_SHARD_MAX_SIZE
			});
		}
		this.deathTime = Date.now();
	},
	update: function(dt) {
		if (!this.model.levelStarted) return;
		this.lastFrameTime = dt;

		if (this.model.isDead) {
			if (Date.now() - this.deathTime > DEATH_TIMING) {
				GameEvents.emit("playerDied");
				return;
			} else {
				for (var i = 0; i < this.model.deathShards.length; i++) {
					var shard = this.model.deathShards[i];
					shard.vel.y += GRAVITY * this.lastFrameTime;
					shard.pos = shard.pos.add(shard.vel.scale(this.lastFrameTime));
				}
			}
		} else {
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
}
