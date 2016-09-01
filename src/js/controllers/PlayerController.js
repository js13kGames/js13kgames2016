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
	getAABB: function() {
		return this.model.getAABB();
	},
	onLevelStarted: function(levelModel) {
		this.model.reset();
		this.model.position = levelModel.spawnPoint.position.copy();
		this.model.position = this.model.position.add(new Vector2(levelModel.spawnPoint.width/2, levelModel.spawnPoint.height/2));
		this.model.levelStarted = true;
	},
	onKeyDown: function(e) {
		if (!this.model.levelStarted) return;
		switch (e.keyCode) {
			case 37: //left
				this.model.direction = -1;
				break;
			case 38: //up
				if (this.model.jumpCount < MAX_JUMPS) {
					this.model.velocity.y -= JUMP_STRENGTH;
					this.model.isOnFloor = false;
					this.model.jumpCount++;
					this.model.isStartingJump = true;
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
	adjustXVelocity: function() {
		if (this.model.direction > 0) {
			this.model.velocity.x += (ACCELERATION * this.lastFrameTime);
			this.model.velocity.x = Math.min(this.model.velocity.x, MAX_SPEED)
		} else if (this.model.direction < 0) {
			this.model.velocity.x -= (ACCELERATION * this.lastFrameTime);
			this.model.velocity.x = Math.max(this.model.velocity.x, -MAX_SPEED)
		}
		this.model.velocity.x *= FRICTION;
	},
	checkFloor: function() {
		var floorCheckA = this.model.position,
			floorCheckB = this.model.position.add(new Vector2(0, 1));

		if (!this.model.isStartingJump) {
			GameEvents.emit("detectCollision", this, "level", floorCheckA, floorCheckB,
				function onResult(data) {
					var isOnFloor = false;
					for(var i = 0; i < data.length; i++) {
						var collisionData = data[i];
						var isBlockerCollision = collisionData.collidee.getType() === "blocker";
						var isUpCollider = collisionData.collidee.getDirection() === "up";
						isOnFloor = isBlockerCollision && isUpCollider;
						if (isOnFloor) {
							break;
						}
					}
					this.model.isOnFloor = isOnFloor;
				}
			);
		}
	},
	adjustYVelocity: function() {
		if (!this.model.isOnFloor) {
			this.model.velocity.y += GRAVITY * this.lastFrameTime;
		}
	},
	checkCollisions: function() {
		var pointA = this.model.position,
			pointB = this.model.position.add(this.model.velocity.scale(this.lastFrameTime));

		GameEvents.emit("detectCollision", this, "level", pointA, pointB, this.handleCollisionData);
	},
	handleCollisionData: function(data) {
		if (data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				var collisionData = data[i];
				var type = collisionData.collidee.getType();
				switch (type) {
					case "blocker":
						this.handleBlockerCollision(collisionData.collidee);
					break;
				}
			}
		}
		this.addVelocityToPosition();
	},
	handleBlockerCollision: function(blocker) {
		var direction = blocker.getDirection();
		switch (direction) {
			case "up":
				if (!this.model.isStartingJump) {
					if (this.model.velocity.y > 0) {
						this.model.isOnFloor = true;
						this.model.jumpCount = 0;
						this.model.velocity.y = 0;
					}
				}
			break;
			case "down":
				if (this.model.velocity.y < 0) {
					this.model.velocity.y = 0;
				}
			break;
			case "right":
				if (this.model.velocity.x < 0) {
					this.model.velocity.x = 0;
				}
			break;
			case "left":
				if (this.model.velocity.x > 0) {
					this.model.velocity.x = 0;
				}
			break;
		}
	},
	addVelocityToPosition: function() {
		this.model.position = this.model.position.add(this.model.velocity.scale(this.lastFrameTime));
	},
	setDebugDrawPoints: function() {
		this.model.debugDrawPoints = [this.model.position, this.model.position.add(this.model.velocity.scale(this.lastFrameTime))];
	},
	update: function(dt) {
		if (!this.model.levelStarted) return;
		this.lastFrameTime = dt;

		this.adjustXVelocity();
		this.checkFloor();
		this.adjustYVelocity();
		this.checkCollisions();
		if (window.drawDebug) {
			this.setDebugDrawPoints();
		}

		this.model.isStartingJump = false;

	}
}
