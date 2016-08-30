var CollisionHandler = {
	init: function() {
		GameEvents.on("registerCollider", this.onRegisterCollider, this);
		GameEvents.on("deregisterCollider", this.onDeregisterCollider, this);
		GameEvents.on("detectCollision", this.getCollision, this);
		GameEvents.on("detectCollisionAtPoint", this.getCollisionAtPoint, this);
		this.collisionLayers = {};
	},
	onRegisterCollider: function(collider, layer) {
		if (!collider.getAABB) {
			throw new Error("Error: Can't register a collider that has no getAABB function.");
		}
		if (this.collisionLayers[layer]) {
			this.collisionLayers[layer].push(collider);
		} else {
			this.collisionLayers[layer] = [collider];
		}
	},
	onDeregisterCollider: function(collider, layer) {
		var collisionLayer = this.collisionLayers[layer];
		for (var i = 0; i < collisionLayer.length; i++) {
			var currentCollider = collisionLayer[i];
			if (currentCollider == collider) {
				this.collisionLayers[layer].splice(i, 1);
				break;
			}
		}
	},
	getCollision(collider, layer) {
		var collisionLayer = this.collisionLayers[layer];
		var AABB1 = collider.getAABB();
		for (var i = 0; i < collisionLayer.length; i++) {
			var currentCollidee = collisionLayer[i];
			if (currentCollidee == collider) continue;
			var AABB2 = currentCollidee.getAABB();

			var overlapX = Math.abs(AABB1.centre.x - AABB2.centre.x) - AABB1.xw - AABB2.xw;
			if (overlapX > 0) {
				continue;
			}
			var overlapY = Math.abs(AABB1.centre.y - AABB2.centre.y) - AABB1.yw - AABB2.yw;
			if (overlapY > 0) {
				continue;
			}

			var projectionVector;
			if (overlapX > overlapY) {
				var projectionX = AABB1.centre.x > AABB2.centre.x ? -overlapX : overlapX;
				projectionVector = new Vector2(projectionX, 0);
			} else {
				var projectionY = AABB1.centre.y > AABB2.centre.y ? -overlapY : overlapY;
				projectionVector = new Vector2(0, projectionY);
			}

			GameEvents.emit('collision', collider, currentCollidee, projectionVector);
		}
	}
}