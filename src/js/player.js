var SPEED = 100;
var MAX_SPEED = 1000;
var FRICTION = 0.8;
var GRAVITY = 19.8;

var SIZE = 30;

function Player() {
	this.position = new Vector2(100, 100);
	this.velocity = new Vector2(0, 0);

	this.direction = 0;
	this.isOnFloor = false;

	document.onkeydown = this.onKeyDown.bind(this);
	document.onkeyup = this.onKeyUp.bind(this);

	Events.on('update', this.update, this);
	Events.on('draw', this.draw, this);
}

Player.prototype = {
	onKeyDown: function(e) {
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
		switch (e.keyCode) {
			case 37:
			case 39:
				this.direction = 0;
				break;
		}
	},
	update: function(dt) {
		if (this.direction > 0) {
			this.velocity.x += SPEED;
			this.velocity.x = Math.min(this.velocity.x, MAX_SPEED)
		} else if (this.direction < 0) {
			this.velocity.x -= SPEED;
			this.velocity.x = Math.max(this.velocity.x, -MAX_SPEED)
		}
		this.velocity.x *= FRICTION;
		if (!this.isOnFloor) {
			this.velocity.y += GRAVITY;
		}

		this.position.add(this.velocity.scale(dt));

		if (this.position.y >= canvas.height) {
			this.velocity.y = 0;
			this.isOnFloor = true;
			this.position.y = canvas.height;
		}
	},
	draw: function() {
		ctx.fillStyle = "white";
		ctx.fillRect(this.position.x - SIZE/2, this.position.y - SIZE, SIZE, SIZE);
	}
}