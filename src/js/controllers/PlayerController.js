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
	onCollision: function(collider, collidee, intersectionVector) {
		if (collider != this) return;
		console.log(collidee.type);

		switch (collidee.type) {
			case "exit":
				GameEvents.emit("exitReached");
			break;
			/*case "floor":
				if (window.glitchMode) return;
				this.model.position.add(intersectionVector);
				this.model.velocity.add(reflectedForce);
				this.model.isOnFloor = true;
			break;
			case "antifloor":
				if (!window.glitchMode) return;
				this.model.position.add(intersectionVector);
				this.model.velocity.add(reflectedForce);
				this.model.isOnFloor = true;
			break;*/
			case "blocker":
				this.model.position = intersectionVector;
				this.model.velocity.y = 0;
				this.model.isOnFloor = true;
		}
	},
	update: function(dt) {
		if (!this.model.levelStarted) return;
		// this.model.isOnFloor = false;

		
		if (this.model.direction > 0) {
			this.model.velocity.x += SPEED;
			this.model.velocity.x = Math.min(this.model.velocity.x, MAX_SPEED)
		} else if (this.model.direction < 0) {
			this.model.velocity.x -= SPEED;
			this.model.velocity.x = Math.max(this.model.velocity.x, -MAX_SPEED)
		}
		this.model.velocity.x *= FRICTION;

		var floorCheckA = this.model.position,
			floorCheckB = this.model.position.add(new Vector2(0, 1));

		if (!this.model.isStartingJump) {
			GameEvents.emit("detectCollision", this, "level", floorCheckA, floorCheckB,
				function onResult(data) {
					this.model.isOnFloor = data != undefined;
				}
			);
		}

		var pointA = this.model.position,
			pointB = this.model.position.add(this.model.velocity.scale(dt));

		if (!this.model.isOnFloor) {
			this.model.velocity.y += GRAVITY * dt;
		}

		GameEvents.emit("detectCollision", this, "level", pointA, pointB,
			function onResult(data) {
				if (data && !this.model.isStartingJump) {
					if (!this.model.isOnFloor) {
						this.model.isOnFloor = true;
						this.model.jumpCount = 0;
					}
					this.model.velocity.y = 0;
					this.model.position = data.intersectionResult.intersection.add(this.model.velocity.scale(dt));
				} else {
					this.model.position = this.model.position.add(this.model.velocity.scale(dt));
				}
			}
		);
		
		if (window.drawDebug) {
			this.model.debugDrawPoints = [this.model.position, this.model.position.add(this.model.velocity.scale(dt))];
		}

		this.model.isStartingJump = false;

	}
}
