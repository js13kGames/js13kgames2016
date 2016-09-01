var CollisionHandler = {
	init: function() {
		GameEvents.on("registerCollider", this.onRegisterCollider, this);
		GameEvents.on("deregisterCollider", this.onDeregisterCollider, this);
		GameEvents.on("detectCollision", this.getCollision, this);
		GameEvents.on("detectCollisionAtPoint", this.getCollisionAtPoint, this);
		this.collisionLayers = {};
	},
	onRegisterCollider: function(collider, layer) {
		if (!collider.model.normal) {
			throw new Error("Error: Can't register a collider that has no normal.");
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
	getCollision(collider, layer, pointA, pointB, callback) {
		var collisionLayer = this.collisionLayers[layer];
		var collisions = [];

		for (var i = 0; i < collisionLayer.length; i++) {
			var currentCollidee = collisionLayer[i];
			if (currentCollidee == collider) continue;

			var intersectionCheckResult = currentCollidee.checkIntersection(pointA, pointB);
			if (intersectionCheckResult) {
				collisions.push({
					collidee: currentCollidee,
					intersectionResult: intersectionCheckResult
				});
			}
			
		}
		callback.call(collider, collisions);
	}

}