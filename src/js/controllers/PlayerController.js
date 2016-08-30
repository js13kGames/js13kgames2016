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
				if (this.model.jumpCount < 2) {
					this.model.velocity.y -= 500;
					this.model.isOnFloor = false;
					this.model.jumpCount++;
					console.log(this.model.isOnFloor);
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
	onCollision: function(collider, collidee, collisionVector) {
		if (collider != this) return;
		var normalisedCollisionVector = collisionVector.normalise();
		var playerDirection = this.model.velocity.normalise();
		if (playerDirection.x < 0) {
			normalisedCollisionVector.x *= -1;
		}
		if (playerDirection.y < 0) {
			normalisedCollisionVector.y *= -1;
		}

		var reflectedForce = this.model.velocity.scaleByVector(normalisedCollisionVector);

		switch (collidee.type) {
			case "exit":
				GameEvents.emit("exitReached");
			break;
			/*case "floor":
				if (window.glitchMode) return;
				this.model.position.add(collisionVector);
				this.model.velocity.add(reflectedForce);
				this.model.isOnFloor = true;
			break;
			case "antifloor":
				if (!window.glitchMode) return;
				this.model.position.add(collisionVector);
				this.model.velocity.add(reflectedForce);
				this.model.isOnFloor = true;
			break;*/
			case "blocker":
				if (normalisedCollisionVector.y == -1) {
					this.model.isOnFloor = true;
					this.model.jumpCount = 0;
					console.log(this.model.isOnFloor);
				}
				this.model.position = this.model.position.add(collisionVector);
				this.model.velocity = this.model.velocity.add(reflectedForce);
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

		if (!this.model.isOnFloor) {
			this.model.velocity.y += GRAVITY;
		}

		GameEvents.emit("detectCollision", this, "level");

		this.model.position = this.model.position.add(this.model.velocity.scale(dt));


	}
}
