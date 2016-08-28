var SPEED = 100;
var MAX_SPEED = 1000;
var FRICTION = 0.8;
var GRAVITY = 19.8;


function Player() {
	this.reset();
	this.size = 30;
	this.velocity = new Vector2(0, 0);
	this.position = new Vector2(0, 0);

	Events.on('arrowKeyDown', this.onKeyDown, this);
	Events.on('arrowKeyUp', this.onKeyUp, this);
	Events.on('update', this.update, this);
	Events.on('draw', this.draw, this);
	Events.on('startLevel', this.onLevelStarted, this);
	Events.on('collision', this.onCollision, this);

	Events.emit('registerCollider', this, 'level');
}

Player.prototype = {
	onLevelStarted: function(level) {
		this.reset();
		this.position = level.spawnPoint.position.copy();
		this.position.add(new Vector2(level.spawnPoint.width/2, level.spawnPoint.height/2));
		this.levelStarted = true;
	},
	reset: function() {
		window.glitchMode = false;
		this.levelStarted = false;
		this.velocity = new Vector2(0, 0);

		this.direction = 0;
		this.isOnFloor = false;
	},
	onKeyDown: function(e) {
		if (!this.levelStarted) return;
		switch (e.keyCode) {
			case 37: //left
				this.direction = -1;
				break;
			case 38: //up
				if (this.isOnFloor) {
					this.velocity.y -= 500;
					this.isOnFloor = false;
				}
				break;
			case 39: //right
				this.direction = 1;
				break;
			case 40: //down
				break;
		}
	},
	onKeyUp: function(e) {
		if (!this.levelStarted) return;
		switch (e.keyCode) {
			case 37:
			case 39:
				this.direction = 0;
				break;
		}
	},
	onCollision: function(collider, collidee) {
		if (collider != this) return;

		console.log(collidee.type);
		switch (collidee.type) {
			case "exit":
				Events.emit("exitReached");
			break;
			case "floor":
				if (window.glitchMode) return;
				this.velocity.y = 0;
				this.isOnFloor = true;
				this.position.y = collidee.getBounds().top;
			break;
			case "antifloor":
				if (!window.glitchMode) return;
				this.velocity.y = 0;
				this.isOnFloor = true;
				this.position.y = collidee.getBounds().top;
			break;
			case "blocker":
				if (this.velocity.y > 0) {
					this.velocity.y = 0;
					this.isOnFloor = true;
					this.position.y = collidee.getBounds().top;
				}
				if (this.velocity.x > 0) {
					this.velocity.x = 0;
					this.position.x = collidee.getBounds().left;
				} else if (this.velocity.x < 0) {
					this.velocity.x = 0;
					this.position.x = collidee.getBounds().right;
				}
		}
	},
	getBounds: function() {
		return {
			top: this.position.y - this.size / 2,
			right: this.position.x + this.size / 2,
			bottom: this.position.y + this.size / 2,
			left: this.position.x - this.size / 2
		}
	},
	update: function(dt) {
		if (!this.levelStarted) return;
		
		this.isOnFloor = false;
		
		if (this.direction > 0) {
			this.velocity.x += SPEED;
			this.velocity.x = Math.min(this.velocity.x, MAX_SPEED)
		} else if (this.direction < 0) {
			this.velocity.x -= SPEED;
			this.velocity.x = Math.max(this.velocity.x, -MAX_SPEED)
		}
		this.velocity.x *= FRICTION;
		this.velocity.y += GRAVITY;

		this.position.add(this.velocity.scale(dt));

		if (this.position.y >= canvas.height) {
			this.isOnFloor = true;
			this.position.y = canvas.height;
		}

		var nextPosition = this.position.copy();
		nextPosition.add(this.velocity.scale(dt));
		Events.emit("detectCollisionAtPoint", this, nextPosition, "level");

	},
	draw: function() {
		if (!this.levelStarted) return;
		ctx.fillStyle = "pink";
		ctx.fillRect(this.position.x - this.size/2, this.position.y - this.size, this.size, this.size);
	}
}